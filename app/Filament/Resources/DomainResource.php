<?php
namespace App\Filament\Resources;

use App\Filament\Resources\DomainResource\Pages;
use App\Filament\Resources\DomainResource\RelationManagers\CategoriesRelationManager;
use App\Models\Domain;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DomainResource extends Resource
{
    protected static ?string $model = Domain::class;
    protected static ?string $navigationIcon = 'heroicon-o-folder';
    protected static ?int $navigationSort = 2;

    public static function getNavigationLabel(): string
    {
        return __('filament.resources.domain.navigation_label');
    }

    public static function getModelLabel(): string
    {
        return __('filament.resources.domain.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament.resources.domain.plural_label');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('tool_id')
                    ->label(__('filament.fields.tool'))
                    ->relationship('tool', 'name_en')
                    ->required(),
                Forms\Components\Tabs::make(__('filament.form.translations'))
                    ->tabs([
                        Forms\Components\Tabs\Tab::make(__('filament.form.english'))
                            ->schema([
                                Forms\Components\TextInput::make('name_en')
                                    ->label(__('filament.fields.name_en'))
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description_en')
                                    ->label(__('filament.fields.description_en'))
                                    ->maxLength(65535)
                                    ->columnSpanFull(),
                            ]),
                        Forms\Components\Tabs\Tab::make(__('filament.form.arabic'))
                            ->schema([
                                Forms\Components\TextInput::make('name_ar')
                                    ->label(__('filament.fields.name_ar'))
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description_ar')
                                    ->label(__('filament.fields.description_ar'))
                                    ->maxLength(65535)
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('order')
                    ->label(__('filament.fields.order'))
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('weight_percentage')
                    ->label(__('filament.fields.weight_percentage'))
                    ->required(),
                Forms\Components\Select::make('status')
                    ->label(__('filament.fields.status'))
                    ->options([
                        'active' => __('filament.status.active'),
                        'inactive' => __('filament.status.inactive'),
                    ])
                    ->default('active')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('tool.name')
                    ->label(__('filament.fields.tool'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label(__('filament.fields.name'))
                    ->searchable(['name_en','name_ar']),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\TextColumn::make('weight_percentage')
                    ->label(__('filament.fields.weight_percentage')),
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
                Tables\Filters\SelectFilter::make('tool')
                    ->label(__('filament.fields.tool'))
                    ->relationship('tool', 'name_en'),
                Tables\Filters\SelectFilter::make('status')
                    ->label(__('filament.fields.status'))
                    ->options([
                        'active' => __('filament.status.active'),
                        'inactive' => __('filament.status.inactive'),
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
            CategoriesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDomains::route('/'),
            'create' => Pages\CreateDomain::route('/create'),
            'edit' => Pages\EditDomain::route('/{record}/edit'),
        ];
    }
}
