<?php

namespace App\Http\Controllers;

class TermsAndConditionsController extends Controller
{
    public function __invoke()
    {
        return inertia('TermsAndConditions');
    }
}
