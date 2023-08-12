<?php

namespace App\Actions\Listings;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class GetListings
{
    public function __invoke(
        ?bool $paginate = true,
        ?User $user = null,
        Request $request = null
    ): Collection|LengthAwarePaginator {
        $user ??= auth()->user();
        $request ??= request();

        $query = Listing::search(trim($request->input('search', '')))
            ->where('location_id', $user->location_id)
            ->orderBy('status', 'asc')
            ->query(
                fn (Builder $query) => $query
                    ->with([
                        'suburb',
                        'location',
                        'images',
                        'tags:title,slug',
                    ])
            );

        $listings = cache()->store()->remember(
            "listings:{$user->id}:{$user->location_id}:{$paginate}:{$request->page}:{$request->search}",
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
