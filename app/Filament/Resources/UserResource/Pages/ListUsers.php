<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Components\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListUsers extends ListRecords
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
            Actions\Action::make('export_users')
                ->label('Export Users')
                ->icon('heroicon-o-document-arrow-down')
                ->color('info')
                ->action(function () {
                    // Export users logic here
                    $this->notify('info', 'Export functionality to be implemented');
                }),
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => Tab::make('All Users'),
            'free' => Tab::make('Free Users')
                ->modifyQueryUsing(fn (Builder $query) =>
                $query->whereHas('subscription', fn ($q) => $q->where('plan_type', 'free'))
                ),
            'premium' => Tab::make('Premium Users')
                ->modifyQueryUsing(fn (Builder $query) =>
                $query->whereHas('subscription', fn ($q) => $q->where('plan_type', 'premium')->where('status', 'active'))
                ),
            'expired' => Tab::make('Expired')
                ->modifyQueryUsing(fn (Builder $query) =>
                $query->whereHas('subscription', fn ($q) => $q->where('status', 'expired'))
                ),
            'recent' => Tab::make('Recent')
                ->modifyQueryUsing(fn (Builder $query) =>
                $query->where('created_at', '>=', now()->subWeek())
                ),
        ];
    }
}
