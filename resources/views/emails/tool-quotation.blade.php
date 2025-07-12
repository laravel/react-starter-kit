<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tool Quotation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
    <tr style="background-color: #f9fafb;">
        <td style="padding: 20px; text-align: center;">
            <img src="{{ asset('storage/logo.svg') }}" alt="Company Logo" style="max-height: 60px;">
        </td>
    </tr>

    <tr>
        <td style="padding: 30px;">
            <h2 style="margin-bottom: 10px; color: #1f2937;">Quotation for: {{ $request->tool->getNameAttribute() }} </h2>
            <p style="color: #6b7280;">{{ $request->tool->getDescriptionAttribute() }}</p>

            <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; background-color: #f9fafb; border-radius: 6px;">
                <tr>
                    <td ><strong>Name:</strong></td>
                    <td>{{ $request->name }}</td>
                </tr>
                <tr>
                    <td ><strong>Email:</strong></td>
                    <td>{{ $request->email }}</td>
                </tr>
                <tr>
                    <td ><strong>Organization:</strong></td>
                    <td>{{ $request->organization }}</td>
                </tr>
                <tr>
                    <td ><strong>Status:</strong></td>
                    <td>{{ ucfirst($request->status ?? 'pending') }}</td>
                </tr>
            </table>
            @if(!empty($request->message))
                <div style="margin-top: 20px;">
                    <h4 style="color: #374151;">Message</h4>
                    <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; color: #374151;">
                        {{ $request->message }}
                    </p>
                </div>
            @endif
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">

            <h4 style="margin-bottom: 10px; color: #374151;">Quotation Details</h4>
            <table width="100%" cellpadding="6" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px;">
                <tr>
                    <td style="color: #4b5563;"><strong>Amount:</strong></td>
                    <td>{{ $data['amount'] .' '.$account->currency ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <td style="color: #4b5563;"><strong>Bank Name:</strong></td>
                    <td>{{ $account->bank_name }}</td>
                </tr>
                <tr>
                    <td style="color: #4b5563;"><strong>IBAN:</strong></td>
                    <td>{{ $account->iban }}</td>
                </tr>
                <tr>
                    <td style="color: #4b5563;"><strong>Account Number:</strong></td>
                    <td>{{ $account->account_number }}</td>
                </tr>
                <tr>
                    <td style="color: #4b5563;"><strong>Account Holder:</strong></td>
                    <td>{{ $account->name }}</td>
                </tr>
                @if ($account->swift_code)
                    <tr>
                        <td style="color: #4b5563;"><strong>SWIFT Code:</strong></td>
                        <td>{{ $account->swift_code }}</td>
                    </tr>
                @endif

            @if (!empty($data['note']))
                    <tr>
                        <td style="color: #4b5563; vertical-align: top;"><strong>Note:</strong></td>
                        <td style="color: #374151;">{{ $data['note'] }}</td>
                    </tr>
                @endif
            </table>

            <p style="margin-top: 30px; color: #6b7280;">
                Thank you for your interest. If you have any questions, feel free to reply to this email.
            </p>
        </td>
    </tr>

    <tr style="background-color: #f9fafb;">
        <td style="padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
            &copy; {{ now()->year }} Afaqcm. All rights reserved.
        </td>
    </tr>
</table>
</body>
</html>
