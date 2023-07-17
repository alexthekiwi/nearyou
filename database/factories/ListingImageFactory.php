<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ListingImage>
 */
class ListingImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // TODO: Decide how to do this when I have better internet

        // $id = rand(0, 200);
        // $image = "https://picsum.photos/id/{$id}/800/800";
        $fileTitle = fake()->word().' '.fake()->word().' '.fake()->word();
        // $fileName = "listing-images/{$id}.jpg";

        File::ensureDirectoryExists(storage_path('app/public/listing-images'));
        $image = fake()->image(storage_path('app/public/listing-images'), 800, 800, null, false);

        return [
            'title' => $fileTitle,
            'file' => 'listing-images/'.$image,
            'disk' => 'public',
        ];
    }
}
