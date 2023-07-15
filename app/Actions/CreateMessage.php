<?php

namespace App\Actions;

use App\Enums\MessageStatus;

class CreateMessage
{
    public function __invoke(string $message, MessageStatus|string|null $status = null)
    {
        if (! $status) {
            $status = MessageStatus::DEFAULT;
        }

        if (is_string($status)) {
            $status = MessageStatus::from($status);
        }

        return [
            'message' => $message,
            'status' => ($status ?? MessageStatus::DEFAULT)->value,
        ];
    }
}
