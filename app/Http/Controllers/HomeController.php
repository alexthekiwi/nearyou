<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        if (session()->has('verified_phone_number')) {
            return to_route('register');
        }

        if (! auth()->check()) {
            return inertia('Splash');
        }

        return inertia('Home');
    }
}
