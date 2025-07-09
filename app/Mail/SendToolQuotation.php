<?php
namespace App\Mail;

use App\Models\ToolRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendToolQuotation extends Mailable
{
    use Queueable, SerializesModels;

    public ToolRequest $toolRequest;
    public array $data;

    public function __construct(ToolRequest $toolRequest, array $data)
    {
        $this->toolRequest = $toolRequest;
        $this->data = $data;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Quotation for ' . $this->toolRequest->tool->name_en,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.tool-quotation',
            with: [
                'request' => $this->toolRequest,
                'data' => $this->data,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
