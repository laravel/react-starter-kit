<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;
    protected $requestData;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $user, array $requestData)
    {
        $this->user = $user;
        $this->requestData = $requestData;
    }

    /**
     * Get the notification's delivery channels.
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
        $subscription = $this->user->subscription;

        $message = (new MailMessage)
            ->subject('Premium Subscription Request - ' . $this->user->name)
            ->greeting('New Premium Subscription Request!')
            ->line('A user has requested to upgrade to premium subscription.')
            ->line('')
            ->line('**User Details:**')
            ->line('Name: ' . $this->user->name)
            ->line('Email: ' . $this->user->email)
            ->line('Phone: ' . ($details?->phone ?: 'Not provided'))
            ->line('Company: ' . ($details?->company_name ?: 'Not provided'))
            ->line('Company Type: ' . ($details?->company_type ? ucfirst($details->company_type) : 'Not specified'))
            ->line('Position: ' . ($details?->position ?: 'Not specified'))
            ->line('City: ' . ($details?->city ?: 'Not specified'))
            ->line('Industry: ' . ($details?->industry ?: 'Not specified'))
            ->line('Company Size: ' . ($details?->getFormattedCompanySize() ?: 'Not specified'))
            ->line('Website: ' . ($details?->website ?: 'Not specified'))
            ->line('')
            ->line('**Current Subscription:**')
            ->line('Current Plan: ' . ($subscription?->plan_type ?? 'Free'))
            ->line('Status: ' . ($subscription?->status ?? 'Active'))
            ->line('Member Since: ' . $this->user->created_at->format('Y-m-d'))
            ->line('')
            ->line('**Subscription Request:**')
            ->line('Requested Plan: ' . ucfirst($this->requestData['plan']))
            ->line('Request Date: ' . now()->format('Y-m-d H:i:s'));

        if (!empty($this->requestData['message'])) {
            $message->line('')
                ->line('**User Message:**')
                ->line('"' . $this->requestData['message'] . '"');
        }

        // Add assessment usage statistics if available
        $assessmentCount = $this->user->assessments()->count();
        if ($assessmentCount > 0) {
            $message->line('')
                ->line('**Usage Statistics:**')
                ->line('Total Assessments: ' . $assessmentCount)
                ->line('Last Assessment: ' . $this->user->assessments()->latest()->first()?->created_at?->format('Y-m-d'));
        }

        $message->line('')
            ->action('Contact User', 'mailto:' . $this->user->email . '?subject=Premium Subscription Inquiry')
            ->action('View User in Admin', url('/admin/shield/users/' . $this->user->id))
            ->line('')
            ->line('**Next Steps:**')
            ->line('1. Contact the user to discuss their specific needs')
            ->line('2. Provide pricing and feature details')
            ->line('3. Process payment if they decide to upgrade')
            ->line('4. Activate premium features in the admin panel')
            ->line('')
            ->line('Please respond to this request within 24 hours.');

        return $message;
    }
}
