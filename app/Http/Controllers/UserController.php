<?php

namespace App\Http\Controllers;

use App\Actions\Users\GenerateUsername;
use App\Models\User;
use App\Notifications\UserActivation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize(User::class, 'viewAny');

        $sortParts = explode('_', $request->input('sort') ?? 'name_asc');
        $sort = $sortParts[0];
        $order = $sortParts[1] ?? 'asc';

        $users = User::query()
            ->when($request->input('search'), fn ($q) => $q->search($request->input('search')))
            ->orderBy($sort, $order)
            ->paginate($request->input('limit', 25))
            ->withQueryString();

        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $this->authorize('create', User::class);

        return inertia('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'username' => 'nullable|string|max:255|unique:users,username',
            'title' => 'nullable|string|max:255',
            'password' => ['nullable', Rules\Password::defaults()->min(8)->mixedCase()->letters()->numbers()->uncompromised()],
            'is_admin' => 'nullable|boolean',
        ]);

        $isAdmin = auth()->user()->is_admin && $request->is_admin;

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username ?? (new GenerateUsername)($request->name),
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $isAdmin,
        ]);

        // Send the user a welcome email
        $user->notify(new UserActivation($user));

        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $this->authorize('view', $user);

        return redirect()->route('users.edit', $user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, User $user)
    {
        $this->authorize('update', $user);

        return inertia('Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // TODO: Check this action
        $this->authorize('update', $user);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'username' => 'nullable|string|max:255|unique:users,username,'.$user->id,
            'password' => ['nullable', Rules\Password::defaults()->min(8)->mixedCase()->letters()->numbers()->uncompromised()],

        ]);

        $user->name = $request->name;

        if ($user->email !== $request->email) {
            // Check for other users with the same email
            $otherUser = User::where('email', $request->email)->first();

            if ($otherUser) {
                throw ValidationException::withMessages([
                    'email' => 'The email has already been taken.',
                ]);
            }

            $user->email = $request->email;
            $user->email_verified_at = null;
        }

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        if ($request->is_admin && auth()->user()->is_admin) {
            $user->is_admin = $request->is_admin;
        }

        $user->save();

        return redirect()->route('users.show', $user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();

        return redirect()->back();
    }
}
