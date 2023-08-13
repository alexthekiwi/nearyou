<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()
            ->each(function (User $user) {
                $user->buyerReviews()->saveMany(Review::factory(5)->make([
                    'buyer_id' => $user->id,
                ]));

                $user->sellerReviews()->saveMany(Review::factory(5)->make([
                    'seller_id' => $user->id,
                ]));
            });
    }
}
