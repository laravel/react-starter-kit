<?php

namespace App\Filament\Resources\CriterionResource\Pages;

use App\Filament\Resources\CriterionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCriterion extends EditRecord
{
    protected static string $resource = CriterionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
