<?php
namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Filament\Resources\CategoryResource\RelationManagers\CriteriaRelationManager;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;
    protected static ?string $navigationIcon = 'heroicon-o-tag';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('domain_id')
                    ->relationship('domain', 'name_en')
                    ->required(),
                Forms\Components\Tabs::make('Translations')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('English')
                            ->schema([
                                Forms\Components\TextInput::make('name_en')
                                    ->label('Name (English)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description_en')
                                    ->label('Description (English)')
                                    ->maxLength(65535)
                                    ->columnSpanFull(),
                            ]),
                        Forms\Components\Tabs\Tab::make('Arabic')
                            ->schema([
                                Forms\Components\TextInput::make('name_ar')
                                    ->label('Name (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description_ar')
                                    ->label('Description (Arabic)')
                                    ->maxLength(65535)
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\Select::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                    ])
                    ->default('active')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('domain.name_en')
                    ->label('Domain')
                    ->sortable(),
                Tables\Columns\TextColumn::make('name_en')
                    ->label('Name (English)')
                    ->searchable(),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'danger' => 'inactive',
                        'success' => 'active',
                    ]),
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
                Tables\Filters\SelectFilter::make('domain')
                    ->relationship('domain', 'name_en'),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                    ]),
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
            ])
            ->defaultSort('order');
    }

    public static function getRelations(): array
    {
        return [
          CriteriaRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
