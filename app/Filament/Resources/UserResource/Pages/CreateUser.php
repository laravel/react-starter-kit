<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    protected function afterCreate(): void
    {
        // Create default user details
        $this->record->details()->create([
            'preferred_language' => 'en',
            'marketing_emails' => true,
        ]);

        // Create default free subscription
        $this->record->subscriptions()->create([
            'plan_type' => 'free',
            'status' => 'active',
            'started_at' => now(),
        ]);

        // Assign free role
        $this->record->assignRole('free');
    }
}
