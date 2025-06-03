<?php
// app/Filament/Resources/ToolResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\ToolResource\Pages;
use App\Filament\Resources\ToolResource\RelationManagers\DomainRelationManager;
use App\Models\Tool;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ToolResource extends Resource
{
    protected static ?string $model = Tool::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?int $navigationSort = 1;

    // Dynamic labels that respect current locale
    public static function getNavigationLabel(): string
    {
        return __('filament.resources.tool.navigation_label');
    }

    public static function getModelLabel(): string
    {
        return __('filament.resources.tool.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament.resources.tool.plural_label');
    }

    public static function getNavigationGroup(): ?string
    {
        return __('filament.resources.tool.navigation_group');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
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
                Forms\Components\FileUpload::make('image')
                    ->label(__('filament.fields.image'))
                    ->image()
                    ->directory('tools')
                    ->visibility('public')
                    ->columnSpanFull(),
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
                Tables\Columns\ImageColumn::make('image')
                    ->label(__('filament.fields.image')),
                Tables\Columns\TextColumn::make('name_en')
                    ->label(__('filament.fields.name_en'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('name_ar')
                    ->label(__('filament.fields.name_ar'))
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->label(__('filament.fields.status'))
                    ->colors([
                        'danger' => 'inactive',
                        'success' => 'active',
                    ])
                    ->formatStateUsing(fn (string $state): string => __("filament.status.{$state}")),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament.fields.created_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label(__('filament.fields.updated_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label(__('filament.fields.status'))
                    ->options([
                        'active' => __('filament.status.active'),
                        'inactive' => __('filament.status.inactive'),
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->label(__('filament.actions.view')),
                Tables\Actions\EditAction::make()
                    ->label(__('filament.actions.edit')),
                Tables\Actions\DeleteAction::make()
                    ->label(__('filament.actions.delete')),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label(__('filament.actions.delete')),
                ]),
            ])
            ->emptyStateHeading(__('filament.empty_states.no_tools'))
            ->emptyStateDescription(__('filament.empty_states.start_by_creating', ['resource' => __('filament.resources.tool.label')]))
            ->emptyStateActions([
                Tables\Actions\CreateAction::make()
                    ->label(__('filament.empty_states.create_first', ['resource' => __('filament.resources.tool.label')])),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            DomainRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTools::route('/'),
            'create' => Pages\CreateTool::route('/create'),
            'edit' => Pages\EditTool::route('/{record}/edit'),
        ];
    }
}
