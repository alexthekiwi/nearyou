# Near You

## Installation
If using Laravel Valet, create a symlink to the project
```sh
valet link nearyou
```

Install PHP dependencies
```sh
composer install
```

Create environment variables (edit the file according to your environment)
```sh
cp .env.example .env
```

Generate an encryption key for the app
```sh
php artisan key:generate
```

Install front-end dependencies
```sh
npm install
```

Compile frontend dependencies
```sh
npm run build
```

## Development
Start the development server
```sh
npm run dev
```

## Deployment
Deploy to production
```sh
git push main
```

Deploy to test
```sh
git push test
```

## Hosting setup
App deployment script for Laravel Forge
```sh
cd $FORGE_SITE_PATH
git pull origin $FORGE_SITE_BRANCH

# Install PHP dependencies
$FORGE_COMPOSER install --no-interaction --prefer-dist --optimize-autoloader

# Reload PHP-FPM
( flock -w 10 9 || exit 1
    echo 'Restarting FPM...'; sudo -S service $FORGE_PHP_FPM reload ) 9>/tmp/fpmlock

if [ -f artisan ]; then
    # Migrate the database
    $FORGE_PHP artisan migrate --force

    # Sync the schedule monitor
    $FORGE_PHP schedule-monitor:sync

    # Restart Horizon (queues)
    $FORGE_PHP artisan horizon:terminate

    # Clear and re-cache the config
    $FORGE_PHP artisan config:cache
fi

if [ -f package.json ]; then
    # Install dependencies
    npm install

    # Compile front-end assets
    npm run build
fi
```

Cache static assets with Nginx (edit Nginx config)
```nginx
# Cache static assets
location ~* \.(css|gif|jpg|js|png|ico|otf|ttf|woff|woff2|jpeg|webp)$ {
    access_log off;
    expires max;
}
```
