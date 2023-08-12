<?php

namespace App\Http\Controllers;

class CommunityController extends Controller
{
    public function __invoke()
    {
        return inertia('Community');
    }
}
