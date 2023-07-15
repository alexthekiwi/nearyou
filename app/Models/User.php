<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_admin' => 'boolean',
    ];

    public static function boot()
    {
        parent::boot();

        self::saving(function ($model) {
            // Ensure falsey values are always set to "false" to avoid DB type issues
            if (! $model->is_admin) {
                $model->is_admin = false;
            }
        });
    }

    public function listings(): HasMany
    {
        return $this->hasMany(Listing::class, 'seller_id', 'id');
    }

    public function purchases(): HasMany
    {
        return $this->hasMany(Listing::class, 'buyer_id', 'id');
    }

    public function sellerReviews(): HasMany
    {
        return $this->hasMany(Review::class, 'seller_id', 'id');
    }

    public function buyerReviews(): HasMany
    {
        return $this->hasMany(Review::class, 'buyer_id', 'id');
    }

    public function sellerChats(): HasMany
    {
        return $this->hasMany(Chat::class, 'seller_id', 'id');
    }

    public function buyerChats(): HasMany
    {
        return $this->hasMany(Chat::class, 'buyer_id', 'id');
    }

    public function chatMessages(): HasMany
    {
        return $this->hasMany(ChatMessage::class, 'user_id', 'id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_id', 'id');
    }

    public function favourites(): BelongsToMany
    {
        return $this->belongsToMany(Listing::class, 'user_favourites', 'user_id', 'listing_id');
    }

    public function scopeSearch(Builder $query, string $search)
    {
        return $query
            ->where('id', '=', "{$search}")
            ->orWhere('name', 'like', "{$search}%")
            ->orWhere('email', 'like', "{$search}%");
    }
}
