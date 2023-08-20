<?php

namespace App\Actions\Sms;

use App\Models\PhoneVerificationCode;
use Vonage\Laravel\Facade\Vonage;

class SendSmsVerificationCode
{
    public function __invoke(PhoneVerificationCode $phoneVerificationCode)
    {
        if (! config('settings.notifications.sms_active')) {
            return;
        }

        $text = new \Vonage\SMS\Message\SMS(
            to: $phoneVerificationCode->for_sms,
            from: config('vonage.sms_from'),
            message: $phoneVerificationCode->message,
        );

        Vonage::sms()->send($text);
    }
}
