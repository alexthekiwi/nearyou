<?php

use App\Models\SupportRequest;
use App\Models\User;
use App\Notifications\AdminSupportRequestCreated;
use App\Notifications\UserSupportRequestCreated;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\actingAs;

test('a non-authenticated user can view the support request form', function () {
    $this->get('/support-requests/create')->assertStatus(200);
});

test('an authenticated user can view the support request form', function () {
    /** @var Authenticatable */
    $user = User::factory()->create();

    actingAs($user)->get('/support-requests/create')->assertStatus(200);
});

test('a non-authenticated user can make a support request', function () {
    $notification = Notification::fake();

    $this->post('/support-requests', [
        'name' => 'Test Name',
        'email' => 'hello@alexclark.co.nz',
        'phone' => '1234567890',
        'subject' => 'Test Subject',
        'message' => 'Test Message',
    ])
        ->assertSessionHasNoErrors()
        ->assertRedirectToRoute('support');

    expect(SupportRequest::count())->toBe(1);

    $notification->assertSentTo(Notification::route('mail', 'hello@alexclark.co.nz'), UserSupportRequestCreated::class);
    $notification->assertSentTo(Notification::route('mail', config('mail.to.admin')), AdminSupportRequestCreated::class);
});

test('an authenticated user can make a support request', function () {
    /** @var Authenticatable */
    $user = User::factory()->create();

    $notification = Notification::fake();

    actingAs($user)->post('/support-requests', [
        'name' => 'Test Name',
        'email' => 'hello@alexclark.co.nz',
        'phone' => '1234567890',
        'subject' => 'Test Subject',
        'message' => 'Test Message',
    ])
        ->assertSessionHasNoErrors()
        ->assertRedirectToRoute('dashboard');

    expect($user->supportRequests()->count())->toBe(1);

    $notification->assertSentTo(Notification::route('mail', 'hello@alexclark.co.nz'), UserSupportRequestCreated::class);
    $notification->assertSentTo(Notification::route('mail', config('mail.to.admin')), AdminSupportRequestCreated::class);
});

test('a non-authenticated user cannot make a support request with invalid details', function () {
    $notification = Notification::fake();

    $this->post('/support-requests', [
        'name' => 'Test Name',
        'email' => null,
        'phone' => '1234567890',
        'subject' => null,
        'message' => null,
    ])
        ->assertSessionHasErrors(['email', 'subject', 'message'])
        ->assertRedirect();

    expect(SupportRequest::count())->toBe(0);

    $notification->assertNotSentTo(Notification::route('mail', config('mail.to.admin')), AdminSupportRequestCreated::class);
});
