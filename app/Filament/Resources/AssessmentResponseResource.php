<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AssessmentResponseResource\Pages;
use App\Models\AssessmentResponse;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AssessmentResponseResource extends Resource
{
    protected static ?string $model = AssessmentResponse::class;
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';
    protected static ?int $navigationSort = 6;

    public static function form(Form $form): Form
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

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('tool.name_en')
                    ->label('Assessment')
                    ->sortable(),
                Tables\Columns\TextColumn::make('criterion.name_en')
                    ->label('Criterion')
                    ->sortable(),
                Tables\Columns\TextColumn::make('criterion.category.name_en')
                    ->label('Category')
                    ->sortable(),
                Tables\Columns\TextColumn::make('value')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([

                Tables\Filters\SelectFilter::make('criterion')
                    ->relationship('criterion', 'name_en'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAssessmentResponses::route('/'),
            'create' => Pages\CreateAssessmentResponse::route('/create'),
            'edit' => Pages\EditAssessmentResponse::route('/{record}/edit'),
        ];
    }
}
