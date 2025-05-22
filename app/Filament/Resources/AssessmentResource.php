<?php
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
                Forms\Components\Select::make('tool_id')
                    ->relationship('tool', 'name_en')
                    ->required(),
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->nullable()
                    ->default(auth()->id()),
                Forms\Components\TextInput::make('guest_email')
                    ->email()
                    ->maxLength(255)
                    ->nullable(),
                Forms\Components\TextInput::make('guest_name')
                    ->maxLength(255)
                    ->nullable(),
                Forms\Components\TextInput::make('organization')
                    ->maxLength(255)
                    ->nullable(),
                Forms\Components\Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'in_progress' => 'In Progress',
                        'completed' => 'Completed',
                        'archived' => 'Archived',
                    ])
                    ->default('draft')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title (English)')
                    ->searchable()
                    ->sortable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('title_ar')
                    ->label('Title (Arabic)')
                    ->searchable()
                    ->sortable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('tool.name_en')
                    ->label('Tool')
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('User')
                    ->sortable()
                    ->placeholder('Guest'),
                Tables\Columns\TextColumn::make('guest_name')
                    ->label('Guest Name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('organization')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'gray' => 'draft',
                        'warning' => 'in_progress',
                        'success' => 'completed',
                        'danger' => 'archived',
                    ]),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('tool')
                    ->relationship('tool', 'name_en'),
                Tables\Filters\SelectFilter::make('user')
                    ->relationship('user', 'name'),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'in_progress' => 'In Progress',
                        'completed' => 'Completed',
                        'archived' => 'Archived',
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
            ->defaultSort('created_at', 'desc');
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
