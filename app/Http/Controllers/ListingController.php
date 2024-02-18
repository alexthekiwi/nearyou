<?php

namespace App\Http\Controllers;

use App\Actions\Listings\GetFavouriteListingIds;
use App\Actions\Listings\GetListings;
use App\Actions\Tags\GetTags;
use App\Models\Listing;
use App\Models\ListingTag;
use App\Models\ListingImage;
use App\Models\Chat;
use App\Models\PostCode;
use App\Models\Suburb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use MeiliSearch\Client;
use Inertia\Inertia;
use Inertia\Response;

class ListingController extends Controller
{
    private function parseListing(Listing $listing) {
        $listing = [
            'id' => $listing->id,
            'seller' => $listing->relationLoaded('seller') ? $listing->seller->name : null,
            'seller_id' => $listing->relationLoaded('seller') ? $listing->seller->id : null,
            'title' => $listing->title,
            'images' => $listing->relationLoaded('images') ? array_column($listing->images->toArray(), 'file') : null,
            'tags' => $listing->relationLoaded('tags') ? array_column($listing->tags->toArray(), 'tag') : null,
            'description' => $listing->description,
            'location' => $listing->location->name,
            'price' => $listing->price,
            'created_at' => $listing->created_at,
            'status' => $listing->status,
            'suburb' => $listing->suburb ? $listing->suburb->name : null,
        ];

        return $listing;
    }

    public function index(Request $request)
    {
        // $client = new Client(env('MEILISEARCH_HOST'), env('MEILISEARCH_KEY'));
        // $index = $client->index('listings');
        // $index->deleteAllDocuments();
        // $index->updateSettings([
        //     'filterableAttributes' => Listing::$filterable,
        //     'searchableAttributes' => Listing::$searchable,
        //     'sortableAttributes' => Listing::$sortable,
        // ]);

        // $l = Listing::with('tags')->get(['id', 'title', 'description', 'status', 'location_id', 'created_at', 'price'])->toArray();

        // foreach ($l as $key => $value) {
        //     $l[$key]['tags'] = array_column($value['tags'], 'tag');

        //     // $l[$key]['images'] = array_column($value['images'], 'file');
        //     // $l[$key]['thumbnail'] = empty($l[$key]['images']) ? null : $l[$key]['images'][0];
        // }

        // $index->addDocuments($l);


        if (! auth()->check()) {
            return to_route('login', [
                'intended' => route('listings.index'),
            ]);
        }

        $this->authorize('viewAny', Listing::class);

        $listings = (new GetListings)(
            paginate: true,
            user: $request->user(),
            request: $request
        );

        foreach ($listings as $index => $listing) {
            $listings[$index] = $this->parseListing($listing);
        }

        return inertia('Listings/Index', [
            'listings' => $listings,
            'favouriteListings' => (new GetFavouriteListingIds)(),
        ]);
    }

    public function create(Request $request)
    {
        $this->authorize('create', Listing::class);

        return inertia('Listings/Create', []);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Listing::class);

        try {
            DB::beginTransaction();

            $postcode = PostCode::where('code', $request->postCode);

            $suburb = Suburb::select('suburbs.id')
                ->joinSub(
                    $postcode,
                    'p',
                    function ($join) {
                        $join->on('suburbs.post_code_id', '=', 'p.id');
                    }
                )
                ->where('suburbs.name', $request->suburb)
                ->first();

            $listing = Listing::create([
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'seller_id' => $request->user()->id,
                'location_id' => $request->user()->location_id,
                'suburb_id' => $suburb->id,
            ]);

            foreach($request->fileArr as $i => $fileId) {
                $listingImage = ListingImage::where('id', $fileId)->first();

                if ($listingImage->listing_id) {
                    return Inertia::render('Error', [
                        'message' => 'Conflict Image',
                    ])->response()->status(409);
                } else {
                    $listingImage->update([
                        'listing_id' => $listing->id,
                        'order' => $i,
                    ]);
                }
            }

            $tagArr = $request->tagArr;

            foreach($tagArr as $tag) {
                ListingTag::create([
                    'listing_id' => $listing->id,
                    'tag' => $tag,
                ]);
            }

            $client = new Client(env('MEILISEARCH_HOST'), env('MEILISEARCH_KEY'));

            $index = $client->index('listings');

            $index->addDocuments([
                [
                    'id' => $listing->id,
                    'title' => $listing->title,
                    'description' => $listing->description,
                    'tags' => $tagArr,
                    'status' => 1,
                    'location_id' => $listing->location->id,
                    'price' => $listing->price,
                    'created_at' => $listing->created_at,
                    'seller_id' => $listing->seller->id,
                ]
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();

            Log::error($e->getMessage());
            Log::error($e->getTraceAsString());
        }

        return redirect()->route('listings.index');
    }

    public function show(Listing $listing)
    {
        $this->authorize('view', $listing);

        // Attach relationships
        $listing->loadMissing([
            'images' => fn ($query) => $query->select('listing_id', 'file'),
            'tags' => fn ($query) => $query->select('listing_id', 'tag'),
            'location' => fn ($query) => $query->select('id', 'name'),
            'seller' => fn ($query) => $query->select('id', 'name'),
            'suburb' => fn ($query) => $query->select('id', 'name'),
        ]);

        $chatId = null;
        $chat = Chat::where('listing_id', $listing->id)
            ->where('buyer_id', auth()->id())
            ->first();

        if ($chat != null) $chatId = $chat->id;

        return inertia('Listings/Show', [
            'listing' => $this->parseListing($listing),
            'chatId' => $chatId,
            // 'favouriteListings' => (new GetFavouriteListingIds)(),
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
