<?php

namespace App\Actions\Users;

class SanitisePhoneNumber
{
    public function __invoke(string $phoneNumber): string
    {
        // Remove all non-numeric characters
        $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);

        // Remove leading 0
        if (substr($phoneNumber, 0, 1) === '0') {
            $phoneNumber = substr($phoneNumber, 1);
        }

        return $phoneNumber;
    }
}
