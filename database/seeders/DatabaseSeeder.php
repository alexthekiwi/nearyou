<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CountrySeeder::class,
            CitySeeder::class,
            PostCodeAndSuburbSeeder::class,
            LocationSeeder::class,
            DevUserSeeder::class,
            UserSeeder::class,
            TagSeeder::class,
            ListingSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
