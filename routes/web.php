<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\LocalLoginController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PhoneNumberRegisterController;
use App\Http\Controllers\PhoneNumberVerifyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProxyController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

/**
 * Public routes
 */
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::resource('/listings', ListingController::class);

// TODO: Build these routes
Route::get('/chat', fn () => abort(404))->name('chat.index');
Route::get('/about', fn () => abort(404))->name('about.show');
Route::get('/community', fn () => abort(404))->name('community.index');

Route::delete('/user-proxy', [UserProxyController::class, 'destroy'])->name('user-proxy.destroy');

/**
 * Guest routes
 */
Route::middleware(['guest'])->group(function () {
    Route::post('/signup', [PhoneNumberRegisterController::class, 'store'])->name('phone-number-register.store');
    Route::post('/signup/verify', [PhoneNumberVerifyController::class, 'store'])->name('phone-number-verify.store');
    Route::delete('/signup/verify', [PhoneNumberVerifyController::class, 'destroy'])->name('phone-number-verify.destroy');
});

/**
 * Auth routes
 */
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/location', [LocationController::class, 'store'])->name('location.store');
    Route::put('/location', [LocationController::class, 'update'])->name('location.update');
});

/**
 * Admin rotues
 */
Route::middleware(['auth', IsAdmin::class])->group(function () {
    Route::resource('/users', UserController::class);
    Route::post('/user-proxy', [UserProxyController::class, 'store'])->name('user-proxy.store');
});

/**
 * Local only routes
 */
if (app()->environment('local')) {
    Route::post('/local-login', [LocalLoginController::class, 'store'])->name('local-login.store');
}

require __DIR__.'/auth.php';
