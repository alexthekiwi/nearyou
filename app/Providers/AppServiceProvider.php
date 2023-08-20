<?php

namespace App\Providers;

use App\Actions\CreateMessage;
use App\Enums\MessageStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Enable strict mode
        Model::shouldBeStrict(true);

        // Disable mass assignment protection globally
        Model::unguard();

        // Add a "withMessage" function to RedirectResponses
        RedirectResponse::macro('withMessage', function (string $message, MessageStatus|string $status = null) {
            return $this->with(['message' => (new CreateMessage)(...func_get_args())]);
        });
    }
}
