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
            ->with(['suburb']);

        $listings = $paginate
            ? $query->paginate($request->input('limit', 20))
            : $query->get();

        sleep(3);

        return $listings;
    }
}
