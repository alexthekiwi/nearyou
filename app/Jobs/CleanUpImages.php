<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\ListingImage;

class CleanUpImages implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $listingImageId;

    public function __construct($listingImageId)
    {
        $this->listingImageId = $listingImageId;
    }

    public function handle()
    {
        $listingImage = \App\Models\ListingImage::query()
            ->whereKey($this->listingImageId)
            ->where('listing_id', null)
            ->first();

        if ($listingImage) {
            $fileName = $listingImage->file;

            Storage::disk('s3')->delete($fileName.'.jpg');
            Storage::disk('s3')->delete($fileName.'.webp');

            $listingImage->delete();
        }
    }
}
