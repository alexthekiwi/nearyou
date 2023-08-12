<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Chat
 *
 * @property string $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $buyer_id
 * @property string|null $seller_id
 * @property string|null $buyer_archived_at
 * @property string|null $seller_archived_at
 * @property-read \App\Models\User|null $buyer
 * @property-read \App\Models\User|null $seller
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat query()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereBuyerArchivedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereBuyerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereSellerArchivedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereSellerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUpdatedAt($value)
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|Chat onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat withoutTrashed()
 * @mixin \Eloquent
 */
class Chat extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id', 'id');
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id', 'id');
    }
}
