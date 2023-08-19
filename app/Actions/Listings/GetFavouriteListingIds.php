<?php

namespace App\Actions\Listings;

use App\Models\User;

class GetFavouriteListingIds
{
    public function __invoke(User|string|null $user = null)
    {
        $user = (is_string($user) ? User::find($user) : $user) ?: auth()->user();

        return $user
            ->favourites()
            ->get(['listings.id'])
            ->pluck('id');
    }
}
