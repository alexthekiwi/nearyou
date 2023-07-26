<?php

namespace App\Actions\Listings;

use App\Models\Listing;
use App\Models\User;
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

        $query = Listing::query()
            ->forUser($user)
            ->search($request->input('search'))
            ->whereNotNull('location_id')
            ->whereNotNull('seller_id')
            ->with(['suburb', 'images']);

        $listings = cache()->store()->remember("listings:{$user->id}:{$paginate}:{$request->page}:{$request->search}", 60, function () use ($paginate, $query, $request) {
            return $paginate
                ? $query->paginate($request->input('limit', 24))
                : $query->get();
        });

        // TODO: Remove this to make things faster 🙂 it's here to simulate a big database
        sleep(1);

        return $listings;
    }
}
