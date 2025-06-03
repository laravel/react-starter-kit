{{-- resources/views/reports/comprehensive/ar.blade.php --}}
    <!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <title>تقرير التقييم النهائي - {{ $results['assessment']['client_name'] }}</title>
    <style>
        @font-face {
            font-family: 'Almarai';
            src: url('{{ public_path('fonts/Almarai-Regular.ttf') }}') format('truetype');
            font-weight: normal;
        }
        @font-face {
            font-family: 'Almarai';
            src: url('{{ public_path('fonts/Almarai-Bold.ttf') }}') format('truetype');
            font-weight: bold;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Almarai', 'DejaVu Sans', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
            direction: rtl;
        }

        .container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
        }

        .header {
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .header h2 {
            font-size: 18px;
            opacity: 0.9;
        }

        .header .meta {
            margin-top: 20px;
            font-size: 14px;
        }

        .section {
            padding: 30px;
            border-bottom: 2px solid #ecf0f1;
        }

        .section h3 {
            color: #1e40af;
            font-size: 22px;
            margin-bottom: 20px;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 10px;
            font-weight: bold;
        }

        .client-info {
            display: table;
            width: 100%;
            table-layout: fixed;
        }

        .client-info-row {
            display: table-row;
        }

        .info-card {
            display: table-cell;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-right: 4px solid #3b82f6;
            margin: 10px;
            width: 25%;
        }

        .info-card h4 {
            font-weight: bold;
            margin-bottom: 8px;
            color: #1e40af;
        }

        .score-overview {
            text-align: center;
            padding: 40px 20px;
        }

        .overall-score {
            font-size: 64px;
            font-weight: bold;
            margin: 30px 0;
        }

        .cert-badge {
            display: inline-block;
            padding: 20px 40px;
            border-radius: 12px;
            margin: 20px 0;
            font-size: 18px;
            font-weight: bold;
            border: 2px solid;
        }

        .score-card {
            background: white;
            border: 2px solid #ecf0f1;
            border-radius: 12px;
            padding: 25px;
            margin: 15px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .score-header {
            display: table;
            width: 100%;
            margin-bottom: 15px;
        }

        .score-icon {
            display: table-cell;
            width: 50px;
            height: 40px;
            border-radius: 50%;
            text-align: center;
            vertical-align: middle;
            color: white;
            font-weight: bold;
            padding-left: 15px;
        }

        .score-content {
            display: table-cell;
            vertical-align: middle;
        }

        .score-content h4 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .score-bar {
            background: #ecf0f1;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
            position: relative;
        }

        .score-fill {
            height: 100%;
            background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e);
            border-radius: 10px;
            transition: width 0.3s ease;
        }

        .stats-grid {
            display: table;
            width: 100%;
            margin-top: 15px;
        }

        .stats-row {
            display: table-row;
        }

        .stat-item {
            display: table-cell;
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            margin: 5px;
            width: 33.33%;
        }

        .stat-value {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 12px;
            opacity: 0.8;
        }

        .recommendations {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .recommendations h5 {
            font-weight: bold;
            margin-bottom: 15px;
            color: #1e40af;
        }

        .recommendation-item {
            background: white;
            margin: 8px 0;
            padding: 15px;
            border-radius: 6px;
            border-right: 4px solid #3b82f6;
        }

        .priority-high {
            border-right-color: #ef4444 !important;
        }

        .priority-medium {
            border-right-color: #f59e0b !important;
        }

        .priority-low {
            border-right-color: #22c55e !important;
        }

        .action-plan-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .action-plan-table th,
        .action-plan-table td {
            padding: 12px;
            text-align: center;
            border: 1px solid #ddd;
        }

        .action-plan-table th {
            background: #3b82f6;
            color: white;
            font-weight: bold;
        }

        .action-plan-table tr:nth-child(even) {
            background: #f8f9fa;
        }

        /* NEW: Action items styling */
        .actions-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .action-type-header {
            background: #1e40af;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            margin-bottom: 15px;
            font-weight: bold;
        }

        .action-type-header.improvement {
            background: #059669; /* Green for improvement */
        }

        .action-type-header.corrective {
            background: #dc2626; /* Red for corrective */
        }

        .action-item {
            background: white;
            margin: 8px 0;
            padding: 12px 15px;
            border-radius: 6px;
            border-right: 4px solid #3b82f6;
            font-size: 14px;
        }

        .action-item.improvement {
            border-right-color: #059669;
        }

        .action-item.corrective {
            border-right-color: #dc2626;
        }

        .criterion-group {
            margin-bottom: 25px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }

        .criterion-header {
            background: #f3f4f6;
            padding: 12px 15px;
            border-bottom: 1px solid #e5e7eb;
            font-weight: bold;
            color: #374151;
        }

        .actions-list {
            padding: 15px;
        }

        .footer {
            text-align: center;
            background: #f8f9fa;
            padding: 30px;
            color: #666;
            border: none;
        }

        .page-break {
            page-break-before: always;
        }

        /* Certification specific colors */
        .cert-full {
            color: #22c55e;
            background-color: #dcfce7;
            border-color: #22c55e;
        }

        .cert-conditional {
            color: #f59e0b;
            background-color: #fef3c7;
            border-color: #f59e0b;
        }

        .cert-denied {
            color: #ef4444;
            background-color: #fee2e2;
            border-color: #ef4444;
        }

        /* Progress bars colors */
        .progress-excellent { background-color: #22c55e; }
        .progress-good { background-color: #3b82f6; }
        .progress-fair { background-color: #f59e0b; }
        .progress-poor { background-color: #ef4444; }

        /* Stats backgrounds */
        .stat-yes { background-color: #dcfce7; color: #15803d; }
        .stat-no { background-color: #fee2e2; color: #dc2626; }
        .stat-na { background-color: #f3f4f6; color: #6b7280; }
    </style>
</head>
<body>
<div class="container">
    {{-- Header --}}
    <div class="header">
        <h1>تقرير التقييم النهائي</h1>
        <h2>{{ $results['tool']['name_ar'] }}</h2>
        <div class="meta">
            التاريخ: {{ $results['assessment']['created_at']->format('Y/m/d') }} |
            النوع: تقييم شامل |
            الحالة: {{ $results['assessment']['status'] === 'completed' ? 'مكتمل' : 'قيد المعالجة' }}
        </div>
    </div>

    {{-- Client Information --}}
    <div class="section">
        <h3>معلومات العميل</h3>
        <div class="client-info">
            <div class="client-info-row">
                <div class="info-card">
                    <h4>اسم العميل</h4>
                    <p>{{ $results['assessment']['client_name'] }}</p>
                </div>
                <div class="info-card">
                    <h4>البريد الإلكتروني</h4>
                    <p>{{ $results['assessment']['client_email'] }}</p>
                </div>
                <div class="info-card">
                    <h4>المؤسسة</h4>
                    <p>{{ $results['assessment']['organization'] ?: 'غير محدد' }}</p>
                </div>
                <div class="info-card">
                    <h4>أداة التقييم</h4>
                    <p>{{ $results['tool']['name_ar'] }}</p>
                </div>
            </div>
        </div>
    </div>

    {{-- Overall Results --}}
    <div class="section">
        <h3>النتيجة الإجمالية</h3>
        <div class="score-overview">
            <div class="overall-score" style="color: {{ $certification['color'] }}">
                {{ number_format($results['overall_percentage'], 1) }}%
            </div>
            <div class="cert-badge cert-{{ $certification['level'] }}">
                {{ $certification['text_ar'] }}
            </div>

            <div class="stats-grid">
                <div class="stats-row">
                    <div class="stat-item stat-yes">
                        <div class="stat-value">{{ $results['yes_count'] }}</div>
                        <div class="stat-label">إجابات نعم</div>
                    </div>
                    <div class="stat-item stat-no">
                        <div class="stat-value">{{ $results['no_count'] }}</div>
                        <div class="stat-label">إجابات لا</div>
                    </div>
                    <div class="stat-item stat-na">
                        <div class="stat-value">{{ $results['na_count'] }}</div>
                        <div class="stat-label">غير قابل للتطبيق</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- Domain Results --}}
    <div class="section">
        <h3>النتائج التفصيلية</h3>
        @foreach($results['domain_results'] as $domain)
            <div class="score-card">
                <div class="score-header">
                    <div class="score-icon" style="background-color: {{ getDomainColor($loop->index) }};">
                        {{ $loop->iteration }}
                    </div>
                    <div class="score-content">
                        <h4>{{ $domain['domain_name'] }}</h4>
                        <p>النتيجة: {{ number_format($domain['score_percentage'], 1) }}% |
                            المعايير: {{ $domain['total_criteria'] }} |
                            القابل للتطبيق: {{ $domain['applicable_criteria'] }}</p>
                    </div>
                </div>

                <div class="score-bar">
                    <div class="score-fill progress-{{ getScoreClass($domain['score_percentage']) }}"
                         style="width: {{ $domain['score_percentage'] }}%;"></div>
                </div>

                <div class="stats-grid">
                    <div class="stats-row">
                        <div class="stat-item stat-yes">
                            <div class="stat-value">{{ $domain['yes_count'] }}</div>
                            <div class="stat-label">نعم</div>
                        </div>
                        <div class="stat-item stat-no">
                            <div class="stat-value">{{ $domain['no_count'] }}</div>
                            <div class="stat-label">لا</div>
                        </div>
                        <div class="stat-item stat-na">
                            <div class="stat-value">{{ $domain['na_count'] }}</div>
                            <div class="stat-label">غير قابل</div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    {{-- ENHANCED: Detailed Actions Section using Action Model --}}
    @if(isset($actions) && !empty($actions))
        <div class="section">
            <h3>الإجراءات المطلوبة</h3>

            {{-- Group actions by criteria --}}
            @php
                $actionsByCriteria = collect($actions)->groupBy('criterion_id');
            @endphp

            @foreach($actionsByCriteria as $criterionId => $criterionActions)
                @php
                    $criterion = $criterionActions->first()->criterion ?? null;
                    $improvementActions = $criterionActions->where('flag', true);
                    $correctiveActions = $criterionActions->where('flag', false);
                @endphp

                <div class="criterion-group">
                    <div class="criterion-header">
                        {{ $criterion ? $criterion->name_ar : "معيار غير محدد" }}
                    </div>
                    <div class="actions-list">
                        {{-- Improvement Actions --}}
                        @if($improvementActions->count() > 0)
                            <div class="action-type-header improvement">
                                🔧 إجراءات تحسينية ({{ $improvementActions->count() }})
                            </div>
                            @foreach($improvementActions as $action)
                                <div class="action-item improvement">
                                    {{ $action->action_ar }}
                                </div>
                            @endforeach
                        @endif

                        {{-- Corrective Actions --}}
                        @if($correctiveActions->count() > 0)
                            <div class="action-type-header corrective">
                                ⚠️ إجراءات تصحيحية ({{ $correctiveActions->count() }})
                            </div>
                            @foreach($correctiveActions as $action)
                                <div class="action-item corrective">
                                    {{ $action->action_ar }}
                                </div>
                            @endforeach
                        @endif
                    </div>
                </div>
            @endforeach
        </div>
    @endif

    {{-- Recommendations --}}
    @if($settings['include_recommendations'] && !empty($recommendations))
        <div class="section">
            <h3>التوصيات</h3>
            <div class="recommendations">
                <h5>توصيات التحسين:</h5>
                @foreach($recommendations as $recommendation)
                    <div class="recommendation-item priority-{{ $recommendation['priority'] }}">
                        <strong>{{ $recommendation['domain_name'] }}:</strong>
                        {{ $recommendation['text'] }}
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    {{-- ENHANCED: Action Plan using dynamic data --}}
    <div class="section">
        <h3>خطة العمل الموصى بها</h3>
        <table class="action-plan-table">
            <thead>
            <tr>
                <th>المجال</th>
                <th>النتيجة الحالية</th>
                <th>الهدف المطلوب</th>
                <th>الأولوية</th>
                <th>الإجراءات المطلوبة</th>
                <th>نوع الإجراء</th>
            </tr>
            </thead>
            <tbody>
            @foreach($results['domain_results'] as $domain)
                @php
                    $priority = getPriorityLevel($domain['score_percentage']);
                    $targetScore = getTargetScore($domain['score_percentage']);
                    $actionType = getRecommendedActionType($domain['score_percentage']);
                @endphp
                <tr>
                    <td>{{ $domain['domain_name'] }}</td>
                    <td>{{ number_format($domain['score_percentage'], 1) }}%</td>
                    <td>{{ $targetScore }}%</td>
                    <td style="color: {{ getPriorityColor($priority) }};">{{ $priority }}</td>
                    <td>{{ getActionPlan($domain['domain_name'], $domain['score_percentage']) }}</td>
                    <td style="background-color: {{ $actionType === 'تحسينية' ? '#dcfce7' : '#fee2e2' }};">
                        {{ $actionType }}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    {{-- Summary Statistics --}}
    @if(isset($actions))
        <div class="section">
            <h3>إحصائيات الإجراءات</h3>
            @php
                $totalActions = collect($actions)->count();
                $improvementCount = collect($actions)->where('flag', true)->count();
                $correctiveCount = collect($actions)->where('flag', false)->count();
            @endphp

            <div class="stats-grid">
                <div class="stats-row">
                    <div class="stat-item" style="background-color: #dcfce7; color: #15803d;">
                        <div class="stat-value">{{ $improvementCount }}</div>
                        <div class="stat-label">إجراءات تحسينية</div>
                    </div>
                    <div class="stat-item" style="background-color: #fee2e2; color: #dc2626;">
                        <div class="stat-value">{{ $correctiveCount }}</div>
                        <div class="stat-label">إجراءات تصحيحية</div>
                    </div>
                    <div class="stat-item" style="background-color: #f3f4f6; color: #6b7280;">
                        <div class="stat-value">{{ $totalActions }}</div>
                        <div class="stat-label">إجمالي الإجراءات</div>
                    </div>
                </div>
            </div>
        </div>
    @endif

    {{-- Footer --}}
    <div class="footer">
        <p>هذا التقرير تم إنتاجه بواسطة نظام التقييم الآلي</p>
        <p style="margin-top: 10px;">للاستفسارات: info@company.com | www.company.com</p>
        <p style="margin-top: 5px; font-size: 12px;">
            تاريخ الإنتاج: {{ now()->format('Y/m/d H:i') }}
        </p>
    </div>
</div>
</body>
</html>

@php
    function getDomainColor($index) {
        $colors = ['#3b82f6', '#ef4444', '#f97316', '#22c55e', '#8b5cf6', '#06b6d4'];
        return $colors[$index % count($colors)];
    }

    function getScoreClass($score) {
        if ($score >= 85) return 'excellent';
        if ($score >= 70) return 'good';
        if ($score >= 55) return 'fair';
        return 'poor';
    }

    function getActionPlan($domainName, $score) {
        if ($score < 60) {
            return "إعادة هيكلة وتطوير شامل لـ {$domainName}";
        } elseif ($score < 80) {
            return "تحسين وتطوير العمليات في {$domainName}";
        } else {
            return "مراجعة دورية والحفاظ على المستوى الحالي";
        }
    }

    function getPriorityLevel($score) {
        if ($score < 60) return 'عالية';
        if ($score < 80) return 'متوسطة';
        return 'منخفضة';
    }

    function getPriorityColor($priority) {
        switch($priority) {
            case 'عالية': return '#dc2626';
            case 'متوسطة': return '#f59e0b';
            case 'منخفضة': return '#059669';
            default: return '#6b7280';
        }
    }

    function getTargetScore($currentScore) {
        if ($currentScore < 70) return '85+';
        if ($currentScore < 85) return '90+';
        return '95+';
    }

    function getRecommendedActionType($score) {
        return $score < 70 ? 'تصحيحية' : 'تحسينية';
    }
@endphp
