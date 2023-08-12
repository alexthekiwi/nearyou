<?php

namespace App\Actions\Tags;

use App\Models\Tag;

class GetTags
{
    public function __invoke(bool $useCache = true)
    {
        if (! app()->environment('production')) {
            $useCache = false;
        }

        return cache()->remember(
            'tags',
            $useCache ? now()->addHours(6) : 0,
            function () {
                return Tag::query()
                    ->select(['id', 'title', 'slug'])
                    ->get();
            }
        );
    }
}
