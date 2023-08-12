<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Suburb
 *
 * @property string $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $name
 * @property string $city_id
 * @property string $post_code_id
 * @property-read \App\Models\City $city
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Listing> $listings
 * @property-read int|null $listings_count
 * @property-read \App\Models\PostCode $postCode
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb query()
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb whereCityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb wherePostCodeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suburb whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Suburb extends Model
{
    use HasFactory, HasUuids;

    public function listings(): HasMany
    {
        return $this->hasMany(Listing::class, 'location_id', 'id');
    }

    public function postCode(): BelongsTo
    {
        return $this->belongsTo(PostCode::class, 'post_code_id', 'id');
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }
}
