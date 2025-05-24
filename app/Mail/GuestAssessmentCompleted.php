<?php

namespace App\Mail;

use App\Models\Assessment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GuestAssessmentCompleted extends Mailable
{
    use Queueable, SerializesModels;

    public Assessment $assessment;
    public string $resultsUrl;
    public array $basicResults;

    public function __construct(Assessment $assessment, string $resultsUrl, array $basicResults)
    {
        $this->assessment = $assessment;
        $this->resultsUrl = $resultsUrl;
        $this->basicResults = $basicResults;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Assessment Results - ' . $this->assessment->tool->name_en,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.guest-assessment-completed',
            with: [
                'assessment' => $this->assessment,
                'resultsUrl' => $this->resultsUrl,
                'basicResults' => $this->basicResults,
                'toolName' => $this->assessment->tool->name_en,
                'userName' => $this->assessment->name,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
