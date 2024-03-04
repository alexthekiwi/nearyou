<?php

namespace App\Http\Controllers;

use App\Actions\Listings\GetFavouriteListingIds;
use App\Models\User;
use Illuminate\Http\Request;

class UserListingController extends Controller
{
    public function index(Request $request, User $user)
    {
        $listings = $user->listings()
            ->where('location_id', auth()->user()->location_id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('limit', 5))
            ->withQueryString();

        return inertia('Users/Listings/Index', [
            'user' => $user->toPublicArray(),
            'listings' => $listings,
            'favouriteListings' => (new GetFavouriteListingIds)(),
        ]);
    }
}
