<?php

namespace App\Actions\Users;

use App\Models\User;

class GenerateUsername
{
    public function __invoke(User|string $userOrName): string
    {
        $usersActualName = $userOrName instanceof User ? $userOrName->name : $userOrName;

        $username = $this->generate($usersActualName);

        while (User::query()->where('username', $username)->exists()) {
            $username = $this->generate($usersActualName, true);
        }

        return $username;
    }

    public function generate(
        string $name,
        bool $addRandomNumbers = false
    ): string {
        // Lowercase
        $username = strtolower($name);

        // Only letters and numbers
        $username = preg_replace('/[^a-z0-9]/', '', $username);

        // Start adding random numbers until we have a unique username
        if ($addRandomNumbers) {
            $username .= random_int(1, 9);
        }

        return $username;
    }
}
