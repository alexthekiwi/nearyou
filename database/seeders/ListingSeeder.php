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

        Listing::factory(1000)
            ->has(ListingImage::factory(rand(1, 3)), 'images')
            ->create();
    }
}
