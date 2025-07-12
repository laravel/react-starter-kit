@component('mail::message')
# Quotation for {{ $request->tool->name_en }}

Dear {{ $request->name }},

Thank you for your interest in {{ $request->tool->name_en }}. Below are the quotation details:

@component('mail::panel')
**Amount:** {{ $data['amount'] }}

**Bank:** {{ $data['bank_name'] }}

**IBAN:** {{ $data['iban'] }}
@endcomponent

@if(!empty($data['note']))
{{ $data['note'] }}
@endif

If you have any questions, feel free to reply to this email.

Thanks,
{{ config('app.name') }} Team
@endcomponent
