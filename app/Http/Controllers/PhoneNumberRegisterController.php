<?php

namespace App\Http\Controllers;

use App\Actions\Users\SanitiseCountryCode;
use App\Actions\Users\SanitisePhoneNumber;
use App\Models\PhoneVerificationCode;
use App\Rules\ValidPhoneNumber;
use Illuminate\Http\Request;

class PhoneNumberRegisterController extends Controller
{
    public function store(Request $request)
    {
        // Validate the input
        $request->validate([
            'country_code' => ['required', 'string', 'in:64'],
            'phone_number' => ['required', 'string', new ValidPhoneNumber],
        ]);

        $countryCode = (new SanitiseCountryCode)($request->country_code);
        $phoneNumber = (new SanitisePhoneNumber)($request->phone_number);

        // Create the code
        $verificationCode = PhoneVerificationCode::create([
            'phone_number' => $phoneNumber,
            'country_code' => $countryCode,
            'code' => app()->environment('production') ? rand(100000, 999999) : '123456',
            'expires_at' => now()->addMinutes(30),
        ]);

        session()->put('phone_number', $phoneNumber);
        session()->put('country_code', $countryCode);

        // Send the SMS notification
        // TODO

        // Respond OK
        session()->flash('message', $verificationCode->for_sms);

        return back();
    }
}
