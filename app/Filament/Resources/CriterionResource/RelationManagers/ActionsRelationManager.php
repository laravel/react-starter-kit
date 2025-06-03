<?php

namespace App\Filament\Resources\CriterionResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ActionsRelationManager extends RelationManager
{
    protected static string $relationship = 'actions';

    protected static ?string $recordTitleAttribute = 'action_en';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Translations')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('English')
                            ->schema([
                                Forms\Components\Textarea::make('action_en')
                                    ->label('Action (English)')
                                    ->required()
                                    ->rows(3)
                                    ->maxLength(1000),
                            ]),
                        Forms\Components\Tabs\Tab::make('Arabic')
                            ->schema([
                                Forms\Components\Textarea::make('action_ar')
                                    ->label('Action (Arabic)')
                                    ->required()
                                    ->rows(3)
                                    ->maxLength(1000),
                            ]),
                    ])
                    ->columnSpanFull(),

                Forms\Components\Select::make('flag')
                    ->label('Action Type')
                    ->options([
                        true => 'Improvement Action (إجراءات تحسينية)',
                        false => 'Corrective Action (إجراءات تصليحية)',
                    ])
                    ->required()
                    ->default(true)
                    ->helperText('Improvement actions enhance existing good practices. Corrective actions fix identified problems.'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('action_en')
            ->columns([
                Tables\Columns\TextColumn::make('action_en')
                    ->label('English Action')
                    ->limit(50)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    }),

                Tables\Columns\TextColumn::make('action_ar')
                    ->label('Arabic Action')
                    ->limit(50)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    }),

                Tables\Columns\BadgeColumn::make('flag')
                    ->label('Type')
                    ->formatStateUsing(fn (bool $state): string => $state ? 'Improvement' : 'Corrective')
                    ->colors([
                        'success' => fn ($state): bool => $state === true,
                        'danger' => fn ($state): bool => $state === false,
                    ])
                    ->icons([
                        'heroicon-o-arrow-trending-up' => fn ($state): bool => $state === true,
                        'heroicon-o-wrench-screwdriver' => fn ($state): bool => $state === false,
                    ]),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('flag')
                    ->label('Action Type')
                    ->options([
                        true => 'Improvement Actions',
                        false => 'Corrective Actions',
                    ]),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('Add Action')
                    ->icon('heroicon-o-plus'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->label('')
                    ->tooltip('View Action'),
                Tables\Actions\EditAction::make()
                    ->label('')
                    ->tooltip('Edit Action'),
                Tables\Actions\DeleteAction::make()
                    ->label('')
                    ->tooltip('Delete Action'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateActions([
                Tables\Actions\CreateAction::make()
                    ->label('Add First Action')
                    ->icon('heroicon-o-plus'),
            ])
            ->emptyStateHeading('No Actions Yet')
            ->emptyStateDescription('Add improvement or corrective actions for this criterion.')
            ->defaultSort('created_at', 'desc');
    }
}
