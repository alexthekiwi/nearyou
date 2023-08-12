<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Meilisearch\Exceptions\CommunicationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // Give a better error message for Meilisearch connection errors
        $this->reportable(function (CommunicationException $e) {
            throw new \Exception(
                'Meilisearch is not running. Start it with `meilisearch --master-key="masterKey"`. Or change your "SCOUT_DRIVER" to "database".'
            );
        });

        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
