<?php

namespace App\Filament\Resources\GuestSessionResource\Pages;

use App\Filament\Resources\GuestSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateGuestSession extends CreateRecord
{
    protected static string $resource = GuestSessionResource::class;
}
