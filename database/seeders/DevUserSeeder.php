<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Seeder;

class DevUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make a dev user if specified in `.env`
        if (! env('DEV_USER_EMAIL')) {
            return;
        }

        $user = User::factory()->create([
            'name' => env('DEV_USER_NAME' ?? 'Dev User'),
            'username' => env('DEV_USER_USERNAME' ?? 'admin'),
            'email' => env('DEV_USER_EMAIL'),
            'password' => bcrypt(env('DEV_USER_PASSWORD') ?? 'password'),
            'is_admin' => true,
        ]);

        $user->update([
            'location_id' => Location::query()->where('name', 'East Auckland')->first()->id,
        ]);
    }
}
