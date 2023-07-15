<?php

namespace App\Enums;

enum MessageStatus: string
{
    case SUCCESS = 'success';
    case WARNING = 'warning';
    case ERROR = 'error';
    case DEFAULT = 'default';
}
