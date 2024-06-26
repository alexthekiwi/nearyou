<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ChatController;
// use App\Http\Controllers\CommunityController;
use App\Http\Controllers\ForestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\LocalLoginController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PhoneNumberRegisterController;
use App\Http\Controllers\PhoneNumberVerifyController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RandomListingController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\SupportRequestController;
use App\Http\Controllers\TermsAndConditionsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserListingController;
use App\Http\Controllers\UserProxyController;
use App\Http\Controllers\UserReviewController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

/**
 * Public routes
 */
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', AboutController::class)->name('about');
Route::get('/terms-and-conditions', TermsAndConditionsController::class)->name('terms-and-conditions');
Route::get('/privacy-policy', PrivacyPolicyController::class)->name('privacy-policy');
Route::get('/faq', FaqController::class)->name('faq');

/**
 * Support
 */
Route::get('/support', SupportController::class)->name('support');
Route::get('/support-requests/create', [SupportRequestController::class, 'create'])->name('support-requests.create');
Route::post('/support-requests', [SupportRequestController::class, 'store'])->name('support-requests.store');

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
 * Authenticated and email-verified routes
 */
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/location', [LocationController::class, 'store'])->name('location.store');
    Route::put('/location', [LocationController::class, 'update'])->name('location.update');
});

/**
 * Authenticated and email-verified routes
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/{user}/listings', [UserListingController::class, 'index'])->name('user-listings.index');
    Route::get('/{user}/reviews', [UserReviewController::class, 'index'])->name('user-reviews.index');

    Route::get('/favourites', [FavouriteController::class, 'index'])->name('favourites.index');
    Route::post('/favourites/{listing}', [FavouriteController::class, 'store'])->name('favourites.store');
    Route::delete('/favourites/{listing}', [FavouriteController::class, 'destroy'])->name('favourites.destroy');

    Route::resource('/listings', ListingController::class);
    Route::get('/random', RandomListingController::class)->name('listings.random');
    Route::resource('/chat', ChatController::class);
    // Route::get('/community', CommunityController::class)->name('community');
    Route::get('/forest', [ForestController::class, 'index'])->name('forest.index');
});

/**
 * Admin routes
 */
Route::middleware(['auth', IsAdmin::class])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users', [UserController::class, 'destroy'])->name('users.destroy');
    Route::post('/user-proxy', [UserProxyController::class, 'store'])->name('user-proxy.store');
});

/**
 * Local only routes
 */
if (app()->environment('local')) {
    Route::post('/local-login', [LocalLoginController::class, 'store'])->name('local-login.store');
}

require __DIR__.'/auth.php';
