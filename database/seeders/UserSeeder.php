<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $locations = Location::query()->inRandomOrder()->get();

        User::factory()->count(100)->create([
            'location_id' => $locations->random()->id,
        ]);
    }
}
