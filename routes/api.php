<?php

use App\Http\Controllers\Api\GeocodeController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Firebase\FirebaseController;
use Illuminate\Support\Facades\Route;

Route::post('/geocode', [GeocodeController::class, 'show'])->name('api.geocode.show');

Route::post('/listing/images', [PostController::class, 'addFile'])->name('api.listing.addFile');
