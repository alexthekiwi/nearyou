# NearYou - MacOS installation

## Prerequisites

### Laravel Herd
The easiest way to get setup on Mac is to use Laravel Herd. Simply visit the [Laravel Herd website](https://herd.laravel.com/) and download the package.

Once downloaded, install using the `.dmg` file and follow the instructions.

Laravel Herd doesn't require HomeBrew or any other dependencies. It will install and configure the following services for you:
- PHP (versions 7.4 - 8.3)
- Nginx
- Dnsmasq

### MySQL
You will need MySQL installed locally with a database ready to go. The app assumes this database is called `nearyou`, with a user of `root` and no password.

I recommend using [DBngin](https://dbngin.com/) to install and manage MySQL for a no-stress, simple setup.

### Mailpit
For testing emails locally, the [Mailpit](https://github.com/axllent/mailpit) package is recommended. Just visit the repo and follow the installation instructions. The below command should be all you need.

```sh
sudo bash < <(curl -sL https://raw.githubusercontent.com/axllent/mailpit/develop/install.sh)
```

## Installation
Install PHP dependencies
```sh
composer install
```

Create environment variables (edit the file according to your environment)
```sh
cp .env.macos.example .env
```

Generate an encryption key for the app
```sh
php artisan key:generate
```

Create the database schema and seed data
```sh
php artisan migrate:fresh --seed
```

Create file directory symlinks
```sh
php artisan storage:link
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