<?php

namespace App\Actions\TwoFactorAuth;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class GenerateNewRecoveryCodes
{
    /**
     * Generate new recovery codes for the user.
     *
     * @param  mixed  $user
     * @return void
     */
    public function __invoke($user): Collection
    {
        return Collection::times(8, function () {
            return $this->generate();
        });
    }

    public function generate()
    {
        return Str::random(10).'-'.Str::random(10);
    }
}