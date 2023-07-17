<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\ListingImage;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Listing::query()->delete();

        Listing::factory(600)
            // ->has(ListingImage::factory(rand(1, 6)), 'images')
            ->create();
    }
}
