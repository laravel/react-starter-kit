<?php

namespace App\Listeners;

use App\Actions\Teams\CreateTeam;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

class CreatePersonalTeam
{
    public function __construct(private CreateTeam $createTeam)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        /** @var User $user */
        $user = $event->user;

        $this->createTeam->handle($user, $user->name."'s Team", isPersonal: true);
    }
}
