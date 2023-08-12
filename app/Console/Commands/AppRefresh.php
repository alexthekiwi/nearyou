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

        $this->call('migrate:fresh', ['--force' => true, '--seed' => true]);
        $this->call('search:refresh');
        // TODO: Fix this composer package
        // $this->call('typescript:generate');
    }
}
