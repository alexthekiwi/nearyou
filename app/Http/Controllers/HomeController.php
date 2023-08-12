<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
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

        return to_route('listings.index');
    }
}
