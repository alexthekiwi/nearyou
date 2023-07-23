<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

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
        $fileTitle = Uuid::uuid4();
        $fileLocation = 'listing-images/'.str($fileTitle)->slug()->toString().'.jpg';

        // Get our locally saved directory of random Picsum images
        $placeholdersDir = storage_path('fixtures/listing-images');
        File::ensureDirectoryExists($placeholdersDir);

        // Select a random image from the directory
        $image = collect(File::files($placeholdersDir))->random();

        // Store it in our public storage
        Storage::disk('public')->put($fileLocation, File::get($image));

        return [
            'title' => $fileTitle,
            'file' => $fileLocation,
            'disk' => 'public',
        ];
    }
}
