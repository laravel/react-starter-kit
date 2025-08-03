<?php

namespace App\Filament\Resources\ToolPerformanceLevelResource\Pages;

use App\Filament\Resources\ToolPerformanceLevelResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditToolPerformanceLevel extends EditRecord
{
    protected static string $resource = ToolPerformanceLevelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
