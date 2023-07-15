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

class Listing extends Model
{
    use HasFactory, HasUuids;

    protected $casts = [
        'sold_at' => 'datetime',
        'status' => ListingStatus::class,
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

    public function watchers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_favourites', 'listing_id', 'user_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'listings', 'listing_id', 'tag_id');
    }

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => round($value * 100),
        );
    }

    public function scopeForUser(Builder $query, User $user)
    {
        return $query->where('location_id', $user->location_id);
    }
}
