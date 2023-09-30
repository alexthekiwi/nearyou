<?php

namespace App\Actions\Listings;

use App\Models\User;

class GetFavouriteListingIds
{
    public function __invoke(User|string $user = null): array
    {
        $user = (is_string($user) ? User::find($user) : $user) ?: auth()->user();

        if (! $user) {
            return [];
        }

        return $user
            ->favourites()
            ->get(['listings.id'])
            ->pluck('id');
    }
}
