<?php

namespace App\Actions\Users;

use App\Models\PhoneVerificationCode;

class ValidateVerificationCode
{
    public function __invoke(int $code, string $countryCode, string $phoneNumber): PhoneVerificationCode|null
    {

        return PhoneVerificationCode::query()
            ->where('code', $code)
            ->where('country_code', $countryCode)
            ->where('phone_number', $phoneNumber)
            ->where('expires_at', '>', now()->toDateTimeString())
            ->latest()
            ->first();
    }
}
