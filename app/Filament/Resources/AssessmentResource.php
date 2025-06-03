<?php
// app/Filament/Resources/AssessmentResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\AssessmentResource\Pages;
use App\Filament\Resources\AssessmentResource\RelationManagers\ResponsesRelationManager;
use App\Models\Assessment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class AssessmentResource extends Resource
{
    protected static ?string $model = Assessment::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-check';
    protected static ?int $navigationSort = 5;

    // These methods ensure the navigation and labels change based on locale
    public static function getNavigationLabel(): string
    {
        return __('filament.resources.assessment.navigation_label');
    }

    public static function getModelLabel(): string
    {
        return __('filament.resources.assessment.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament.resources.assessment.plural_label');
    }

    public static function getNavigationGroup(): ?string
    {
        return __('filament.resources.assessment.navigation_group');
    }

    // This method handles dynamic record titles in Arabic
    public static function getRecordTitle(Model|null $record): string|null
    {
        if (!$record) {
            return null;
        }

        $locale = app()->getLocale();
        return $locale === 'ar' ? $record->title_ar : $record->title_en;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make(__('filament.form.assessment_information'))
                    ->schema([
                        Forms\Components\Select::make('tool_id')
                            ->label(__('filament.fields.tool'))
                            ->relationship('tool', 'name_en')
                            ->required(),
                        Forms\Components\Select::make('user_id')
                            ->label(__('filament.fields.user'))
                            ->relationship('user', 'name')
                            ->nullable()
                            ->default(auth()->id()),
                        Forms\Components\TextInput::make('guest_email')
                            ->label(__('filament.fields.guest_email'))
                            ->email()
                            ->maxLength(255)
                            ->nullable(),
                        Forms\Components\TextInput::make('guest_name')
                            ->label(__('filament.fields.guest_name'))
                            ->maxLength(255)
                            ->nullable(),
                        Forms\Components\TextInput::make('organization')
                            ->label(__('filament.fields.organization'))
                            ->maxLength(255)
                            ->nullable(),
                        Forms\Components\Select::make('status')
                            ->label(__('filament.fields.status'))
                            ->options([
                                'draft' => __('filament.status.draft'),
                                'in_progress' => __('filament.status.in_progress'),
                                'completed' => __('filament.status.completed'),
                                'archived' => __('filament.status.archived'),
                            ])
                            ->default('draft')
                            ->required(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // Dynamic title column that shows Arabic or English based on locale
                Tables\Columns\TextColumn::make('title')
                    ->label(__('filament.fields.name'))
                    ->getStateUsing(function (Assessment $record): string {
                        $locale = app()->getLocale();
                        return $locale === 'ar'
                            ? ($record->title_ar ?: $record->tool->name_ar)
                            : ($record->title_en ?: $record->tool->name_en);
                    })
                    ->searchable(['title_en', 'title_ar'])
                    ->sortable()
                    ->limit(50),

                // Tool name with dynamic language support
                Tables\Columns\TextColumn::make('tool.name')
                    ->label(__('filament.fields.tool'))
                    ->getStateUsing(function (Assessment $record): string {
                        $locale = app()->getLocale();
                        return $locale === 'ar' ? $record->tool->name_ar : $record->tool->name_en;
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label(__('filament.fields.user'))
                    ->sortable()
                    ->placeholder(__('filament.fields.guest_name')),

                Tables\Columns\TextColumn::make('guest_name')
                    ->label(__('filament.fields.guest_name'))
                    ->sortable(),

                Tables\Columns\TextColumn::make('organization')
                    ->label(__('filament.fields.organization'))
                    ->sortable(),

                // Status badge with Arabic translations
                Tables\Columns\BadgeColumn::make('status')
                    ->label(__('filament.fields.status'))
                    ->colors([
                        'gray' => 'draft',
                        'warning' => 'in_progress',
                        'success' => 'completed',
                        'danger' => 'archived',
                    ])
                    ->formatStateUsing(fn (string $state): string => __("filament.status.{$state}")),

                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament.fields.created_at'))
                    ->dateTime()
                    ->sortable(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label(__('filament.fields.updated_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('tool')
                    ->label(__('filament.fields.tool'))
                    ->relationship('tool', 'name_en'),
                Tables\Filters\SelectFilter::make('user')
                    ->label(__('filament.fields.user'))
                    ->relationship('user', 'name'),
                Tables\Filters\SelectFilter::make('status')
                    ->label(__('filament.fields.status'))
                    ->options([
                        'draft' => __('filament.status.draft'),
                        'in_progress' => __('filament.status.in_progress'),
                        'completed' => __('filament.status.completed'),
                        'archived' => __('filament.status.archived'),
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
            ->defaultSort('created_at', 'desc')
            ->emptyStateHeading(__('filament.empty_states.no_assessments'))
            ->emptyStateDescription(__('filament.empty_states.start_by_creating', ['resource' => __('filament.resources.assessment.label')]));
    }

    public static function getRelations(): array
    {
        return [
            ResponsesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAssessments::route('/'),
            'create' => Pages\CreateAssessment::route('/create'),
            'edit' => Pages\EditAssessment::route('/{record}/edit'),
        ];
    }
}
