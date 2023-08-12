<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\PostCode
 *
 * @property string $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $code
 * @property string|null $location_id
 * @property-read \App\Models\Location|null $location
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Suburb> $suburbs
 * @property-read int|null $suburbs_count
 * @method static \Illuminate\Database\Eloquent\Builder|PostCode newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostCode newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostCode query()
 * @method static \Illuminate\Database\Eloquent\Builder|PostCode whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCode whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCode whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCode whereLocationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCode whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PostCode extends Model
{
    use HasFactory, HasUuids;

    public function suburbs(): HasMany
    {
        return $this->hasMany(Suburb::class, 'post_code_id', 'id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_id', 'id');
    }
}
