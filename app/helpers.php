<?php

use App\Actions\CreateMessage;
use App\Enums\MessageStatus;

if (! function_exists('message')) {
    function message(string $message, MessageStatus|string|null $status = null)
    {
        return (new CreateMessage)(...func_get_args());
    }
}
