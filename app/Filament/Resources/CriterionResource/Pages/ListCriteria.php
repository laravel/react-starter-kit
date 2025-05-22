<?php

namespace App\Filament\Resources\CriterionResource\Pages;

use App\Filament\Resources\CriterionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCriteria extends ListRecords
{
    protected static string $resource = CriterionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
