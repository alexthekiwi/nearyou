<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class GeographySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            CountrySeeder::class,
            CitySeeder::class,
            PostCodeAndSuburbSeeder::class,
            LocationSeeder::class,
        ]);
    }
}
