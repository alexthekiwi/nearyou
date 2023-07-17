<?php

namespace App\Http\Controllers;

use App\Actions\Location\SetNewLocation;
use App\Enums\MessageStatus;

class LocationController extends Controller
{
    public function store()
    {
        $location = (new SetNewLocation)(auth()->user());

        if (! $location) {
            return to_route('dashboard')->withMessage(
                "Sorry! It looks like we're not available in your area yet. Please check back another time.",
                MessageStatus::WARNING
            );
        }

        return to_route('home')->withMessage("Your location has been set to {$location->name}", MessageStatus::SUCCESS);
    }

    public function update()
    {
        $location = (new SetNewLocation)(auth()->user());

        if (! $location) {
            return to_route('dashboard')->withMessage(
                "Sorry! It looks like we're not available in your area yet. Please check back another time.",
                MessageStatus::WARNING
            );
        }

        return to_route('home')->withMessage("Your location has been updated to {$location->name}", MessageStatus::SUCCESS);
    }
}
