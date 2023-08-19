<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\User;
use App\Policies\ListingPolicy;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{
    public function index(Request $request)
    {
        $listings = User::find(auth()->id())->favourites()
            ->whereNotSold()
            ->orderByPivot('created_at', 'desc')
            ->with([
                'suburb',
                'location',
                'images',
                'tags:title,slug',
            ])
            ->paginate($request->input('limit', 24))
            ->withQueryString();

        $favouriteListings = $listings->pluck('id');

        return inertia('Favourites/Index', [
            'listings' => $listings,
            'favouriteListings' => $favouriteListings,
        ]);
    }

    public function store(Listing $listing)
    {
        $this->authorize('addFavourite', ListingPolicy::class);

        if (! $listing->is_available) {
            return redirect()->back();
        }

        $favourites = User::find(auth()->id())->favourites();

        if ($favourites->where('listing_id', $listing->id)->exists()) {
            return redirect()->back();
        }

        $favourites->attach($listing->id);

        return redirect()->back();
    }

    public function destroy(Request $request, User $user, Listing $listing)
    {
        $this->authorize('removeFavourite', ListingPolicy::class);

        $favourites = User::find(auth()->id())->favourites();

        if (! $favourites->where('listing_id', $listing->id)->exists()) {
            return redirect()->back();
        }

        $favourites->detach($listing->id);

        return redirect()->back();
    }
}
