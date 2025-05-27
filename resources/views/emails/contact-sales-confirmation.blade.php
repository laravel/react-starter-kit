<!-- resources/views/emails/contact-sales-confirmation.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting our sales team</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .highlight-box {
            background: #f1f5f9;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 6px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        .info-item {
            background: #f8fafc;
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
        .next-steps {
            background: #ecfdf5;
            border: 1px solid #10b981;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .next-steps h3 {
            color: #047857;
            margin-top: 0;
            display: flex;
            align-items: center;
        }
        .next-steps ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .next-steps li {
            margin: 8px 0;
            color: #065f46;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            background: #f1f5f9;
            padding: 20px 30px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
        }
        .social-links {
            margin: 15px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #3b82f6;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
<div class="email-container">
    <div class="header">
        <h1>🚀 Thank you for your interest!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your request and our sales team will be in touch soon.</p>
    </div>

    <div class="content">
        <p>Hi <strong>{{ $lead->name }}</strong>,</p>

        <p>Thank you for reaching out to us! We're excited about the opportunity to help <strong>{{ $lead->company }}</strong> with our assessment platform.</p>

        <div class="highlight-box">
            <h3 style="margin-top: 0; color: #1e40af;">📋 Your Request Details</h3>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Contact</div>
                    <div class="info-value">{{ $lead->name }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Company</div>
                    <div class="info-value">{{ $lead->company }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Email</div>
                    <div class="info-value">{{ $lead->email }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Primary Interest</div>
                    <div class="info-value">{{ $lead->interest ?? 'General Inquiry' }}</div>
                </div>
                @if($lead->estimated_users)
                    <div class="info-item">
                        <div class="info-label">Estimated Users</div>
                        <div class="info-value">{{ $lead->estimated_users }}</div>
                    </div>
                @endif
                @if($lead->timeline)
                    <div class="info-item">
                        <div class="info-label">Timeline</div>
                        <div class="info-value">{{ $lead->formatted_timeline }}</div>
                    </div>
                @endif
            </div>

            @if($lead->message)
                <div style="margin-top: 15px;">
                    <div class="info-label">Your Message</div>
                    <div class="info-value" style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin-top: 5px;">
                        {{ $lead->message }}
                    </div>
                </div>
            @endif
        </div>

        <div class="next-steps">
            <h3>✅ What happens next?</h3>
            <ul>
                <li><strong>Within 2 hours:</strong> Our sales team will review your request</li>
                <li><strong>Within 24 hours:</strong> We'll reach out to schedule a personalized demo</li>
                <li><strong>Custom proposal:</strong> We'll prepare a tailored solution for {{ $lead->company }}</li>
                <li><strong>Implementation:</strong> Our team will guide you through the entire process</li>
            </ul>
        </div>

        <p>In the meantime, feel free to explore our resources:</p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ config('app.url') }}/resources" class="cta-button">📚 Browse Resources</a>
            <a href="{{ config('app.url') }}/case-studies" class="cta-button">📈 View Case Studies</a>
        </div>

        <p>If you have any urgent questions, don't hesitate to reach out:</p>
        <ul>
            <li>📧 Email: <a href="mailto:sales@assessmenthub.com">sales@assessmenthub.com</a></li>
            <li>📱 Phone: <a href="tel:+1-555-ASSESS">+1 (555) ASSESS</a></li>
            @if($lead->phone)
                <li>💬 WhatsApp: We'll also send you updates via WhatsApp</li>
            @endif
        </ul>

        <p style="margin-top: 30px;">Thank you for choosing AssessmentHub!</p>

        <p>Best regards,<br>
            <strong>The AssessmentHub Sales Team</strong></p>
    </div>

    <div class="footer">
        <div class="social-links">
            <a href="#">LinkedIn</a> |
            <a href="#">Twitter</a> |
            <a href="#">YouTube</a>
        </div>
        <p>© {{ date('Y') }} AssessmentHub. All rights reserved.</p>
        <p style="font-size: 12px; color: #94a3b8;">
            This email was sent to {{ $lead->email }}.
            <a href="{{ config('app.url') }}/unsubscribe?email={{ $lead->email }}" style="color: #3b82f6;">Unsubscribe</a>
        </p>
    </div>
</div>
</body>
</html>
