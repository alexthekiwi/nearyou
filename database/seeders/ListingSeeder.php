<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\ListingImage;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create listings
        $listings = Listing::factory(100)
            ->has(ListingImage::factory(rand(1, 3)), 'images')
            ->create();

        // Get a list of tags from the database
        $tags = Tag::query()->get();

        // Add some tags to listings
        $listings->each(function (Listing $listing) use ($tags) {
            $listing->tags()->attach(
                $tags->random(rand(1, 5))
            );
        });
    }
}
