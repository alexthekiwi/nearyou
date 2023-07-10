<?php

namespace App\Actions\Users;

class SanitisePhoneNumber
{
    protected $country_codes = [
        '64',
    ];

    public function __invoke(string $phoneNumber): string
    {
        // Remove all non-numeric characters
        $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);

        // Remove leading country codes
        collect($this->country_codes)->each(function ($country_code) use (&$phoneNumber) {
            if (substr($phoneNumber, 0, strlen($country_code)) === $country_code) {
                $phoneNumber = substr($phoneNumber, strlen($country_code));
            }
        });

        // Remove leading 0
        if (substr($phoneNumber, 0, 1) === '0') {
            $phoneNumber = substr($phoneNumber, 1);
        }

        return $phoneNumber;
    }
}
