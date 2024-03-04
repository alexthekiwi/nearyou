<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\ListingImage;
use App\Jobs\CleanUpImages;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ListingApiController extends Controller
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

    public function reserved(Request $request)
    {
        $user = $request->user(); // 사용자 정보 가져오기

        Log::info('Reserved API called'.json_encode($user));

        // if ($user) {
        //     // 사용자가 인증되어 있을 경우 데이터 처리
        //     $data = getDataForAuthenticatedUser($user);
        // } else {
        //     // 사용자가 인증되어 있지 않을 경우 적절한 처리
        //     $data = [];
        // }

        // return Inertia::render('Test', [
        //     'data' => $data,
        // ]);

        return 'test';
    }
}
