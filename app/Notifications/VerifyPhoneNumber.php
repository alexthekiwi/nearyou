<?php

namespace App\Notifications;

use App\Models\PhoneVerificationCode;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\VonageMessage;
use Illuminate\Notifications\Notification;

class VerifyPhoneNumber extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public PhoneVerificationCode $phoneVerificationCode)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['vonage'];
    }

    public function toVonage(object $notifiable): VonageMessage
    {
        $code = $this->phoneVerificationCode->code;
        $message = "Your verification code for Near You is {$code}";

        return (new VonageMessage)
            ->clientReference((string) $this->phoneVerificationCode->id)
            ->content($message);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
