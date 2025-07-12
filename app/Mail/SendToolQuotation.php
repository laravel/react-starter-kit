<?php
namespace App\Mail;

use App\Models\Account;
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

    public Account $account;

    public function __construct(ToolRequest $toolRequest, Account $account, array $data)
    {
        $this->toolRequest = $toolRequest;
        $this->account = $account;
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
            view: 'emails.tool-quotation',
            with: [
                'request' => $this->toolRequest,
                'account' => $this->account,
                'data' => $this->data,
            ]
        );

    }

    public function attachments(): array
    {
        return [];
    }
}
