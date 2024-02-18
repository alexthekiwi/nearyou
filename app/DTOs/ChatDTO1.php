<?php

namespace App\DTOs;

use App\Models\Chat;
use Illuminate\Support\Facades\Log;

class ChatDTO1
{
    public $id;
    public $opponent;
    public $thumbnail;
    public $suburb;

    public function __construct(Chat $chat)
    {
        $this->id = $chat->id;

        // Log::debug('$chat->buyer: ' . $chat->buyer);

        // if ($user_id == $chat->buyer_id) {
        //     $this->opponent = $chat->listing->seller->name;
        // } else {
        //     $this->opponent = $chat->buyer;
        // }

        $this->thumbnail = $chat->listing->images[0]->file;
        $this->suburb = $chat->listing->suburb ? $chat->listing->suburb->name : null;
    }
}