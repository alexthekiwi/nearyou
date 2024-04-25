<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class UserReviewController extends Controller
{
    public function index(Request $request, User $user)
    {
        $reviews = Review::query()
            ->where('target_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('limit', 5))
            ->withQueryString();

        return inertia('Users/Reviews/Index', [
            'user' => $user->toPublicArray(),
            'reviews' => $reviews,
        ]);
    }
}
