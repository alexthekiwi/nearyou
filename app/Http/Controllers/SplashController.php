<?php

namespace App\Http\Controllers;

class SplashController extends Controller
{
    public function __invoke()
    {
        return inertia('Splash');
    }
}
