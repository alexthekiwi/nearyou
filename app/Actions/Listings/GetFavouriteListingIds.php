<?php

namespace App\Actions\Listings;

use App\Models\User;
use Illuminate\Support\Collection;

class GetFavouriteListingIds
{
    public function __invoke(User|string $user = null): Collection
    {
        $user = (is_string($user) ? User::find($user) : $user) ?: auth()->user();

        if (! $user) {
            return collect([]);
        }

        return $user
            ->favourites()
            ->get(['listings.id'])
            ->pluck('id');
    }
}
