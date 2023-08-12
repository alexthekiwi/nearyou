<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * App\Models\User
 *
 * @property string $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $name
 * @property string $username
 * @property string $email
 * @property string $phone
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed $password
 * @property string|null $remember_token
 * @property bool $is_admin
 * @property string|null $location_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Chat> $buyerChats
 * @property-read int|null $buyer_chats_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Review> $buyerReviews
 * @property-read int|null $buyer_reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ChatMessage> $chatMessages
 * @property-read int|null $chat_messages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Listing> $favourites
 * @property-read int|null $favourites_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Listing> $listings
 * @property-read int|null $listings_count
 * @property-read \App\Models\Location|null $location
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Listing> $purchases
 * @property-read int|null $purchases_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Chat> $sellerChats
 * @property-read int|null $seller_chats_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Review> $sellerReviews
 * @property-read int|null $seller_reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 *
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User search(string $search)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLocationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUsername($value)
 *
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids, SoftDeletes;

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
