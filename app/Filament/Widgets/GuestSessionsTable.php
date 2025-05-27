<?php

namespace App\Filament\Widgets;

use App\Models\GuestSession;
use BezhanSalleh\FilamentShield\Traits\HasWidgetShield;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class GuestSessionsTable extends BaseWidget
{
    use HasWidgetShield;
    protected static ?string $heading = 'Recent Guest Sessions';

    protected static ?int $sort = 5;

    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                GuestSession::query()
                    ->with(['assessment.tool'])
                    ->latest()
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('assessment.tool.name_en')
                    ->label('Assessment Tool')
                    ->sortable(),

                Tables\Columns\TextColumn::make('device_type')
                    ->label('Device')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Mobile' => 'info',
                        'Desktop' => 'success',
                        'Tablet' => 'warning',
                        default => 'gray',
                    })
                    ->icon(fn (string $state): string => match ($state) {
                        'Mobile' => 'heroicon-m-device-phone-mobile',
                        'Desktop' => 'heroicon-m-computer-desktop',
                        'Tablet' => 'heroicon-m-device-tablet',
                        default => 'heroicon-m-question-mark-circle',
                    }),

                Tables\Columns\TextColumn::make('browser')
                    ->label('Browser')
                    ->formatStateUsing(fn (string $state, GuestSession $record): string =>
                        $state . ($record->browser_version ? ' ' . $record->browser_version : '')
                    ),

                Tables\Columns\TextColumn::make('country')
                    ->label('Location')
                    ->formatStateUsing(fn (GuestSession $record): string =>
                    $record->city && $record->country
                        ? $record->city . ', ' . $record->country
                        : ($record->country ?? 'Unknown')
                    )
                    ->icon('heroicon-m-map-pin'),

                Tables\Columns\TextColumn::make('completed_at')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (?string $state): string => $state ? 'Completed' : 'Incomplete')
                    ->color(fn (?string $state): string => $state ? 'success' : 'warning'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Started At')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\Action::make('view_session')
                    ->label('View Details')
                    ->icon('heroicon-m-eye')
                    ->color('info')
                    ->modalHeading(fn (GuestSession $record): string => 'Session Details - ' . $record->name)
                    ->modalContent(fn (GuestSession $record): \Illuminate\Contracts\View\View => view(
                        'filament.widgets.guest-session-details',
                        ['session' => $record]
                    )),

                Tables\Actions\Action::make('view_assessment')
                    ->label('View Assessment')
                    ->icon('heroicon-m-document-text')
                    ->color('success')
                    ->url(fn (GuestSession $record): string =>
                    route('guest.assessment.results', $record->assessment_id)
                    )
                    ->openUrlInNewTab()
                    ->visible(fn (GuestSession $record): bool => $record->completed_at !== null),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->emptyStateIcon('heroicon-o-user-group')
            ->emptyStateHeading('No guest sessions yet')
            ->emptyStateDescription('Guest sessions will appear here once users start taking assessments.');
    }
}
