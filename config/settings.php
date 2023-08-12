<?php

return [
    /**
     * Location settings
     */
    'location' => [
        'use_random_location' => env('USE_RANDOM_LOCATION', false),
    ],

    /**
     * Listing settings
     */
    'listings' => [
        'simulate_slow_search' => env('SIMULATE_SLOW_SEARCH', false),
    ],

];
