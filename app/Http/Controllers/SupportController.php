<?php

namespace App\Http\Controllers;

class SupportController extends Controller
{
    public function __invoke()
    {
        return inertia('Support');
    }
}
