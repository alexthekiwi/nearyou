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
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static Builder|Listing onlyTrashed()
 * @method static Builder|Listing whereDeletedAt($value)
 * @method static Builder|Listing withTrashed()
 * @method static Builder|Listing withoutTrashed()
 * @method static Builder|Listing whereNotSold(?bool $includeReserved = true)
 * @mixin \Eloquent
 */
class Listing extends Model
{
    use HasFactory, HasUuids, Searchable, SoftDeletes;

    protected $casts = [
        'sold_at' => 'datetime',
        'status' => ListingStatus::class,
    ];

    public static $filterable = ['title', 'tags', 'description', 'price', 'location_id', 'status', 'buyer_id', 'seller_id'];

    public static $searchable = ['title', 'tags', 'description'];

    public static $sortable = ['created_at', 'title', 'price', 'status'];

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

    public function tags(): HasMany
    {
        return $this->hasMany(ListingTag::class, 'listing_id');
    }

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => round($value * 100),
        );
    }

    public function isAvailable(?bool $includeReserved = true): Attribute
    {
        $statuses = collect($includeReserved ? [ListingStatus::AVAILABLE, ListingStatus::RESERVED] : [ListingStatus::AVAILABLE]);

        return Attribute::get(fn () => $statuses->contains($this->status));
    }

    public function scopeWhereNotSold(Builder $query, ?bool $includeReserved = true): Builder
    {
        $statuses = $includeReserved ? [ListingStatus::AVAILABLE, ListingStatus::RESERVED] : [ListingStatus::AVAILABLE];

        return $query->whereIn('status', $statuses);
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
            ->merge(config('scout.driver') === 'meilisearch' ? [
                // 'sadasdsa' => [],
                'tags' => $this->tags,
                // 'suburb' => $this->suburb?->name,
                'location' => $this->location?->name,
            ] : [])
            ->toArray();
    }

    static public function parseListing(Listing $listing)
    {
        $listing = [
            'id' => $listing->id,
            'seller' => $listing->relationLoaded('seller') ? $listing->seller->name : null,
            'seller_id' => $listing->relationLoaded('seller') ? $listing->seller->id : null,
            'title' => $listing->title,
            'images' => $listing->relationLoaded('images') ? array_column($listing->images->toArray(), 'file') : null,
            'tags' => $listing->relationLoaded('tags') ? array_column($listing->tags->toArray(), 'tag') : null,
            'description' => $listing->description,
            'location' => $listing->relationLoaded('location') ? $listing->location->name : null,
            'price' => $listing->price,
            'created_at' => $listing->created_at,
            'status' => $listing->status,
            'suburb' => $listing->relationLoaded('suburb') ? $listing->suburb->name : null,
        ];

        return $listing;
    }
}
