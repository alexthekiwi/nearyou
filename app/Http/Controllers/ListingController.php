<?php

namespace App\Http\Controllers;

use App\Actions\Listings\GetListings;
use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Listing::class);

        return inertia('Listings/Index', [
            'listings' => (new GetListings)(
                paginate: true,
                user: $request->user(),
                request: $request
            ),
        ]);
    }

    public function create(Request $request)
    {
        $this->authorize('create', Listing::class);

        // TODO
    }

    public function store(Request $request)
    {
        $this->authorize('create', Listing::class);

        // TODO
    }

    public function show(Listing $listing)
    {
        $this->authorize('view', $listing);

        // Attach relationships
        $listing->loadMissing([
            'seller',
            'buyer',
            'images',
            'tags',
            'location',
            'watchers',
        ]);

        return inertia('Listings/Show', [
            'listing' => $listing,
        ]);
    }

    public function update(Listing $listing)
    {
        $this->authorize('update', $listing);

        // TODO
    }

    public function destroy(Listing $listing)
    {
        $this->authorize('delete', $listing);

        // TODO
    }
}
