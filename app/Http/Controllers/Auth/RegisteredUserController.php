<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Cookie;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'phoneNumber' => session('verified_phone_number'),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => 'required|string|alpha_num|max:255|unique:'.User::class,
            'name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'username' => $request->username,
            'name' => $request->username ?: $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => session('verified_phone_number'),
        ]);

        event(new Registered($user));

        Auth::login($user);

        session()->forget('verified_phone_number');

        // Redis::publish('channel', json_encode($user));
        // Redis::publish('channel', json_encode(session()->all()));
        // Redis::publish('channel', session()->getName());
        // Redis::publish('channel', Cookie::get(session()->getName()));

        return redirect(RouteServiceProvider::HOME);
    }
}
