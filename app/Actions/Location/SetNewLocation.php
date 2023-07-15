<?php

namespace App\Actions\Location;

use App\Models\Location;
use App\Models\PostCode;
use App\Models\User;

class SetNewLocation
{
    public function __invoke(?User $user = null): Location|null
    {
        $user ??= auth()->user();

        // Get the user's IP
        $ip = (new GetOriginalClientIp)();

        // Get the current user info and store it in the cache
        $currentUserInfo = cache()->store()->remember(
            "{$ip}_location",
            now()->addMinute(),
            fn () => \Stevebauman\Location\Facades\Location::get($ip)
        );

        if (! $currentUserInfo) {
            // No valid response from the provided IP address
            return null;
        }

        if (! $currentUserInfo->zipCode) {
            // No postcode in our system, advise the customer and log a bug at our end (if an NZ customer)
            if ($currentUserInfo->countryCode === 'NZ') {
                logger()->channel('bugs')->warning('Missing post code', $currentUserInfo->toArray());
            }

            return null;
        }

        // Match the postcode to one of our stored locations
        $postCode = PostCode::query()
            ->where('code', $currentUserInfo->zipCode)
            ->with('location')
            ->first();

        if (! $postCode) {
            // Not an area we're available in, advise the customer
            return null;
        }

        $location = $postCode->location;

        if (! $location) {
            // We don't have a location with this postcode
            // Advise customer it's not one of our areas,
            // and also log so we know to add this
            logger()->channel('bugs')->warning("Missing location for post code: {$postCode->code}");

            return null;
        }

        // Update the user's `location_id` with the ID
        $user->update([
            'location_id' => $location->id,
        ]);

        return $location;
    }
}
