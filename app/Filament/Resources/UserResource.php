<?php

namespace App\Filament\Resources;

use App\Models\User;
use App\Models\UserDetails;
use App\Models\UserSubscription;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Pages\Page;
use Illuminate\Database\Eloquent\Builder;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'User Management';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\DateTimePicker::make('email_verified_at')
                            ->label('Email Verified At'),
                    ])
                    ->columns(2),
                Forms\Components\CheckboxList::make('roles')
                    ->relationship('roles', 'name')
                    ->searchable(),

                Forms\Components\Section::make('Subscription Information')
                    ->relationship('subscription')
                    ->schema([
                        Forms\Components\Select::make('plan_type')
                            ->options([
                                'free' => 'Free',
                                'premium' => 'Premium',
                            ])
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->options([
                                'active' => 'Active',
                                'expired' => 'Expired',
                                'cancelled' => 'Cancelled',
                                'pending' => 'Pending',
                            ])
                            ->required(),
                        Forms\Components\DateTimePicker::make('started_at'),
                        Forms\Components\DateTimePicker::make('expires_at'),
                        Forms\Components\TextInput::make('amount')
                            ->numeric()
                            ->prefix('$'),
                        Forms\Components\Textarea::make('notes')
                            ->maxLength(65535),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('User Details')
                    ->relationship('details')
                    ->schema([
                        Forms\Components\TextInput::make('phone')
                            ->tel(),
                        Forms\Components\TextInput::make('company_name')
                            ->maxLength(255),
                        Forms\Components\Select::make('company_type')
                            ->options([
                                'commercial' => 'Commercial',
                                'government' => 'Government',
                                'service' => 'Service',
                            ]),
                        Forms\Components\TextInput::make('position')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('city')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('country')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('website')
                            ->url(),
                        Forms\Components\TextInput::make('industry')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('company_size')
                            ->numeric(),
                        Forms\Components\Toggle::make('marketing_emails'),
                        Forms\Components\Toggle::make('newsletter_subscription'),
                    ])
                    ->columns(2),
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
                Tables\Columns\TextColumn::make('details.company_name')
                    ->label('Company')
                    ->searchable(),
                Tables\Columns\TextColumn::make('subscription.plan_type')
                    ->label('Plan')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'free' => 'gray',
                        'premium' => 'success',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('subscription.status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'expired' => 'danger',
                        'cancelled' => 'warning',
                        'pending' => 'info',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('assessments_count')
                    ->label('Assessments')
                    ->counts('assessments'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('subscription.plan_type')
                    ->label('Plan Type')
                    ->relationship('subscription', 'plan_type')
                    ->options([
                        'free' => 'Free',
                        'premium' => 'Premium',
                    ]),
                Tables\Filters\SelectFilter::make('subscription.status')
                    ->label('Status')
                    ->relationship('subscription', 'status')
                    ->options([
                        'active' => 'Active',
                        'expired' => 'Expired',
                        'cancelled' => 'Cancelled',
                        'pending' => 'Pending',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('upgrade_to_premium')
                    ->label('Upgrade to Premium')
                    ->icon('heroicon-o-star')
                    ->color('success')
                    ->action(function (User $record) {
                        $record->subscription()->updateOrCreate(
                            ['user_id' => $record->id],
                            [
                                'plan_type' => 'premium',
                                'status' => 'active',
                                'started_at' => now(),
                                'expires_at' => now()->addYear(),
                            ]
                        );
                        $record->assignRole('premium');
                    })
                    ->visible(fn (User $record) => $record->isFree()),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make()
                    ->requiresConfirmation(),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => UserResource\Pages\ListUsers::route('/'),
            'create' => UserResource\Pages\CreateUser::route('/create'),
            'view' => UserResource\Pages\ViewUser::route('/{record}'),
            'edit' => UserResource\Pages\EditUser::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['details', 'subscription', 'assessments']);
    }
}
