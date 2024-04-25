<?php

namespace App\Http\Controllers;

use App\Actions\Listings\GetFavouriteListingIds;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\Request;

class UserListingController extends Controller
{
    public function index(Request $request, User $user)
    {
        $listings = $user->listings()
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('limit', 5))
            ->withQueryString();

        // Attach relationships
        $listings->loadMissing([
            'images' => fn ($query) => $query->select('listing_id', 'file'),
            'seller' => fn ($query) => $query->select('id', 'name'),
        ]);

        foreach ($listings as $index => $listing) {
            $listings[$index] = Listing::parseListing($listing);
        }

        return inertia('Users/Listings/Index', [
            'user' => $user->toPublicArray(),
            'listings' => $listings,
            'favouriteListings' => (new GetFavouriteListingIds)(),
        ]);
    }
}
