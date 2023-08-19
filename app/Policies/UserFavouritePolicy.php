<?php

namespace App\Policies;

use App\Models\User;

class UserFavouritePolicy
{
    public function save(User $user)
    {
        dd($user);
    }
}
