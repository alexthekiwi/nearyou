<?php

namespace App\Exceptions;

use Exception;

class MissingEnvironmentVariableException extends Exception
{
    public function __construct(string $variable)
    {
        parent::__construct("Missing environment variable: {$variable}");
    }
}
