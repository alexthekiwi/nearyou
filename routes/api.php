<?php

use App\Http\Controllers\Api\GeocodeController;
use App\Http\Controllers\Api\ListingApiController;
use App\Http\Controllers\Firebase\FirebaseController;
use Illuminate\Support\Facades\Route;

Route::post('/geocode', [GeocodeController::class, 'show'])->name('api.geocode.show');

Route::post('/listing/images', [ListingApiController::class, 'addFile'])->name('api.listing.addFile');

// Route::post('/test', [ListingApiController::class, 'reserved'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/test', function (Request $request) {
    return $request->user();
});
