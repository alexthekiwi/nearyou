<?php

namespace App\Models;

use App\Enums\ListingStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

/**
 * App\Models\Listing
 *
 * @property string $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $location_id
 * @property string|null $seller_id
 * @property string|null $buyer_id
 * @property string $title
 * @property int|null $price
 * @property ListingStatus $status
 * @property \Illuminate\Support\Carbon|null $sold_at
 * @property string|null $description
 * @property string|null $suburb_id
 * @property-read \App\Models\User|null $buyer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ListingImage> $images
 * @property-read int|null $images_count
 * @property-read \App\Models\Location|null $location
 * @property-read \App\Models\User|null $seller
 * @property-read \App\Models\Suburb|null $suburb
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tag> $tags
 * @property-read int|null $tags_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $watchers
 * @property-read int|null $watchers_count
 *
 * @method static \Database\Factories\ListingFactory factory($count = null, $state = [])
 * @method static Builder|Listing forUser(\App\Models\User $user)
 * @method static Builder|Listing newModelQuery()
 * @method static Builder|Listing newQuery()
 * @method static Builder|Listing query()
 * @method static Builder|Listing search(?string $search = null)
 * @method static Builder|Listing whereBuyerId($value)
 * @method static Builder|Listing whereCreatedAt($value)
 * @method static Builder|Listing whereDescription($value)
 * @method static Builder|Listing whereId($value)
 * @method static Builder|Listing whereLocationId($value)
 * @method static Builder|Listing wherePrice($value)
 * @method static Builder|Listing whereSellerId($value)
 * @method static Builder|Listing whereSoldAt($value)
 * @method static Builder|Listing whereStatus($value)
 * @method static Builder|Listing whereSuburbId($value)
 * @method static Builder|Listing whereTitle($value)
 * @method static Builder|Listing whereUpdatedAt($value)
 *
 * @property \Illuminate\Support\Carbon|null $deleted_at
 *
 * @method static Builder|Listing onlyTrashed()
 * @method static Builder|Listing whereDeletedAt($value)
 * @method static Builder|Listing withTrashed()
 * @method static Builder|Listing withoutTrashed()
 *
 * @mixin \Eloquent
 */
class Listing extends Model
{
    use HasFactory, HasUuids, Searchable, SoftDeletes;

    protected $casts = [
        'sold_at' => 'datetime',
        'status' => ListingStatus::class,
    ];

    public static $searchable = [
        'id',
        'title',
        'description',
        'price',
        'location_id',
        'status',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ListingImage::class, 'listing_id', 'id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id', 'id');
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id', 'id');
    }

    public function suburb(): BelongsTo
    {
        return $this->belongsTo(Suburb::class, 'suburb_id', 'id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_id', 'id');
    }

    public function watchers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_favourites', 'listing_id', 'user_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'listing_tag', 'listing_id', 'tag_id');
    }

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => round($value * 100),
        );
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        return collect(static::$searchable)
            ->mapWithKeys(fn ($property) => [
                $property => $this->{$property},
            ])
            ->merge([
                'tags' => $this->tags->pluck('title')->toArray(),
                'suburb' => $this->suburb->name,
                'location' => $this->location->name,
            ])
            ->toArray();
    }
}
