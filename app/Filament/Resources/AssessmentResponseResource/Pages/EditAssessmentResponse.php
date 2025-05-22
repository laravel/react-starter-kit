<?php

namespace App\Filament\Resources\AssessmentResponseResource\Pages;

use App\Filament\Resources\AssessmentResponseResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAssessmentResponse extends EditRecord
{
    protected static string $resource = AssessmentResponseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
