<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AppRefresh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refresh the application';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (! $this->confirm('This will completely wipe application data. Do you wish to continue?')) {
            return $this->line('Command aborted.');
        }

        // Clear config
        $this->call('config:clear');

        // Migrate and seed the database
        $this->call('migrate:fresh', ['--force' => true, '--seed' => true]);

        // Symlink paths
        $this->call('storage:link');

        // Refresh search indexes
        $this->call('search:refresh');

        // Generate TypeScript interfaces
        $this->call('typescript:generate');

        // Cache config (only in production)
        if (! app()->environment('local')) {
            $this->call('config:cache');
        }
    }
}
