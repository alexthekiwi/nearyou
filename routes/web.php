<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProxyController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::resource('/users', UserController::class);
});

Route::middleware(['auth', IsAdmin::class])->group(function () {
    Route::post('/user-proxy', [UserProxyController::class, 'store'])->name('user-proxy.store');
});

Route::delete('/user-proxy', [UserProxyController::class, 'destroy'])->name('user-proxy.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/**
 * Local/development routes
 */
if (app()->environment('local')) {
    //
}

require __DIR__.'/auth.php';
