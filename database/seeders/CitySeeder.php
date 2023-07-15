<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nz = Country::query()->firstOrCreate([
            'code' => 'NZL',
        ], [
            'name' => 'New Zealand',
            'code' => 'NZL',
        ]);

        $nzCities = [
            'Northland',
            'Auckland',
            'Waikato',
            'Bay of Plenty',
            'Gisborne',
            'Hawke\'s Bay',
            'Taranaki',
            'Manawatu-Whanganui',
            'Wellington',
            'Tasman',
            'Nelson',
            'Marlborough',
            'West Coast',
            'Canterbury',
            'Otago',
            'Southland',
        ];

        $nz->cities()->createMany(collect($nzCities)->map(fn ($city) => ['name' => $city]));
    }
}
