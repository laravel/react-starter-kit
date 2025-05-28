<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewFreeUserNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $details = $this->user->details;

        return (new MailMessage)
            ->subject('New Free User Registration - ' . $this->user->name)
            ->greeting('New Free User Registered!')
            ->line('A new user has registered for free access to the assessment tools.')
            ->line('')
            ->line('**User Details:**')
            ->line('Name: ' . $this->user->name)
            ->line('Email: ' . $this->user->email)
            ->line('Phone: ' . ($details?->phone ?: 'Not provided'))
            ->line('Company: ' . ($details?->company_name ?: 'Not provided'))
            ->line('Company Type: ' . ($details?->company_type ? ucfirst($details->company_type) : 'Not specified'))
            ->line('Position: ' . ($details?->position ?: 'Not specified'))
            ->line('City: ' . ($details?->city ?: 'Not specified'))
            ->line('Website: ' . ($details?->website ?: 'Not specified'))
            ->line('Industry: ' . ($details?->industry ?: 'Not specified'))
            ->line('Company Size: ' . ($details?->getFormattedCompanySize() ?: 'Not specified'))
            ->line('How they heard: ' . ($details?->how_did_you_hear ?: 'Not specified'))
            ->line('')
            ->line('**Registration Details:**')
            ->line('Registered: ' . $this->user->created_at->format('Y-m-d H:i:s'))
            ->line('Preferred Language: ' . ($details?->preferred_language ?: 'en'))
            ->line('Marketing Emails: ' . ($details?->marketing_emails ? 'Yes' : 'No'))
            ->line('Newsletter: ' . ($details?->newsletter_subscription ? 'Yes' : 'No'))
            ->action('View User in Admin Panel', url('/admin/shield/users/' . $this->user->id))
            ->line('The user can now access free assessment tools with limited features.')
            ->line('They can upgrade to premium by contacting us.');
    }
}
