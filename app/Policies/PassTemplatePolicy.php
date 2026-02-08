<?php

namespace App\Policies;

use App\Models\PassTemplate;
use App\Models\User;

class PassTemplatePolicy
{
    /**
     * Determine if the user can view the pass template.
     */
    public function view(User $user, PassTemplate $template): bool
    {
        return $user->id === $template->user_id;
    }

    /**
     * Determine if the user can update the pass template.
     */
    public function update(User $user, PassTemplate $template): bool
    {
        return $user->id === $template->user_id;
    }

    /**
     * Determine if the user can delete the pass template.
     */
    public function delete(User $user, PassTemplate $template): bool
    {
        return $user->id === $template->user_id;
    }
}
