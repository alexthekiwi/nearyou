<?php

namespace App\Actions\Reviews;

use App\Models\Review;
use App\Models\User;

class GetGreenScore
{
    /**
     * Take a user and get their green score based on our algorithm
     * Return a percentage between 0 and 100
     */
    public function __invoke(User $user): int
    {
        $reviews = Review::query()
            // Either as the buyer or seller
            ->where('seller_id', $user->id)
            ->orWhere('buyer_id', $user->id)
            // That are not the user reviewing themselves
            ->where('seller_id', '!=', 'buyer_id')
            ->get();

        // TODO: Build this algorithm properly
        $totalScore = 0;

        foreach ($reviews as $review) {
            $totalScore += $review->stars;
        }

        $averageScore = $totalScore / $reviews->count();

        return $averageScore * 20;
    }
}
