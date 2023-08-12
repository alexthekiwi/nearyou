<?php

namespace App\Http\Controllers;

use App\Enums\ListingStatus;
use App\Models\Listing;

class RandomListingController extends Controller
{
    public function __invoke()
    {
        $listing = Listing::query()
            ->where('location_id', auth()->user()->location_id)
            ->where('status', '!=', ListingStatus::PROCESSING->value)
            ->inRandomOrder()
            ->first();

        if (! $listing) {
            return redirect()->route('listings.index')->withErrors([
                'message' => 'No listings found.',
            ]);
        }

        return redirect()->route('listings.show', $listing);
    }
}
