<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Assessment Results</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
        }
        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 12px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }
        .title {
            color: #1f2937;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
            margin: 10px 0 0;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #374151;
        }
        .score-card {
            background: linear-gradient(135deg, #dbeafe, #ede9fe);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
        }
        .score {
            font-size: 48px;
            font-weight: bold;
            color: #1d4ed8;
            margin: 0;
        }
        .score-label {
            color: #6b7280;
            font-size: 14px;
            margin-top: 5px;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
        }
        .stat {
            text-align: center;
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
        }
        .stat-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
        }
        .cta-section {
            background: linear-gradient(135deg, #fef3c7, #fed7aa);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
        }
        .cta-title {
            font-size: 20px;
            font-weight: bold;
            color: #92400e;
            margin-bottom: 10px;
        }
        .cta-description {
            color: #a16207;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 10px;
            transition: transform 0.2s;
        }
        .button:hover {
            transform: translateY(-2px);
        }
        .button.secondary {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        .features {
            margin: 30px 0;
        }
        .feature {
            display: flex;
            align-items: center;
            margin: 15px 0;
            padding: 15px;
            background: #f9fafb;
            border-radius: 8px;
        }
        .feature-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin-right: 15px;
            font-weight: bold;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #3b82f6;
            text-decoration: none;
            margin: 0 10px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="logo">📊</div>
        <h1 class="title">Assessment Complete!</h1>
        <p class="subtitle">{{ $toolName }} Results</p>
    </div>

    <p class="greeting">Hello <strong>{{ $userName }}</strong>,</p>

    <p>Congratulations! You've successfully completed the <strong>{{ $toolName }}</strong> assessment. Here's a preview of your results:</p>

    <div class="score-card">
        <div class="score">{{ number_format($basicResults['overall_percentage'], 1) }}%</div>
        <div class="score-label">Overall Score</div>
    </div>

    <div class="stats">
        <div class="stat">
            <div class="stat-number">{{ $basicResults['total_criteria'] }}</div>
            <div class="stat-label">Total Questions</div>
        </div>
        <div class="stat">
            <div class="stat-number">{{ $basicResults['yes_count'] }}</div>
            <div class="stat-label">Yes Responses</div>
        </div>
        <div class="stat">
            <div class="stat-number">{{ $basicResults['applicable_criteria'] }}</div>
            <div class="stat-label">Applicable</div>
        </div>
    </div>

    <div class="cta-section">
        <h2 class="cta-title">🎯 Unlock Your Full Results</h2>
        <p class="cta-description">
            Get detailed insights, recommendations, and track your progress over time by creating your free account.
        </p>

        <a href="{{ route('register') }}?email={{ urlencode($assessment->email) }}&name={{ urlencode($assessment->name) }}" class="button">
            Create Free Account
        </a>

        <a href="{{ $resultsUrl }}" class="button secondary">
            View Basic Results
        </a>
    </div>

    <div class="features">
        <h3 style="color: #374151; margin-bottom: 20px;">What you'll get with an account:</h3>

        <div class="feature">
            <div class="feature-icon">📈</div>
            <div>
                <strong>Detailed Analytics</strong><br>
                <span style="color: #6b7280;">Domain-wise breakdowns and category analysis</span>
            </div>
        </div>

        <div class="feature">
            <div class="feature-icon">💡</div>
            <div>
                <strong>Personalized Recommendations</strong><br>
                <span style="color: #6b7280;">Actionable insights to improve your scores</span>
            </div>
        </div>

        <div class="feature">
            <div class="feature-icon">📊</div>
            <div>
                <strong>Progress Tracking</strong><br>
                <span style="color: #6b7280;">Monitor improvements over multiple assessments</span>
            </div>
        </div>

        <div class="feature">
            <div class="feature-icon">📄</div>
            <div>
                <strong>Professional Reports</strong><br>
                <span style="color: #6b7280;">Download PDF reports for your organization</span>
            </div>
        </div>
    </div>

    <div style="text-align: center; margin: 30px 0;">
        <p style="color: #6b7280; margin-bottom: 20px;">
            <strong>Assessment Details:</strong><br>
            Completed on {{ $assessment->completed_at->format('F j, Y \a\t g:i A') }}<br>
            Assessment ID: #{{ $assessment->id }}
        </p>
    </div>

    <div class="footer">
        <p>This email was sent because you completed an assessment on our platform.</p>
        <p>© {{ date('Y') }} Assessment Platform. All rights reserved.</p>

        <div class="social-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Support</a>
        </div>
    </div>
</div>
</body>
</html>
