<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PhoneVerificationCode
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $phone_number
 * @property int $country_code
 * @property int $code
 * @property \Illuminate\Support\Carbon $expires_at
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode query()
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode whereCountryCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneVerificationCode whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PhoneVerificationCode extends Model
{
    use HasFactory;

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    protected $appends = [
        'for_sms',
    ];

    public function forSms(): Attribute
    {
        return Attribute::get(fn () => '+'.$this->country_code.$this->phone_number);
    }
}
