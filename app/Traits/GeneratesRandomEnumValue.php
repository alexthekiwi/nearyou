<?php

namespace App\Traits;

use ReflectionClass;

trait GeneratesRandomEnumValue
{
    public static function random()
    {
        $ref = new ReflectionClass(self::class);

        return $ref->getConstants()[array_rand($ref->getConstants())];
    }
}
