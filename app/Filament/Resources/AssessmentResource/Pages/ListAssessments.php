<?php

namespace App\Filament\Resources\AssessmentResource\Pages;

use App\Filament\Resources\AssessmentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAssessments extends ListRecords
{
    protected static string $resource = AssessmentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
