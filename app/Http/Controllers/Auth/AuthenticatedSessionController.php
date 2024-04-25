<?php

namespace App\Http\Controllers\Auth;

use Cookie;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Response;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return inertia()->render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $id = $request->user()->id;

        $payload = [
            'iss' => 'nearyou',
            'id' => $id,
            'jti' => uniqid(), // JWT ID
            'iat' => now()->timestamp, // 발급 시간
            'nbf' => now()->timestamp, // 지금부터 사용 가능
            'exp' => now()->addMinutes(env('SESSION_LIFETIME'))->timestamp, // 만료 시간
            // 'exp' => now()->addSeconds(30)->timestamp, // 만료 시간
        ];

        $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        $request->session()->put('jwt', $jwt);

        Redis::sadd('user:'.$id, $jwt);

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $request->session()->forget('jwt');

        Redis::srem('user:'.$request->user()->id, $request->session()->get('jwt'));

        return redirect('/')->withCookie(Cookie::forget('access_token'));
    }
}
