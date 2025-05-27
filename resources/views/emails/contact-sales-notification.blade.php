<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Sales Lead: {{ $lead->company }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .email-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .urgent-badge {
            background: #fbbf24;
            color: #92400e;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 10px;
        }
        .content {
            padding: 30px;
        }
        .lead-summary {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .info-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        .info-label {
            font-weight: 600;
            color: #475569;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .info-value {
            color: #1e293b;
            font-weight: 500;
        }
        .priority-high {
            border-left: 4px solid #ef4444;
            background: #fef2f2;
        }
        .priority-medium {
            border-left: 4px solid #f59e0b;
            background: #fffbeb;
        }
        .priority-low {
            border-left: 4px solid #10b981;
            background: #ecfdf5;
        }
        .action-buttons {
            text-align: center;
            margin: 30px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 10px 10px 0;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
        }
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        .btn-secondary {
            background: #6b7280;
            color: white;
        }
        .message-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
<div class="email-container">
    <div class="header">
        @if($lead->urgency_score >= 15)
            <div class="urgent-badge">🔥 HIGH PRIORITY</div>
        @endif
        <h1>🚀 New Sales Lead!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">{{ $lead->company }} is interested in our platform</p>
    </div>

    <div class="content">
        <div class="lead-summary {{ $lead->urgency_score >= 15 ? 'priority-high' : ($lead->urgency_score >= 10 ? 'priority-medium' : 'priority-low') }}">
            <h3 style="margin-top: 0;">📊 Lead Summary</h3>
            <p><strong>Urgency Score:</strong> {{ $lead->urgency_score }}/20</p>
            <p><strong>Source:</strong> Website Contact Form</p>
            <p><strong>Submitted:</strong> {{ $lead->created_at->format('M j, Y \a\t g:i A') }}</p>
        </div>

        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">👤 Contact Person</div>
                <div class="info-value">{{ $lead->name }}</div>
                @if($lead->position)
                    <div style="color: #64748b; font-size: 14px;">{{ $lead->position }}</div>
                @endif
            </div>

            <div class="info-item">
                <div class="info-label">🏢 Company</div>
                <div class="info-value">{{ $lead->company }}</div>
                @if($lead->company_type)
                    <div style="color: #64748b; font-size: 14px;">{{ $lead->company_type }}</div>
                @endif
            </div>

            <div class="info-item">
                <div class="info-label">📧 Email</div>
                <div class="info-value">
                    <a href="mailto:{{ $lead->email }}" style="color: #3b82f6;">{{ $lead->email }}</a>
                </div>
            </div>

            @if($lead->phone)
                <div class="info-item">
                    <div class="info-label">📱 Phone</div>
                    <div class="info-value">
                        <a href="tel:{{ $lead->phone }}" style="color: #3b82f6;">{{ $lead->phone }}</a>
                    </div>
                </div>
            @endif

            @if($lead->interest)
                <div class="info-item">
                    <div class="info-label">🎯 Primary Interest</div>
                    <div class="info-value">{{ $lead->interest }}</div>
                </div>
            @endif

            @if($lead->estimated_users)
                <div class="info-item">
                    <div class="info-label">👥 Estimated Users</div>
                    <div class="info-value">{{ $lead->estimated_users }}</div>
                </div>
            @endif

            @if($lead->timeline)
                <div class="info-item">
                    <div class="info-label">⏰ Timeline</div>
                    <div class="info-value">{{ $lead->formatted_timeline }}</div>
                </div>
            @endif
        </div>

        @if($lead->message)
            <div class="message-box">
                <div class="info-label">💬 Additional Message</div>
                <div style="margin-top: 10px; line-height: 1.6;">{{ $lead->message }}</div>
            </div>
        @endif

        <div class="action-buttons">
            <a href="mailto:{{ $lead->email }}?subject=Re: Your inquiry about AssessmentHub&body=Hi {{ $lead->name }},%0D%0A%0D%0AThank you for your interest in AssessmentHub..." class="btn btn-primary">
                📧 Send Email
            </a>

            @if($lead->phone)
                <a href="tel:{{ $lead->phone }}" class="btn btn-secondary">
                    📞 Call Now
                </a>
            @endif

            <a href="{{ config('app.url') }}/admin/leads/{{ $lead->id }}" class="btn btn-secondary">
                👀 View in CRM
            </a>
        </div>

        <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #0c4a6e;">📋 Follow-up Checklist</h4>
            <ul style="margin: 0; color: #075985;">
                <li>Respond within 2 hours (preferably within 1 hour)</li>
                <li>Schedule a personalized demo</li>
                <li>Prepare custom pricing based on their requirements</li>
                <li>Add to CRM and set follow-up reminders</li>
                <li>Send relevant case studies and resources</li>
            </ul>
        </div>

        <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 30px;">
            This lead was automatically generated from the website contact form.<br>
            Lead ID: #{{ $lead->id }} | IP: {{ $lead->ip_address }}
        </p>
    </div>
</div>
</body>
</html>
