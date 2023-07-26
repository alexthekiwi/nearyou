<?php

namespace App\Actions\Location;

use App\Models\Location;
use App\Models\PostCode;
use App\Models\User;

class SetNewLocation
{
    public function __invoke(string $postCode, ?User $user): Location|null
    {
        $user ??= auth()->user();

        // Match the postcode to one of our stored locations
        $postCodeObject = PostCode::query()
            ->where('code', $postCode)
            ->with('location')
            ->first();

        if (! $postCodeObject) {
            // Not an area we're available in, advise the customer
            return null;
        }

        $location = $postCodeObject->location;

        if (! $location) {
            // We don't have a location with this postcode
            // Advise customer it's not one of our areas,
            // and also log so we know to add this
            logger()->channel('bugs')->warning("Missing location for post code: {$postCodeObject->code}");

            return null;
        }

        // Update the user's `location_id` with the ID
        $user->update([
            'location_id' => $location->id,
        ]);

        return $location;
    }
}
