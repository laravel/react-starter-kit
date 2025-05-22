<?php
namespace App\Filament\Resources\AssessmentResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ResponsesRelationManager extends RelationManager
{
    protected static string $relationship = 'responses';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('criterion_id')
                    ->relationship('criterion', 'name_en')
                    ->required(),
                Forms\Components\TextInput::make('value')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100),
                Forms\Components\Textarea::make('notes')
                    ->maxLength(65535)
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('criterion.name_en')
            ->columns([
                Tables\Columns\TextColumn::make('criterion.name_en')
                    ->label('Criterion (EN)'),
                Tables\Columns\TextColumn::make('criterion.name_ar')
                    ->label('Criterion (AR)'),
                Tables\Columns\TextColumn::make('criterion.category.name_en')
                    ->label('Category (EN)'),
                Tables\Columns\TextColumn::make('criterion.category.name_ar')
                    ->label('Category (AR)'),
                Tables\Columns\TextColumn::make('value')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('criterion')
                    ->relationship('criterion', 'name_en'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
