<?php
namespace App\Filament\Resources;

use App\Filament\Resources\ToolSubscriptionResource\Pages;
use App\Models\ToolSubscription;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ToolSubscriptionResource extends Resource
{
    protected static ?string $model = ToolSubscription::class;
    protected static ?string $navigationIcon = 'heroicon-o-credit-card';
    protected static ?string $navigationGroup = 'User Management';
    protected static ?int $navigationSort = 8;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')
                ->relationship('user', 'name')
//                ->searchable()
                ->required()
                ->native(false),
            Forms\Components\Select::make('tool_id')
                ->relationship('tool', 'name_en')
//                ->searchable()
                ->required()
                ->native(false),
            Forms\Components\Select::make('plan_type')
                ->options([
                    'free' => 'Free',
                    'premium' => 'Premium',
                ])
                ->required()->native(false),
            Forms\Components\Select::make('status')
                ->options([
                    'active' => 'Active',
                    'inactive' => 'Inactive',
                    'expired' => 'Expired',
                ])->native(false)
                ->required(),
            Forms\Components\DateTimePicker::make('started_at')
                ->required()->native(false),
            Forms\Components\DateTimePicker::make('expires_at')
                ->native(false),
            Forms\Components\KeyValue::make('features')
                ->columnSpanFull(),
            Forms\Components\TextInput::make('amount')
                ->numeric()
                ->columnSpanFull(),
            Forms\Components\TextInput::make('currency')
                ->maxLength(3)
                ->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('User')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('tool.name_en')
                    ->label('Tool')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('plan_type')
                    ->colors([
                        'primary' => 'free',
                        'success' => 'premium',
                    ]),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'success' => 'active',
                        'danger' => 'inactive',
                        'warning' => 'expired',
                    ]),
                Tables\Columns\TextColumn::make('started_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('expires_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('plan_type')
                    ->options([
                        'free' => 'Free',
                        'premium' => 'Premium',
                    ]),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                        'expired' => 'Expired',
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
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListToolSubscriptions::route('/'),
            'create' => Pages\CreateToolSubscription::route('/create'),
            'edit' => Pages\EditToolSubscription::route('/{record}/edit'),
        ];
    }
}
