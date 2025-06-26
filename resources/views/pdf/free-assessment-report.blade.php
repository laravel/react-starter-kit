<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gartner CMO Value Playbook</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #3b82f6;
            --primary-dark: #2563eb;
            --secondary: #8b5cf6;
            --accent: #ec4899;
            --dark: #1e293b;
            --light: #f8fafc;
            --gray: #64748b;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
            color: #1f2937;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header Styles */
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            border-radius: 0 0 30px 30px;
            margin-bottom: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
            );
            animation: shine 3s ease-in-out infinite;
        }

        @keyframes shine {
            0%, 100% { transform: translateX(-100%) translateY(-100%); }
            50% { transform: translateX(0%) translateY(0%); }
        }

        .header-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
            margin: 0 auto;
        }

        .logo {
            width: 80px;
            height: 80px;
            background: rgba(255,255,255,0.2);
            border-radius: 18px;
            margin: 0 auto 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            font-weight: bold;
            backdrop-filter: blur(5px);
        }

        .title {
            font-size: 42px;
            font-weight: 800;
            margin-bottom: 15px;
            text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .subtitle {
            font-size: 22px;
            opacity: 0.9;
            font-weight: 400;
            margin-bottom: 30px;
        }

        .stats-container {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 30px;
            flex-wrap: wrap;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            min-width: 200px;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .stat-number {
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .stat-label {
            font-size: 16px;
            opacity: 0.9;
        }

        /* Content Styles */
        .section {
            background: white;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
        }

        .section-title {
            font-size: 28px;
            font-weight: 700;
            color: var(--primary-dark);
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 3px solid var(--primary);
            position: relative;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, var(--secondary), var(--accent));
        }

        .step-number {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 80px;
            font-weight: 800;
            color: rgba(59, 130, 246, 0.1);
            z-index: 0;
        }

        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .challenge-box, .actions-box {
            background: var(--light);
            border-radius: 16px;
            padding: 25px;
        }

        .challenge-box h3, .actions-box h3 {
            font-size: 20px;
            color: var(--dark);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .challenge-box h3 i {
            color: var(--danger);
        }

        .actions-box h3 i {
            color: var(--success);
        }

        .chart-container {
            background: var(--light);
            border-radius: 16px;
            padding: 25px;
            margin: 30px 0;
        }

        .chart-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
            color: var(--dark);
        }

        .bar-chart {
            display: flex;
            align-items: flex-end;
            height: 200px;
            gap: 30px;
            padding: 0 30px;
            justify-content: center;
        }

        .bar {
            width: 60px;
            background: var(--primary);
            border-radius: 8px 8px 0 0;
            position: relative;
            transition: all 0.5s ease;
        }

        .bar:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }

        .bar-label {
            position: absolute;
            bottom: -30px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: var(--gray);
        }

        .bar-value {
            position: absolute;
            top: -30px;
            left: 0;
            width: 100%;
            text-align: center;
            font-weight: 700;
            font-size: 18px;
        }

        .actions-list {
            list-style-type: none;
        }

        .actions-list li {
            padding: 15px 0;
            border-bottom: 1px dashed #e2e8f0;
            display: flex;
            gap: 15px;
        }

        .actions-list li:last-child {
            border-bottom: none;
        }

        .action-icon {
            background: var(--primary);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        /* Stakeholder Section */
        .stakeholder-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .stakeholder-card {
            background: white;
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            border-top: 4px solid var(--primary);
            transition: all 0.3s ease;
        }

        .stakeholder-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .stakeholder-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }

        .stakeholder-icon {
            width: 50px;
            height: 50px;
            background: var(--light);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: var(--primary-dark);
        }

        .stakeholder-title {
            font-size: 18px;
            font-weight: 700;
        }

        .beliefs-list {
            list-style-type: none;
        }

        .beliefs-list li {
            padding: 10px 0;
            display: flex;
            gap: 10px;
        }

        .beliefs-list li::before {
            content: "•";
            color: var(--primary);
            font-weight: bold;
            flex-shrink: 0;
        }

        /* Metrics Section */
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 30px;
        }

        .metric-card {
            background: white;
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            border-left: 4px solid var(--secondary);
            transition: all 0.3s ease;
        }

        .metric-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .metric-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--dark);
        }

        .metric-examples {
            background: var(--light);
            border-radius: 12px;
            padding: 15px;
            font-size: 14px;
            margin-top: 15px;
        }

        /* Resources Section */
        .resources-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-top: 30px;
        }

        .resource-card {
            background: white;
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.3s ease;
            border-top: 4px solid var(--accent);
        }

        .resource-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .resource-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ec4899, #8b5cf6);
            color: white;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 20px;
        }

        .resource-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--dark);
        }

        .resource-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 600;
            margin-top: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .resource-btn:hover {
            background: var(--primary-dark);
            transform: scale(1.05);
        }

        /* Footer */
        .footer {
            background: var(--dark);
            color: white;
            padding: 50px 0;
            text-align: center;
            border-radius: 30px 30px 0 0;
            margin-top: 50px;
        }

        .footer-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
        }

        .footer-subtitle {
            font-size: 18px;
            opacity: 0.8;
            margin-bottom: 30px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .contact-info {
            font-size: 20px;
            margin-bottom: 30px;
        }

        .copyright {
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 14px;
            opacity: 0.7;
        }

        /* Responsive design */
        @media (max-width: 900px) {
            .content-grid {
                grid-template-columns: 1fr;
            }

            .metrics-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 600px) {
            .header {
                padding: 30px 20px;
            }

            .title {
                font-size: 32px;
            }

            .subtitle {
                font-size: 18px;
            }

            .section {
                padding: 30px 20px;
            }

            .metrics-grid {
                grid-template-columns: 1fr;
            }

            .stats-container {
                flex-direction: column;
                gap: 15px;
            }

            .stat-card {
                min-width: auto;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
            </div>
            <h1 class="title">The CMO Value Playbook</h1>
            <p class="subtitle">5 strategies to boost influence and showcase marketing's value</p>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-number">48%</div>
                    <div class="stat-label">Unable to prove value and/or don't get credit</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">52%</div>
                    <div class="stat-label">Able to prove value and get credit</div>
                </div>
            </div>
        </div>
    </header>

    <!-- Introduction Section -->
    <section class="section">
        <h2 class="section-title">The Challenge for Marketing Leaders</h2>
        <p>The 2024 Gartner Marketing Analytics and Technology Survey indicates that proving the value of marketing and receiving credit for business outcomes is a common challenge, with nearly half of marketing leaders feeling it's out of reach.</p>
        <p>A deeper dive shows that just proving value isn't always enough to get credit. Skepticism and traditional beliefs often stand in the way of recognizing marketing's true value.</p>

        <div class="chart-container">
            <div class="chart-title">Perceptions of Marketing's Ability to Prove Value and Get Credit</div>
            <div class="bar-chart">
                <div class="bar" style="height: 48%; background: linear-gradient(to top, #ef4444, #f87171);">
                    <div class="bar-value">48%</div>
                    <div class="bar-label">Unable to prove value</div>
                </div>
                <div class="bar" style="height: 52%; background: linear-gradient(to top, #10b981, #34d399);">
                    <div class="bar-value">52%</div>
                    <div class="bar-label">Able to prove value</div>
                </div>
            </div>
            <p style="text-align: center; margin-top: 40px; font-style: italic;">n = 377 senior marketing leaders</p>
        </div>
    </section>

    <!-- Step 1 -->
    <section class="section">
        <div class="step-number">1</div>
        <h2 class="section-title">Focus on marketing's long-term, holistic impact</h2>

        <div class="content-grid">
            <div class="challenge-box">
                <h3><i class="fas fa-exclamation-triangle"></i> The Challenge</h3>
                <p>CMOs who adopt a long-term, holistic view are more successful in proving marketing's value and gaining credit. In contrast, only 30% of those focusing on short-term initiatives reported success.</p>
            </div>

            <div class="actions-box">
                <h3><i class="fas fa-check-circle"></i> Recommended Actions</h3>
                <ul class="actions-list">
                    <li>
                        <div class="action-icon">1</div>
                        <div>
                            <strong>Measure long-term value:</strong> Capturing marketing's effect over time requires more advanced approaches to measurement like measuring brand health and marketing mix modeling (MMM).
                        </div>
                    </li>
                    <li>
                        <div class="action-icon">2</div>
                        <div>
                            <strong>Create a holistic view:</strong> Develop a comprehensive view of marketing's value across six "value vectors": Connection to Strategy, ROI Story, Critical-Project Impact, Insight Engine, Empowering Others and Optimizing Resources.
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart-title">Focusing on holistic, longer-term impact helps prove value and get credit</div>
            <div class="bar-chart">
                <div class="bar" style="height: 30%; background: linear-gradient(to top, #ef4444, #f87171);">
                    <div class="bar-value">30%</div>
                    <div class="bar-label">Individual short-term</div>
                </div>
                <div class="bar" style="height: 51%; background: linear-gradient(to top, #f59e0b, #fbbf24);">
                    <div class="bar-value">51%</div>
                    <div class="bar-label">Holistic short-term</div>
                </div>
                <div class="bar" style="height: 49%; background: linear-gradient(to top, #3b82f6, #60a5fa);">
                    <div class="bar-value">49%</div>
                    <div class="bar-label">Individual long-term</div>
                </div>
                <div class="bar" style="height: 68%; background: linear-gradient(to top, #10b981, #34d399);">
                    <div class="bar-value">68%</div>
                    <div class="bar-label">Holistic long-term</div>
                </div>
            </div>
            <p style="text-align: center; margin-top: 40px; font-style: italic;">n = 377 senior marketing leaders</p>
        </div>
    </section>

    <!-- Step 2 -->
    <section class="section">
        <div class="step-number">2</div>
        <h2 class="section-title">Build a narrative about marketing's value for all stakeholders</h2>

        <div class="content-grid">
            <div class="challenge-box">
                <h3><i class="fas fa-exclamation-triangle"></i> The Challenge</h3>
                <p>CEOs and CFOs are the most skeptical of marketing's value. CMOs aiming to foster strong relationships should understand their priorities and views on marketing to craft a compelling narrative.</p>
            </div>

            <div class="actions-box">
                <h3><i class="fas fa-check-circle"></i> Recommended Approach</h3>
                <ul class="actions-list">
                    <li>
                        <div class="action-icon"><i class="fas fa-bullseye"></i></div>
                        <div>Tailor your value story to specific stakeholders</div>
                    </li>
                    <li>
                        <div class="action-icon"><i class="fas fa-comments"></i></div>
                        <div>Address specific stakeholder misconceptions</div>
                    </li>
                    <li>
                        <div class="action-icon"><i class="fas fa-file-alt"></i></div>
                        <div>Use the Key Stakeholder Shortlist Template</div>
                    </li>
                </ul>
            </div>
        </div>

        <h3 style="font-size: 20px; margin: 30px 0 20px; color: var(--dark);">Stakeholders most skeptical of marketing's value</h3>
        <div class="stakeholder-grid">
            <div class="stakeholder-card">
                <div class="stakeholder-header">
                    <div class="stakeholder-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stakeholder-title">CFO</div>
                </div>
                <ul class="beliefs-list">
                    <li>Marketing's broad activities make financial accountability challenging</li>
                    <li>Marketing investments need clear, measurable impact on revenue</li>
                    <li>Marketing's impact is often subtle and temporary</li>
                </ul>
            </div>

            <div class="stakeholder-card">
                <div class="stakeholder-header">
                    <div class="stakeholder-icon">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <div class="stakeholder-title">CEO</div>
                </div>
                <ul class="beliefs-list">
                    <li>Marketing is crucial but hard to measure</li>
                    <li>Marketing must move from cost center to profit driver</li>
                    <li>Marketing should demonstrate impact on business strategy</li>
                </ul>
            </div>
        </div>

        <div class="chart-container" style="margin-top: 40px;">
            <div class="chart-title">Skepticism Levels Among Stakeholders</div>
            <div class="bar-chart">
                <div class="bar" style="height: 40%; background: linear-gradient(to top, #ef4444, #f87171);">
                    <div class="bar-value">40%</div>
                    <div class="bar-label">CFO</div>
                </div>
                <div class="bar" style="height: 39%; background: linear-gradient(to top, #f59e0b, #fbbf24);">
                    <div class="bar-value">39%</div>
                    <div class="bar-label">CEO</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Step 3 -->
    <section class="section">
        <div class="step-number">3</div>
        <h2 class="section-title">Increase variety and sophistication of metric types</h2>

        <div class="content-grid">
            <div class="challenge-box">
                <h3><i class="fas fa-exclamation-triangle"></i> The Challenge</h3>
                <p>Using a variety of metrics makes it 26% more likely to prove value and get credit. However, it's not just about variety; it's the quality of the metrics that matters. Using at least one high-complexity metric type drives a 1.5x increase in likelihood to prove value.</p>
            </div>

            <div class="actions-box">
                <h3><i class="fas fa-check-circle"></i> Recommended Actions</h3>
                <ul class="actions-list">
                    <li>
                        <div class="action-icon"><i class="fas fa-cogs"></i></div>
                        <div>Prioritize high-complexity metrics</div>
                    </li>
                    <li>
                        <div class="action-icon"><i class="fas fa-sitemap"></i></div>
                        <div>Use Gartner's Hierarchy of Marketing Metrics</div>
                    </li>
                    <li>
                        <div class="action-icon"><i class="fas fa-users"></i></div>
                        <div>Start with stakeholder interviews</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart-title">Impact of High-Complexity Metrics</div>
            <div class="bar-chart">
                <div class="bar" style="height: 37%; background: linear-gradient(to top, #f59e0b, #fbbf24);">
                    <div class="bar-value">37%</div>
                    <div class="bar-label">No high-complexity metrics</div>
                </div>
                <div class="bar" style="height: 56%; background: linear-gradient(to top, #10b981, #34d399);">
                    <div class="bar-value">56%</div>
                    <div class="bar-label">With high-complexity metrics</div>
                </div>
            </div>
            <p style="text-align: center; margin-top: 20px; font-weight: 600;">1.5x more likely to prove value and get credit</p>
        </div>

        <h3 style="font-size: 20px; margin: 40px 0 20px; color: var(--dark);">High-Complexity Metric Types</h3>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-title">Relationship Metrics</div>
                <p>Metrics that measure customer relationships over time</p>
                <div class="metric-examples">
                    <strong>Examples:</strong> Customer lifetime value (LTV), Customer acquisition cost (CAC), LTV-CAC ratio
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-title">Return on Transactional</div>
                <p>Metrics that measure the financial return on specific activities</p>
                <div class="metric-examples">
                    <strong>Examples:</strong> Cost per acquisition (CPA), Return on ad spend (ROAS), ROI
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-title">Operational Metrics</div>
                <p>Metrics that measure the efficiency and effectiveness of marketing operations</p>
                <div class="metric-examples">
                    <strong>Examples:</strong> Stakeholder satisfaction, Productivity of marketing resources, Capacity utilization
                </div>
            </div>
        </div>
    </section>

    <!-- Step 4 -->
    <section class="section">
        <div class="step-number">4</div>
        <h2 class="section-title">Expand leadership involvement in D&A activity</h2>

        <div class="content-grid">
            <div class="challenge-box">
                <h3><i class="fas fa-exclamation-triangle"></i> The Challenge</h3>
                <p>CMO and senior marketing leader participation in a high number of D&A activities, particularly managing a D&A function, is vital to proving value and getting credit.</p>
            </div>

            <div class="actions-box">
                <h3><i class="fas fa-check-circle"></i> Recommended Actions</h3>
                <ul class="actions-list">
                    <li>
                        <div class="action-icon"><i class="fas fa-chart-bar"></i></div>
                        <div>Increase involvement in analytical activities</div>
                    </li>
                    <li>
                        <div class="action-icon"><i class="fas fa-users"></i></div>
                        <div>Regular meetings with team members and executives</div>
                    </li>
                    <li>
                        <div class="action-icon"><i class="fas fa-tools"></i></div>
                        <div>Develop measurement strategies for marketing activities</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart-title">Impact of D&A Activities on Proving Marketing Value</div>
            <div class="bar-chart">
                <div class="bar" style="height: 44%; background: linear-gradient(to top, #f59e0b, #fbbf24);">
                    <div class="bar-value">44%</div>
                    <div class="bar-label">Low activities in role</div>
                </div>
                <div class="bar" style="height: 60%; background: linear-gradient(to top, #10b981, #34d399);">
                    <div class="bar-value">60%</div>
                    <div class="bar-label">High activities in role</div>
                </div>
                <div class="bar" style="height: 48%; background: linear-gradient(to top, #3b82f6, #60a5fa);">
                    <div class="bar-value">48%</div>
                    <div class="bar-label">Low activities in career</div>
                </div>
                <div class="bar" style="height: 55%; background: linear-gradient(to top, #8b5cf6, #a78bfa);">
                    <div class="bar-value">55%</div>
                    <div class="bar-label">High activities in career</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Step 5 -->
    <section class="section">
        <div class="step-number">5</div>
        <h2 class="section-title">Invest in marketing talent to close gaps</h2>

        <div class="content-grid">
            <div class="challenge-box">
                <h3><i class="fas fa-exclamation-triangle"></i> The Challenge</h3>
                <p>Talent gaps present the biggest barriers to proving the value of marketing. For CMOs, lacking the right talent affects how the C-suite perceives marketing's value and impacts investment in marketing D&A.</p>
            </div>

            <div class="actions-box">
                <h3><i class="fas fa-check-circle"></i> Recommended Actions</h3>
                <ul class="actions-list">
                    <li>
                        <div class="action-icon"><i class="fas fa-comments"></i></div>
                        <div>Develop soft skills and competencies to tell a consistent, credible story</div>
                    </li>
                    <li>
                        <div class="action-icon"><i class="fas fa-chart-pie"></i></div>
                        <div>Invest in analytical talent to bridge the talent gap</div>
                    </li>
                    <li>
                        <div class="action-icon"><i class="fas fa-laptop-code"></i></div>
                        <div>Focus on recruiting and upskilling technical talent</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart-title">Top Barriers to Proving Marketing Value</div>
            <div class="bar-chart">
                <div class="bar" style="height: 39%; background: linear-gradient(to top, #ef4444, #f87171);">
                    <div class="bar-value">39%</div>
                    <div class="bar-label">Lack of soft skills</div>
                </div>
                <div class="bar" style="height: 34%; background: linear-gradient(to top, #f59e0b, #fbbf24);">
                    <div class="bar-value">34%</div>
                    <div class="bar-label">Lack of analytical talent</div>
                </div>
                <div class="bar" style="height: 33%; background: linear-gradient(to top, #3b82f6, #60a5fa);">
                    <div class="bar-value">33%</div>
                    <div class="bar-label">Lack of technical talent</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Resources Section -->
    <section class="section">
        <h2 class="section-title">Additional Resources</h2>
        <p style="margin-bottom: 30px;">Explore these additional complimentary resources and tools for marketing leaders:</p>

        <div class="resources-grid">
            <div class="resource-card">
                <div class="resource-icon">
                    <i class="fas fa-video"></i>
                </div>
                <h3 class="resource-title">Change the Perception of Marketing</h3>
                <p>Learn how CMOs use measurement and storytelling to communicate the impact of marketing.</p>
                <button class="resource-btn">Watch Now</button>
            </div>

            <div class="resource-card">
                <div class="resource-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <h3 class="resource-title">Marketing Talent Trends</h3>
                <p>Learn marketing talent trends and CMO action steps to drive success.</p>
                <button class="resource-btn">Download Now</button>
            </div>

            <div class="resource-card">
                <div class="resource-icon">
                    <i class="fas fa-file-invoice-dollar"></i>
                </div>
                <h3 class="resource-title">Marketing Budget Template</h3>
                <p>Build your 2025 budget with this comprehensive template.</p>
                <button class="resource-btn">Download Now</button>
            </div>

            <div class="resource-card">
                <div class="resource-icon">
                    <i class="fas fa-book"></i>
                </div>
                <h3 class="resource-title">Prove Marketing Value Guide</h3>
                <p>Use the hierarchy of marketing metrics to quantify marketing's impact.</p>
                <button class="resource-btn">Download Now</button>
            </div>
        </div>
    </section>
</div>

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <h2 class="footer-title">Connect With Us</h2>
        <p class="footer-subtitle">Get actionable, objective insight that drives smarter decisions and stronger performance on your mission-critical priorities.</p>

        <div class="contact-info">
            <p><i class="fas fa-phone"></i> U.S.: 1 855 811 7593</p>
            <p><i class="fas fa-phone"></i> International: +44 (0) 3330 607 044</p>
        </div>

        <button class="resource-btn" style="background: white; color: var(--primary); padding: 15px 30px; font-size: 18px;">
            Become a Client
        </button>

        <div class="copyright">
            <p>© 2024 Gartner, Inc. and/or its affiliates. All rights reserved. DOI_GBR_3309888</p>
            <p>Learn more about Gartner for Marketing at <a href="#" style="color: #93c5fd; text-decoration: none;">gartner.com/en/marketing</a></p>
        </div>
    </div>
</footer>

<script>
    // Simple animation for bar charts on page load
    document.addEventListener('DOMContentLoaded', function() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const height = bar.style.height;
            bar.style.height = '0';
            setTimeout(() => {
                bar.style.height = height;
            }, 300);
        });
    });
</script>
</body>
</html>
