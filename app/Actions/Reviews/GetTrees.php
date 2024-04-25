<?php

namespace App\Actions\Reviews;

use App\Models\User;

class GetTrees
{
    public function __invoke(User $user): int
    {
        $reviews = $user->receivedReviews();

        $trees = 2;

        $starsByUser = [];

        $reviews->each(function ($review) use (&$starsByUser) {
            $stars = $review->stars;

            if (!isset($starsByUser[$review->writer_id])) $starsByUser[$review->writer_id] = [];

            $starsByUser[$review->writer_id][] = $stars;
        });

        $starsByUser = collect($starsByUser)->each(function ($item) use (&$trees) {
            $treesByUser = 0;

            collect($item)->each(function ($i) use (&$treesByUser) {
                if ($i > 3) $treesByUser += 1; // 4점 이상
                else if ($i < 3) $treesByUser -= 1; // 2점 이하
            });

            // 한 유저당 최대 3개의 나무를 줄 수 있음
            $trees += min($treesByUser, 3);
        });

        return $trees;
    }
}
