# NearYou - Docker with Laravel Sail

## Prerequisites

### Docker Desktop
You will first need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

### Laravel Sail alias
It's recommended (but not required) to set up a bash/zsh alias to use the `sail` command. This just saves you typing `./vendor/bin/sail` before each command you want to run. The below instructions assume you have done this. You can set up an alias in your `.bashrc` or `.zshrc` file as follows.

Open the file in vi
```
vi ~/.bashrc (or ~/.zshrc)
```

Copy and paste this alias somewhere in the file
```
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

## Installation
Create environment variables (edit the file according to your environment)
```sh
cp .env.docker.example .env
```

Start the Docker containers (in detached mode)
```sh
sail up -d
```

Install PHP dependencies
```sh
sail composer install
```

Generate an encryption key for the app
```sh
sail artisan key:generate
```

Create the database schema and seed data
```sh
sail artisan migrate:fresh --seed
```

Create file directory symlinks
```sh
sail artisan storage:link
```

Install front-end dependencies
```sh
sail npm install
```

Compile frontend dependencies
```sh
sail npm run build
```

## Development
Start the development server
```sh
sail npm run dev
```

To attach a terminal shell to your app container
```sh
docker exec -it nearyou-laravel.test-1 /bin/sh
```
