<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
            Actions\Action::make('send_password_reset')
                ->label('Send Password Reset')
                ->icon('heroicon-o-key')
                ->color('warning')
                ->action(function () {
                    // Send password reset email
                    $this->record->sendPasswordResetNotification(
                        app('auth.password.broker')->createToken($this->record)
                    );

                    $this->notify('success', 'Password reset email sent successfully!');
                }),
            Actions\Action::make('toggle_subscription')
                ->label(fn () => $this->record->isPremium() ? 'Downgrade to Free' : 'Upgrade to Premium')
                ->icon(fn () => $this->record->isPremium() ? 'heroicon-o-arrow-down' : 'heroicon-o-arrow-up')
                ->color(fn () => $this->record->isPremium() ? 'warning' : 'success')
                ->action(function () {
                    $subscription = $this->record->subscription;

                    if ($this->record->isPremium()) {
                        // Downgrade to free
                        $subscription->update([
                            'plan_type' => 'free',
                            'expires_at' => now(),
                            'status' => 'cancelled',
                            'cancelled_at' => now(),
                            'cancelled_reason' => 'Downgraded by admin'
                        ]);
                        $this->record->syncRoles(['free']);
                        $this->notify('success', 'User downgraded to free plan');
                    } else {
                        // Upgrade to premium
                        if ($subscription) {
                            $subscription->update([
                                'plan_type' => 'premium',
                                'status' => 'active',
                                'expires_at' => now()->addYear(),
                                'cancelled_at' => null,
                                'cancelled_reason' => null
                            ]);
                        } else {
                            $this->record->subscriptions()->create([
                                'plan_type' => 'premium',
                                'status' => 'active',
                                'started_at' => now(),
                                'expires_at' => now()->addYear(),
                            ]);
                        }
                        $this->record->syncRoles(['premium']);
                        $this->notify('success', 'User upgraded to premium plan');
                    }
                })
                ->requiresConfirmation()
                ->modalDescription(fn () => $this->record->isPremium()
                    ? 'This will downgrade the user to free plan and limit their access.'
                    : 'This will upgrade the user to premium plan with full access.'),
        ];
    }
}
