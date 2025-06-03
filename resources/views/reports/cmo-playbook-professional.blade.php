<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $data['title'] }}</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 11pt;
            color: #222;
            background: #fff;
        }

        .container {
            width: 100%;
            margin: 0 auto;
            padding: 20mm;
        }

        .cover {
            text-align: center;
            padding-top: 80mm;
            color: #003366;
        }
        .cover h1 {
            font-size: 36pt;
            font-weight: bold;
            margin-bottom: 10mm;
        }
        .cover p {
            font-size: 14pt;
            color: #666;
        }

        .section-title {
            font-size: 18pt;
            font-weight: bold;
            margin-top: 20mm;
            margin-bottom: 6mm;
            color: #1e3a8a;
            border-bottom: 1px solid #ddd;
            padding-bottom: 3mm;
        }

        .stats-grid {
            display: flex;
            justify-content: space-between;
            margin-top: 10mm;
        }

        .stat {
            width: 48%;
            text-align: center;
            padding: 10mm;
            background: #f3f4f6;
            border: 1px solid #ddd;
            border-radius: 6pt;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .stat .number {
            font-size: 48pt;
            color: #1e40af;
            font-weight: bold;
        }

        .stat .label {
            font-size: 11pt;
            color: #555;
        }

        .insight-box {
            background: #fff8dc;
            border-left: 5pt solid #f59e0b;
            padding: 10mm;
            margin-top: 8mm;
            border-radius: 4pt;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .insight-box h4 {
            font-size: 12pt;
            margin-bottom: 3mm;
            color: #b45309;
        }

        .insight-box p {
            font-size: 10pt;
            color: #444;
        }

        .strategy {
            margin-top: 12mm;
            padding: 10mm;
            border: 1pt solid #ddd;
            border-left: 5pt solid #1e3a8a;
            background: #f9fafb;
            border-radius: 4pt;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .strategy h3 {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 5mm;
        }

        .strategy p {
            font-size: 10pt;
            margin-bottom: 4mm;
        }

        .strategy .keystat {
            font-size: 10pt;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 4mm;
        }

        .strategy ul {
            font-size: 10pt;
            padding-left: 16pt;
        }

        .bar-label {
            font-size: 10pt;
            margin-bottom: 1mm;
        }

        .bar-container {
            background: #e5e7eb;
            border-radius: 3pt;
            height: 14pt;
            margin-bottom: 5mm;
            overflow: hidden;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .bar-fill {
            background: #1e3a8a;
            height: 14pt;
            color: #fff;
            padding-left: 5pt;
            line-height: 14pt;
        }

        .footer {
            margin-top: 20mm;
            font-size: 9pt;
            color: #666;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 5mm;
        }

        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="cover">
        <h1>{{ $data['title'] }}</h1>
        <p>{{ $data['subtitle'] }}</p>
        <p style="margin-top: 20mm;">© {{ date('Y') }} Gartner, Inc.</p>
    </div>

    <div class="page-break"></div>

    <div class="section-title">Key Statistics</div>
    <div class="stats-grid">
        <div class="stat">
            <div class="number">{{ $data['key_statistics']['prove_value_and_credit'] }}%</div>
            <div class="label">Able to prove value and get credit</div>
        </div>
        <div class="stat">
            <div class="number">{{ $data['key_statistics']['unable_to_prove'] }}%</div>
            <div class="label">Unable to prove value or receive credit</div>
        </div>
    </div>

    <div class="insight-box">
        <h4>Key Insight</h4>
        <p>
            The {{ $data['survey_info']['year'] }} {{ $data['survey_info']['source'] }} of
            {{ $data['survey_info']['sample_size'] }} {{ $data['survey_info']['respondent_type'] }} found that
            proving marketing value is a challenge for nearly half of CMOs.
        </p>
    </div>

    <div class="page-break"></div>

    <div class="section-title">5 Proven Strategies</div>
    @foreach($data['strategies'] as $strategy)
        <div class="strategy">
            <h3>{{ $strategy['number'] }}. {{ $strategy['title'] }}</h3>
            <p>{{ $strategy['description'] }}</p>
            <p class="keystat">📊 {{ $strategy['key_stat'] }}</p>
            <ul>
                @foreach($strategy['actions'] as $action)
                    <li>{{ $action }}</li>
                @endforeach
            </ul>
        </div>
    @endforeach

    <div class="page-break"></div>

    <div class="section-title">Stakeholder Skepticism</div>
    @foreach($data['stakeholder_data']['most_skeptical'] as $item)
        <div class="avoid-break">
            <div class="bar-label">{{ $item['role'] }} — {{ $item['percentage'] }}%</div>
            <div class="bar-container">
                <div class="bar-fill" style="width: {{ $item['percentage'] }}%">&nbsp;</div>
            </div>
        </div>
    @endforeach
    @foreach($data['stakeholder_data']['most_skeptical'] as $item)
        <div class="avoid-break">
            <div class="bar-label">{{ $item['role'] }} — {{ $item['percentage'] }}%</div>
            <div class="bar-container">
                <div class="bar-fill" style="width: {{ $item['percentage'] }}%">&nbsp;</div>
            </div>
        </div>
    @endforeach

    <div class="insight-box">
        <h4>Strategic Insight</h4>
        <p>
            CFOs seek direct accountability from marketing. CEOs want marketing to become a growth engine, not a cost center.
        </p>
    </div>
    <div class="insight-box">
        <h4>Strategic Insight</h4>
        <p>
            CFOs seek direct accountability from marketing. CEOs want marketing to become a growth engine, not a cost center.
        </p>
    </div>


    <div class="page-break"></div>

    <div class="section-title">Top Barriers to Proving Value</div>
    @foreach($data['barriers'] as $item)
        <div class="avoid-break">
            <div class="bar-label">{{ $item['description'] }} — {{ $item['percentage'] }}%</div>
            <div class="bar-container">
                <div class="bar-fill" style="width: {{ $item['percentage'] }}%; background: #f59e0b;">&nbsp;</div>
            </div>
        </div>
    @endforeach

    <div class="insight-box">
        <h4>Talent Investment Priority</h4>
        <p>
            Soft skills, data literacy, and tech capabilities are essential to overcome these top barriers.
        </p>
    </div>

    <div class="footer">
        Source: {{ $data['survey_info']['year'] }} {{ $data['survey_info']['source'] }}<br>
        Generated on {{ date('F j, Y') }}
    </div>
</div>

<div class="pdf-footer">
    Page {PAGENO} of {nb}
</div>

</body>
</html>
