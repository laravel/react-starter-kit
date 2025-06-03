<?php
// app/Filament/Resources/UserResource.php
namespace App\Filament\Resources;

use App\Models\User;
use App\Models\UserDetails;
use App\Models\UserSubscription;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?int $navigationSort = 1;

    public static function getNavigationLabel(): string
    {
        return __('filament.resources.user.navigation_label');
    }

    public static function getModelLabel(): string
    {
        return __('filament.resources.user.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament.resources.user.plural_label');
    }

    public static function getNavigationGroup(): ?string
    {
        return __('filament.resources.user.navigation_group');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make(__('filament.form.basic_information'))
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label(__('filament.fields.name'))
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->label(__('filament.fields.email'))
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\DateTimePicker::make('email_verified_at')
                            ->label(__('filament.fields.email_verified_at')),
                    ])
                    ->columns(2),

                Forms\Components\CheckboxList::make('roles')
                    ->label(__('filament-shield::filament-shield.field.permissions'))
                    ->relationship('roles', 'name')
                    ->searchable(),

                Forms\Components\Section::make(__('filament.form.subscription_information'))
                    ->relationship('subscription')
                    ->schema([
                        Forms\Components\Select::make('plan_type')
                            ->label(__('filament.fields.plan_type'))
                            ->options([
                                'free' => __('filament.plans.free'),
                                'premium' => __('filament.plans.premium'),
                            ])
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->label(__('filament.fields.status'))
                            ->options([
                                'active' => __('filament.status.active'),
                                'expired' => __('filament.status.expired'),
                                'cancelled' => __('filament.status.cancelled'),
                                'pending' => __('filament.status.pending'),
                            ])
                            ->required(),
                        Forms\Components\DateTimePicker::make('started_at')
                            ->label(__('filament.fields.started_at')),
                        Forms\Components\DateTimePicker::make('expires_at')
                            ->label(__('filament.fields.completed_at')),
                        Forms\Components\TextInput::make('amount')
                            ->label(__('filament.fields.value'))
                            ->numeric()
                            ->prefix('$'),
                        Forms\Components\Textarea::make('notes')
                            ->label(__('filament.fields.notes'))
                            ->maxLength(65535),
                    ])
                    ->columns(2),

                Forms\Components\Section::make(__('filament.form.user_details'))
                    ->relationship('details')
                    ->schema([
                        Forms\Components\TextInput::make('phone')
                            ->label(__('filament.fields.phone'))
                            ->tel(),
                        Forms\Components\TextInput::make('company_name')
                            ->label(__('filament.fields.company_name'))
                            ->maxLength(255),
                        Forms\Components\Select::make('company_type')
                            ->label(__('filament.fields.company_type'))
                            ->options([
                                'commercial' => __('filament.company_types.commercial'),
                                'government' => __('filament.company_types.government'),
                                'service' => __('filament.company_types.service'),
                            ]),
                        Forms\Components\TextInput::make('position')
                            ->label(__('filament.fields.position'))
                            ->maxLength(255),
                        Forms\Components\TextInput::make('city')
                            ->label(__('filament.fields.city'))
                            ->maxLength(255),
                        Forms\Components\TextInput::make('country')
                            ->label(__('filament.fields.country'))
                            ->maxLength(255),
                        Forms\Components\TextInput::make('website')
                            ->label(__('filament.fields.website'))
                            ->url(),
                        Forms\Components\Toggle::make('marketing_emails')
                            ->label(__('filament.fields.marketing_emails')),
                        Forms\Components\Toggle::make('newsletter_subscription')
                            ->label(__('filament.fields.newsletter_subscription')),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('filament.fields.name'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('filament.fields.email'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('details.company_name')
                    ->label(__('filament.fields.company'))
                    ->searchable(),

                // Plan type with Arabic translation
                Tables\Columns\TextColumn::make('subscription.plan_type')
                    ->label(__('filament.fields.plan_type'))
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'free' => 'gray',
                        'premium' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (?string $state): string =>
                    $state ? __("filament.plans.{$state}") : __('filament.plans.free')
                    ),

                // Status with Arabic translation
                Tables\Columns\TextColumn::make('subscription.status')
                    ->label(__('filament.fields.status'))
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'expired' => 'danger',
                        'cancelled' => 'warning',
                        'pending' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (?string $state): string =>
                    $state ? __("filament.status.{$state}") : __('filament.status.active')
                    ),

                Tables\Columns\TextColumn::make('assessments_count')
                    ->label(__('filament.fields.assessments_count'))
                    ->counts('assessments'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament.fields.created_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                // Plan type filter with Arabic options
                Tables\Filters\SelectFilter::make('subscription.plan_type')
                    ->label(__('filament.fields.plan_type'))
                    ->relationship('subscription', 'plan_type')
                    ->options([
                        'free' => __('filament.plans.free'),
                        'premium' => __('filament.plans.premium'),
                    ]),

                // Status filter with Arabic options
                Tables\Filters\SelectFilter::make('subscription.status')
                    ->label(__('filament.fields.status'))
                    ->relationship('subscription', 'status')
                    ->options([
                        'active' => __('filament.status.active'),
                        'expired' => __('filament.status.expired'),
                        'cancelled' => __('filament.status.cancelled'),
                        'pending' => __('filament.status.pending'),
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->label(__('filament.actions.view')),
                Tables\Actions\EditAction::make()
                    ->label(__('filament.actions.edit')),

                // Custom action with Arabic label
                Tables\Actions\Action::make('upgrade_to_premium')
                    ->label(__('filament.actions.upgrade_to_premium'))
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
                    ->label(__('filament.actions.delete'))
                    ->requiresConfirmation(),
            ])
            ->defaultSort('created_at', 'desc')
            ->emptyStateHeading(__('filament.empty_states.no_users'))
            ->emptyStateDescription(__('filament.empty_states.start_by_creating', ['resource' => __('filament.resources.user.label')]));
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
