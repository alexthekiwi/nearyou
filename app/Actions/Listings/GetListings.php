<?php

namespace App\Actions\Listings;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Support\Collection;

class GetListings
{
    public function __invoke(?User $user = null): Collection
    {
        $listings = Listing::query()
            ->forUser($user ??= auth()->user())
            ->get();

        return $listings;
    }
}
