<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class ViewUser extends ViewRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('User Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('name'),
                        Infolists\Components\TextEntry::make('email'),
                        Infolists\Components\TextEntry::make('email_verified_at')
                            ->dateTime(),
                        Infolists\Components\TextEntry::make('created_at')
                            ->dateTime(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Contact Details')
                    ->schema([
                        Infolists\Components\TextEntry::make('details.phone'),
                        Infolists\Components\TextEntry::make('details.company_name'),
                        Infolists\Components\TextEntry::make('details.company_type')
                            ->badge(),
                        Infolists\Components\TextEntry::make('details.position'),
                        Infolists\Components\TextEntry::make('details.city'),
                        Infolists\Components\TextEntry::make('details.country'),
                        Infolists\Components\TextEntry::make('details.website')
                            ->url(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Subscription')
                    ->schema([
                        Infolists\Components\TextEntry::make('subscription.plan_type')
                            ->badge(),
                        Infolists\Components\TextEntry::make('subscription.status')
                            ->badge(),
                        Infolists\Components\TextEntry::make('subscription.started_at')
                            ->dateTime(),
                        Infolists\Components\TextEntry::make('subscription.expires_at')
                            ->dateTime(),
                        Infolists\Components\TextEntry::make('subscription.amount')
                            ->money('USD'),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Activity')
                    ->schema([
                        Infolists\Components\TextEntry::make('assessments_count')
                            ->label('Total Assessments')
                            ->state(fn ($record) => $record->assessments()->count()),
                        Infolists\Components\TextEntry::make('last_assessment')
                            ->label('Last Assessment')
                            ->state(fn ($record) => $record->assessments()->latest()->first()?->created_at?->diffForHumans() ?? 'Never'),
                        Infolists\Components\TextEntry::make('roles')
                            ->state(fn ($record) => $record->roles->pluck('name')->join(', ')),
                    ])
                    ->columns(3),
            ]);
    }
}
