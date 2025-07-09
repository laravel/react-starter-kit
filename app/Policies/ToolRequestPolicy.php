<?php
namespace App\Policies;

use App\Models\ToolRequest;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ToolRequestPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->can('view_any_tool_request');
    }

    public function view(User $user, ToolRequest $toolRequest): bool
    {
        return $user->can('view_tool_request');
    }

    public function create(User $user): bool
    {
        return $user->can('create_tool_request');
    }

    public function update(User $user, ToolRequest $toolRequest): bool
    {
        return $user->can('update_tool_request');
    }

    public function delete(User $user, ToolRequest $toolRequest): bool
    {
        return $user->can('delete_tool_request');
    }

    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_tool_request');
    }

    public function restore(User $user, ToolRequest $toolRequest): bool
    {
        return $user->can('restore_tool_request');
    }

    public function restoreAny(User $user): bool
    {
        return $user->can('restore_any_tool_request');
    }

    public function forceDelete(User $user, ToolRequest $toolRequest): bool
    {
        return $user->can('force_delete_tool_request');
    }

    public function forceDeleteAny(User $user): bool
    {
        return $user->can('force_delete_any_tool_request');
    }
}
