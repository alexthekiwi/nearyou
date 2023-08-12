<?php

namespace App\Console\Commands;

use App\Models\Listing;
use App\Models\Tag;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Model;

class RefreshSearch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'search:refresh';

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
        // Disable our lazy loading protection for this generation
        Model::preventLazyLoading(false);

        // Reset the settings
        if (config('scout.driver') === 'meilisearch') {
            $this->call('scout:sync-index-settings');
        }

        // Reset the search indexes for each model
        $models = collect([
            Listing::class,
            Tag::class,
        ]);

        $models->each(function ($class) {
            $this->call('scout:flush', ['model' => $class]);
            $this->call('scout:import', ['model' => $class]);
        });
    }
}
