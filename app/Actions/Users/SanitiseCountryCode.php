<?php

namespace App\Actions\Users;

class SanitiseCountryCode
{
    public function __invoke(string $countryCode): string
    {
        // Remove all non-numeric characters
        $countryCode = preg_replace('/[^0-9]/', '', $countryCode);

        return $countryCode;
    }
}
