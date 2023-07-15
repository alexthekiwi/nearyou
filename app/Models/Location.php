<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    use HasFactory, HasUuids;

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'location_id', 'id');
    }

    public function postCodes(): HasMany
    {
        return $this->hasMany(PostCode::class, 'location_id', 'id');
    }
}
