<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Chat::class);

        $chats = Chat::query()
            ->where('seller_id', auth()->id())
            ->orWhere('buyer_id', auth()->id())
            ->orderBy('updated_at', 'desc')
            ->paginate();

        return inertia('Chat/Index', [
            'chats' => $chats,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO: Create a new chat between the authenticated user and the listing owner
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        // TODO: Show the chat messages between the users
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        // TODO: Add a new message to the chat
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        // TODO: Archive the chat for the authenticated user only
    }
}
