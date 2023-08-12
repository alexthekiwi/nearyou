<?php

namespace App\Enums;

use App\Traits\GeneratesRandomEnumValue;

enum ListingStatus: int
{
    use GeneratesRandomEnumValue;

    case AVAILABLE = 1;
    case PROCESSING = 2;
    case RESERVED = 3;
    case SOLD = 4;
}
