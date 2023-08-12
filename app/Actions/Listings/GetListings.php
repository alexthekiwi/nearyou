<?php

namespace App\Actions\Listings;

use App\Enums\ListingStatus;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Laravel\Scout\Builder as ScoutBuilder;
use Meilisearch\Endpoints\Indexes;

class GetListings
{
    public function __invoke(
        ?bool $paginate = true,
        ?User $user = null,
        Request $request = null
    ): Collection|LengthAwarePaginator {
        $user ??= auth()->user();
        $request ??= request();

        $search = trim($request->input('query', ''));
        $sort = trim($request->input('sort', 'status'));
        $sortDir = trim($request->input('sortDir', 'asc'));

        $query = Listing::search($search, function (Indexes|EloquentBuilder $builder, string|ScoutBuilder $query, array|string $options) use ($user) {
            // If we're using the database Scout driver, we can use the normal EloquentBuilder
            if ($builder instanceof EloquentBuilder) {
                return $builder
                    ->where('status', '!=', ListingStatus::PROCESSING)
                    ->where('location_id', $user->location_id);
            }

            // Build up our filters for Meilisearch
            $filters = collect([
                'status != '.ListingStatus::PROCESSING->value,
                'location_id = '.$user->location_id,
            ]);

            $options['filter'] = $filters->join(' AND ');

            return $builder->search($query, $options);
        })
            ->orderBy($sort, $sortDir)
            ->query(
                fn (Builder $query) => $query
                    ->with([
                        'suburb',
                        'location',
                        'images',
                        'tags:title,slug',
                    ])
            );

        $cacheKey = 'listings:'.collect([
            $user->id,
            $user->location_id,
            $paginate,
            $request->input('page', 1),
            $request->input('query', ''),
            $request->input('sort', 'status'),
            $request->input('sortDir', 'asc'),
        ])->join(':');

        $listings = cache()->store()->remember(
            $cacheKey,
            app()->environment('local') ? 0 : 60,
            fn () => $paginate
                ? $query->paginate($request->input('limit', 24))
                : $query->get()
        );

        if (config('settings.listings.simulate_slow_search') && $request->input('search', '')) {
            sleep(rand(2, 4));
        }

        return $listings;
    }
}
