<?php

namespace App\Http\Controllers;

class PrivacyPolicyController extends Controller
{
    public function __invoke()
    {
        return inertia('PrivacyPolicy');
    }
}
