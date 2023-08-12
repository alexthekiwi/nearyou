# NearYou
This application is built with the [Laravel](https://laravel.com/) framework, using [React.js](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/) for the front-end.

It uses [Inertia.js](https://inertiajs.com/) as a routing and data layer to allow us to use standard Laravel routing, while using a JavaScript framework like React for user interfaces.
It uses [Inertia.js](https://inertiajs.com/) as a routing and data layer to allow us to use standard Laravel routing, while using a JavaScript framework like React for user interfaces.
- View [composer.json](composer.json) to see back-end dependencies
- View [package.json](package.json) to see front-end dependencies

## Installation
You have two options for local installation:
- Option 1: [MacOS installation](/docs/macos/README.md)
- Option 2: [Docker](/docs/docker/README.md)

## Developer user
You can edit your `.env` file to change the `DEV_USER` variables however you like. By default you will be able to log in with "admin@nearyou.co.nz and a password of "pw". You can also click the "Admin login" button in the bottom right corner.

## Useful commands
You can run any of the below from the application root in your terminal. If you are using Docker (with Laravel Sail), replace any instances of `php` with `sail`.

### Data
Refresh the database with seed data
```
php artisan migrate:fresh --seed
```

### Search
The below command will update search indexes and settings.
See `app/Console/Commands/RefreshSearch.php`.
```
php artisan search:refresh
```

## Deployment and hosting
View the [README](/docs/deployment/README.md) for CI/CD information and hosting infrastructure.
