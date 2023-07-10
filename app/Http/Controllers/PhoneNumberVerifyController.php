<?php

namespace App\Http\Controllers;

use App\Actions\Users\SanitiseCountryCode;
use App\Actions\Users\SanitisePhoneNumber;
use App\Actions\Users\ValidateVerificationCode;
use App\Rules\ValidPhoneNumber;
use Illuminate\Http\Request;

class PhoneNumberVerifyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'country_code' => ['required', 'string', 'in:64'],
            'phone_number' => ['required', 'string', new ValidPhoneNumber],
            'verification_code' => ['required', 'integer'],
        ]);

        $countryCode = (new SanitiseCountryCode)($request->country_code);
        $phoneNumber = (new SanitisePhoneNumber)($request->phone_number);

        $verificationCode = (new ValidateVerificationCode)(
            code: $request->verification_code,
            phoneNumber: $phoneNumber,
            countryCode: $countryCode,
        );

        if (! $verificationCode) {
            return back()->withErrors([
                'verification_code' => 'The verification code is invalid.',
            ]);
        }

        // Store the phone number in the session as it's now verified
        session()->put('verified_phone_number', $verificationCode->for_sms);

        return redirect()->route('register');
    }

    public function destroy()
    {
        session()->forget('verified_phone_number');

        return redirect()->route('home');
    }
}
