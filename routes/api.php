<?php

use App\Http\Controllers\Api\GeocodeController;
use Illuminate\Support\Facades\Route;

Route::post('/geocode', [GeocodeController::class, 'show'])->name('api.geocode.show');
