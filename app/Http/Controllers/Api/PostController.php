<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\ListingImage;
use App\Jobs\CleanUpImages;

class PostController extends Controller
{
    public function addFile(Request $request)
    {
        if ($request->header('Authorization') !== env('LAMBDA_API_KEY')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $fileName = $request->json('fileName');

        $listingImage = ListingImage::factory()->create([
            'title' => $fileName,
            'file' => $fileName,
            'disk' => 's3',
        ]);

        $listingImageId = $listingImage->id;

        // addMinutes
        // addHours
        CleanUpImages::dispatch(1, $listingImageId)->delay(now()->addHours(1));

        return response()->json(['message' => 'Success', 'listingImageId' => $listingImageId], 200);
    }
}
