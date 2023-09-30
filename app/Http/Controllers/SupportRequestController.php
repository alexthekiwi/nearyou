<?php

namespace App\Http\Controllers;

use App\Models\SupportRequest;
use App\Notifications\AdminSupportRequestCreated;
use App\Notifications\UserSupportRequestCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class SupportRequestController extends Controller
{
    public function create()
    {
        return inertia('SupportRequests/Create');
    }

    public function store(Request $request)
    {
        // Validate the request
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc,dns', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        // Create the support request in our database
        $supportRequest = SupportRequest::create([
            ...$data,
            'user_id' => auth()->id(),
        ]);

        // Notify the user and admin
        Notification::route('mail', $request->email)->notify(new UserSupportRequestCreated($supportRequest));
        Notification::route('mail', config('mail.to.admin'))->notify(new AdminSupportRequestCreated($supportRequest));

        // Redirect the user
        if (auth()->check()) {
            return to_route('dashboard')->with('message', 'Your support request has been submitted.');
        }

        return to_route('support')->with('message', 'Your support request has been submitted.');
    }

    public function update()
    {
        //
    }

    public function destroy()
    {
        //
    }
}
