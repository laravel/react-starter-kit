<?php

namespace App\Filament\Resources\ToolResource\Pages;

use App\Filament\Resources\ToolResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTools extends ListRecords
{
    protected static string $resource = ToolResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
