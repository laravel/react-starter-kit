<?php


// app/Filament/Resources/GuestSessionResource/Pages/ListGuestSessions.php
namespace App\Filament\Resources\GuestSessionResource\Pages;

use App\Filament\Resources\GuestSessionResource;
use App\Filament\Resources\GuestSessionResource\Widgets\GuestSessionStatsWidget;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListGuestSessions extends ListRecords
{
    protected static string $resource = GuestSessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
//            GuestSessionStatsWidget::class,
        ];
    }
}
