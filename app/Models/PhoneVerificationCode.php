<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
