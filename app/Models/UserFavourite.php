<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserFavourite
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $user_id
 * @property string $listing_id
 * @method static \Illuminate\Database\Eloquent\Builder|UserFavourite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserFavourite newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserFavourite query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserFavourite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFavourite whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFavourite whereListingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFavourite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFavourite whereUserId($value)
 * @mixin \Eloquent
 */
class UserFavourite extends Model
{
    use HasFactory;
}
