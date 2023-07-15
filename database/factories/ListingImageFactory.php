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
        $id = rand(0, 200);
        $image = "https://picsum.photos/id/{$id}/800/800";
        $fileTitle = fake()->word().' '.fake()->word().' '.fake()->word();
        $fileName = "listing-images/{$id}.jpg";

        File::ensureDirectoryExists(storage_path('app/public/listing-images'));

        file_put_contents(storage_path("app/public/listing-images/{$id}.jpg"), file_get_contents($image));

        return [
            'title' => $fileTitle,
            'file' => $fileName,
            'disk' => 'public',
        ];
    }
}
