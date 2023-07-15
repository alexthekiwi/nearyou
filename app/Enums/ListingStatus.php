<?php

namespace App\Enums;

use App\Traits\GeneratesRandomEnumValue;

enum ListingStatus: string
{
    use GeneratesRandomEnumValue;

    case AVAILABLE = 'available';
    case RESERVED = 'reserved';
    case SOLD = 'sold';
}
