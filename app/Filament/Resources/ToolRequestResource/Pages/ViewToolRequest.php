<?php
namespace App\Filament\Resources\ToolRequestResource\Pages;

use App\Filament\Resources\ToolRequestResource;
use Filament\Actions;
use Filament\Forms\Components\Select;
use Filament\Resources\Pages\ViewRecord;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Section;
use Filament\Notifications\Notification;
use App\Mail\SendToolQuotation;
use Illuminate\Support\Facades\Mail;

class ViewToolRequest extends ViewRecord
{
    protected static string $resource = ToolRequestResource::class;



    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('send_quotation')
                ->label('Send Quotation')
                ->form([
                    TextInput::make('amount')
                        ->numeric()
                        ->required(),
                    Select::make('account_id')
                        ->label('Select Bank Account')
                        ->relationship('account', 'bank_name')
                            ->native(false)
                        ->required(),
                    Textarea::make('note'),
                ])
                ->action(function (array $data) {
                    $record = $this->record;

                    $account = \App\Models\Account::findOrFail($data['account_id']);

                    // Update the relation
                    $record->update([
                        'account_id' => $account->id,
                        'status' => 'quoted',
                        'quotation_sent_at' => now(),
                    ]);

                    Mail::to($record->email)->send(new SendToolQuotation($record, $account, $data));

                    Notification::make()
                        ->title('Quotation sent')
                        ->success()
                        ->send();
                })
                ->visible(fn ($record) => $record->status === 'pending'),
        ];
    }

    public function infolist(\Filament\Infolists\Infolist $infolist): \Filament\Infolists\Infolist
    {
        return $infolist->schema([
            \Filament\Infolists\Components\TextEntry::make('name'),
            \Filament\Infolists\Components\TextEntry::make('email'),
            \Filament\Infolists\Components\TextEntry::make('organization'),
            \Filament\Infolists\Components\TextEntry::make('message')->columnSpanFull(),
            \Filament\Infolists\Components\TextEntry::make('status')->badge(),
            \Filament\Infolists\Components\TextEntry::make('quotation_sent_at')->dateTime(),
            \Filament\Infolists\Components\TextEntry::make('tool.name_en')->label('Tool'),
            \Filament\Infolists\Components\TextEntry::make('created_at')->dateTime(),
        ]);
    }
}
