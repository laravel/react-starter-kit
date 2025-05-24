<?php
// app/Filament/Resources/GuestSessionResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\GuestSessionResource\Pages;
use App\Filament\Resources\GuestSessionResource\Widgets\GuestSessionDetailsWidget;
use App\Models\GuestSession;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class GuestSessionResource extends Resource
{
    protected static ?string $model = GuestSession::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Assessment Management';
    protected static ?int $navigationSort = 7;
    protected static ?string $navigationLabel = 'Guest Sessions';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Session Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('assessment_id')
                            ->relationship('assessment', 'id')
                            ->getOptionLabelFromRecordUsing(fn ($record) => "{$record->tool->name_en} - {$record->name}")
                            ->required(),
                    ]),

                Forms\Components\Section::make('Technical Details')
                    ->schema([
                        Forms\Components\TextInput::make('ip_address')
                            ->maxLength(45),
                        Forms\Components\TextInput::make('device_type')
                            ->maxLength(50),
                        Forms\Components\TextInput::make('browser')
                            ->maxLength(100),
                        Forms\Components\TextInput::make('browser_version')
                            ->maxLength(50),
                        Forms\Components\TextInput::make('operating_system')
                            ->maxLength(100),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Location Information')
                    ->schema([
                        Forms\Components\TextInput::make('country')
                            ->maxLength(100),
                        Forms\Components\TextInput::make('country_code')
                            ->maxLength(2),
                        Forms\Components\TextInput::make('region')
                            ->maxLength(100),
                        Forms\Components\TextInput::make('city')
                            ->maxLength(100),
                        Forms\Components\TextInput::make('timezone')
                            ->maxLength(50),
                        Forms\Components\TextInput::make('isp')
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Timestamps')
                    ->schema([
                        Forms\Components\DateTimePicker::make('started_at'),
                        Forms\Components\DateTimePicker::make('completed_at'),
                        Forms\Components\DateTimePicker::make('last_activity'),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('assessment.tool.name_en')
                    ->label('Assessment Tool')
                    ->sortable()
                    ->limit(30),
                Tables\Columns\IconColumn::make('status')
                    ->label('Status')
                    ->getStateUsing(fn (GuestSession $record): string => $record->completed_at ? 'completed' : 'active')
                    ->icon(fn (string $state): string => match ($state) {
                        'completed' => 'heroicon-o-check-circle',
                        'active' => 'heroicon-o-clock',
                        default => 'heroicon-o-question-mark-circle',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'completed' => 'success',
                        'active' => 'warning',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('device_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Desktop' => 'gray',
                        'Mobile' => 'warning',
                        'Tablet' => 'info',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('browser')
                    ->formatStateUsing(fn (GuestSession $record): string =>
                        $record->browser . ($record->browser_version ? " {$record->browser_version}" : '')
                    ),
                Tables\Columns\TextColumn::make('country')
                    ->formatStateUsing(fn (GuestSession $record): string =>
                        $record->country . ($record->country_code ? " ({$record->country_code})" : '')
                    )
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('city')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('started_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('completed_at')
                    ->dateTime()
                    ->sortable()
                    ->placeholder('In Progress'),
                Tables\Columns\TextColumn::make('duration')
                    ->label('Duration')
                    ->getStateUsing(fn (GuestSession $record): ?string => $record->getDuration())
                    ->placeholder('Ongoing'),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->getStateUsing(fn (GuestSession $record): bool => $record->isActive())
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('device_type')
                    ->options([
                        'Desktop' => 'Desktop',
                        'Mobile' => 'Mobile',
                        'Tablet' => 'Tablet',
                    ]),
                Tables\Filters\SelectFilter::make('browser')
                    ->options([
                        'Chrome' => 'Chrome',
                        'Firefox' => 'Firefox',
                        'Safari' => 'Safari',
                        'Edge' => 'Edge',
                        'Opera' => 'Opera',
                    ]),
                Tables\Filters\Filter::make('completed')
                    ->query(fn ($query) => $query->whereNotNull('completed_at'))
                    ->label('Completed Sessions'),
                Tables\Filters\Filter::make('active')
                    ->query(fn ($query) => $query->whereNull('completed_at'))
                    ->label('Active Sessions'),
                Tables\Filters\Filter::make('recent')
                    ->query(fn ($query) => $query->where('started_at', '>=', now()->subDay()))
                    ->label('Last 24 Hours'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\Action::make('view_assessment')
                    ->label('View Assessment')
                    ->icon('heroicon-o-eye')
                    ->url(fn (GuestSession $record): string =>
                    $record->completed_at
                        ? route('guest.assessment.results', $record->assessment_id)
                        : route('assessment.take', $record->assessment_id)
                    )
                    ->openUrlInNewTab(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('started_at', 'desc');
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('User Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('name'),
                        Infolists\Components\TextEntry::make('email'),
                        Infolists\Components\TextEntry::make('assessment.tool.name_en')
                            ->label('Assessment Tool'),
                        Infolists\Components\TextEntry::make('assessment.organization')
                            ->label('Organization')
                            ->placeholder('Not specified'),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Technical Details')
                    ->schema([
                        Infolists\Components\TextEntry::make('ip_address')
                            ->label('IP Address')
                            ->copyable(),
                        Infolists\Components\TextEntry::make('device_type')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'Desktop' => 'gray',
                                'Mobile' => 'warning',
                                'Tablet' => 'info',
                                default => 'gray',
                            }),
                        Infolists\Components\TextEntry::make('browser')
                            ->formatStateUsing(fn (GuestSession $record): string =>
                                $record->browser . ($record->browser_version ? " {$record->browser_version}" : '')
                            ),
                        Infolists\Components\TextEntry::make('operating_system'),
                        Infolists\Components\TextEntry::make('user_agent')
                            ->label('User Agent')
                            ->columnSpanFull()
                            ->copyable(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Location Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('country')
                            ->formatStateUsing(fn (GuestSession $record): string =>
                                $record->country . ($record->country_code ? " ({$record->country_code})" : '')
                            ),
                        Infolists\Components\TextEntry::make('region'),
                        Infolists\Components\TextEntry::make('city'),
                        Infolists\Components\TextEntry::make('timezone'),
                        Infolists\Components\TextEntry::make('isp')
                            ->label('Internet Service Provider'),
                        Infolists\Components\TextEntry::make('coordinates')
                            ->label('Coordinates')
                            ->getStateUsing(fn (GuestSession $record): ?string =>
                            $record->latitude && $record->longitude
                                ? "{$record->latitude}, {$record->longitude}"
                                : null
                            )
                            ->placeholder('Not available'),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Session Timeline')
                    ->schema([
                        Infolists\Components\TextEntry::make('started_at')
                            ->dateTime(),
                        Infolists\Components\TextEntry::make('last_activity')
                            ->dateTime(),
                        Infolists\Components\TextEntry::make('completed_at')
                            ->dateTime()
                            ->placeholder('Not completed'),
                        Infolists\Components\TextEntry::make('duration')
                            ->getStateUsing(fn (GuestSession $record): ?string => $record->getDuration())
                            ->placeholder('Ongoing'),
                        Infolists\Components\IconEntry::make('is_active')
                            ->label('Currently Active')
                            ->getStateUsing(fn (GuestSession $record): bool => $record->isActive())
                            ->boolean(),
                    ])
                    ->columns(3),

                Infolists\Components\Section::make('Additional Data')
                    ->schema([
                        Infolists\Components\KeyValueEntry::make('session_data')
                            ->label('Session Data')
                            ->columnSpanFull(),
                    ])
                    ->visible(fn (GuestSession $record): bool => !empty($record->session_data)),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGuestSessions::route('/'),
//            'view' => Pages\ViewGuestSession::route('/{record}'),
            'edit' => Pages\EditGuestSession::route('/{record}/edit'),
        ];
    }

    public static function getWidgets(): array
    {
        return [
//            GuestSessionDetailsWidget::class,
        ];
    }
}

