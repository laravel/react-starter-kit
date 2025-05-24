<?php

namespace App\Filament\Resources\GuestSessionResource\Pages;

use App\Filament\Resources\GuestSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditGuestSession extends EditRecord
{
    protected static string $resource = GuestSessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
