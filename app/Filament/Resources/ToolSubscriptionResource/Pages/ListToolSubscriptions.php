<?php
namespace App\Filament\Resources\ToolSubscriptionResource\Pages;

use App\Filament\Resources\ToolSubscriptionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListToolSubscriptions extends ListRecords
{
    protected static string $resource = ToolSubscriptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
