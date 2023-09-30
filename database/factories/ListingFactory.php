<?php

namespace Database\Factories;

use App\Enums\ListingStatus;
use App\Models\Location;
use App\Models\Suburb;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'seller_id' => User::inRandomOrder()->first()->id,
            'buyer_id' => User::inRandomOrder()->first()->id,
            'location_id' => Location::inRandomOrder()->first()?->id,
            'suburb_id' => Suburb::inRandomOrder()->first()?->id,
            'title' => fake()->sentence,
            'price' => fake()->numberBetween(0, 2000),
            'status' => ListingStatus::random(),
            'description' => fake()->paragraph,
        ];
    }
}
