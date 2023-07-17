<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
