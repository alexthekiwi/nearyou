<?php

namespace App\Http\Controllers;

use App\Actions\Listings\GetListings;

// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        if (session()->has('verified_phone_number')) {
            return to_route('register');
        }

        if (! auth()->check()) {
            return inertia('Splash');
        }

        if (auth()->user()->location_id === null) {
            return to_route('dashboard')->withMessage('Please set your location to browse local listings.', 'warning');
        }

        return inertia('Home', [
            'listings' => (new GetListings)(auth()->user()),
        ]);
    }
}
