<?php

namespace App\Console\Commands;

use App\Models\Listing;
use Illuminate\Console\Command;

class RefreshSearch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:search:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refresh the search indexes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Reset the settings
        $this->call('scout:sync-index-settings');

        // Reset the search indexes for each model
        $models = collect([Listing::class]);

        $models->each(function ($class) {
            $this->call('scout:flush', ['model' => $class]);
            $this->call('scout:import', ['model' => $class]);
        });
    }
}
