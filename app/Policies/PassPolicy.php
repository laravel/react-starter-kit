<?php

namespace App\Policies;

use App\Models\Pass;
use App\Models\User;

class PassPolicy
{
    /**
     * Determine if the user can view the pass.
     */
    public function view(User $user, Pass $pass): bool
    {
        return $user->id === $pass->user_id;
    }

    /**
     * Determine if the user can update the pass.
     */
    public function update(User $user, Pass $pass): bool
    {
        return $user->id === $pass->user_id;
    }

    /**
     * Determine if the user can delete the pass.
     */
    public function delete(User $user, Pass $pass): bool
    {
        return $user->id === $pass->user_id;
    }
}
