<?php

namespace App\Http\Controllers;

use App\Actions\Sms\SendSmsVerificationCode;
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

        // See if the user has sent too many requests in the past 30 minutes
        if (
            // Too many individual requests
            session('phone_number_verification_count', 0) >= 3 ||
            // Already verified this phone number
            PhoneVerificationCode::where('phone_number', $phoneNumber)->where('created_at', '>', now()->subMinutes(3))->exists()
        ) {
            return back()->withErrors([
                'phone_number' => 'You have requested too many verification codes. Please wait a few minutes and try again.',
            ]);
        }

        // Create the code
        $verificationCode = PhoneVerificationCode::create([
            'phone_number' => $phoneNumber,
            'country_code' => $countryCode,
            'code' => config('settings.notifications.sms_active') ? rand(1000, 9999) : '1234',
            'expires_at' => now()->addMinutes(30),
        ]);

        session()->put('phone_number', $phoneNumber);
        session()->put('country_code', $countryCode);

        // Send the SMS notification
        (new SendSmsVerificationCode)($verificationCode);

        // Count the amount of codes this user has requested
        session(['phone_number_verification_count' => session('phone_number_verification_count', 0) + 1]);

        // Respond OK
        session()->flash('message', $verificationCode->for_sms);

        return back();
    }
}
