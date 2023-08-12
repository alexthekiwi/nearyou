<?php

namespace App\Actions\Tags;

use App\Models\Tag;

class FindOrCreateTag
{
    public function __invoke(string $name): Tag
    {
        $tag = Tag::query()
            // Search by name
            ->where('name', $name)
            // We also want to check if the sluggified version of the name exists.
            ->orWhere('slug', str($name)->slug()->toString())
            ->first();

        if (! $tag) {
            $tag = Tag::create([
                'name' => $name,
            ]);
        }

        return $tag;
    }
}
