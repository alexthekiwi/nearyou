<?php

namespace App\Http\Controllers;

use App\Actions\Location\SetNewLocation;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'postCode' => ['required', 'size:4'],
        ]);

        $location = (new SetNewLocation)(user: auth()->user(), postCode: $request->postCode);

        if (! $location) {
            return back()->withErrors([
                'location' => "Sorry! It looks like we're not available in your area yet. Please check back another time.",
            ]);
        }

        return redirect()
            ->route('home')
            ->with(['success' => "Your location has been set to {$location->name}"]);
    }
}
