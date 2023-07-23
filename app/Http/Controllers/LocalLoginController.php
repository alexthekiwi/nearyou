<?php

namespace App\Http\Controllers;

use App\Models\User;

class LocalLoginController extends Controller
{
    public function store()
    {
        $user = User::query()->firstWhere('email', env('DEV_USER_EMAIL'));

        auth()->loginUsingId($user->id);

        return redirect()->route('home');
    }
}
