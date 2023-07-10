<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        if (! auth()->check()) {
            return inertia('Splash');
        }

        return inertia('Home');
    }
}
