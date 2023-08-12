<?php

namespace App\Http\Controllers;

use App\Actions\Listings\GetListings;
use App\Actions\Tags\GetTags;
use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        if (! auth()->check()) {
            return to_route('login', [
                'intended' => route('listings.index'),
            ]);
        }

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

        return inertia('Listings/Create', [
            'tags' => (new GetTags)(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Listing::class);

        $request->validate([
            // TODO
        ]);

        // TODO: Create listing
        // TODO: Process images (compress, resize, etc.)
        // TODO: Associate tags

        return redirect()->route('listings.index');
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

    public function edit(Listing $listing)
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

        return inertia('Listings/Edit', [
            'listing' => $listing,
            'tags' => (new GetTags)(),
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

        $listing->delete();

        return redirect()->route('listings.index');
    }
}
