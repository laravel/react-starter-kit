<?php

namespace App\Filament\Resources\AssessmentResponseResource\Pages;

use App\Filament\Resources\AssessmentResponseResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAssessmentResponses extends ListRecords
{
    protected static string $resource = AssessmentResponseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
