<?php

use App\Providers\RouteServiceProvider;

test('registration screen can be rendered with a verified phone number', function () {
    session()->put('verified_phone_number', '0212345678');
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('registration screen cannot be rendered without a verified phone number', function () {
    $response = $this->get('/register');

    $response->assertStatus(302);
});

test('new users can register', function () {
    session()->put('verified_phone_number', '0212345678');

    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'username' => 'testuser',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::HOME);
});
