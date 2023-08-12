<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ListingImage
 *
 * @property string $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $listing_id
 * @property string $title
 * @property string $file
 * @property string $disk
 * @property-read \App\Models\Listing $listing
 * @method static \Database\Factories\ListingImageFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage whereDisk($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage whereListingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListingImage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ListingImage extends Model
{
    use HasFactory, HasUuids;

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class, 'listing_id', 'id');
    }
}
