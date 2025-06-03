<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mpdf\Mpdf;

class ReportController extends Controller
{
    public function generateReport()
    {
        $data = $this->getReportData();

        // Render the enhanced Blade template
//        $html = view('reports.cmo-playbook-professional', compact('data'))->render();
        $html = view('reports.cmo-playbook-professional', compact('data'))->render();

        // Configure mPDF with ONLY valid settings
        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'orientation' => 'L',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 10,
            'margin_header' => 5,
            'margin_footer' => 5,
            'tempDir' => sys_get_temp_dir(),
            'default_font' => 'sans-serif', // Using built-in font for better compatibility
            'default_font_size' => 12,
        ]);

        // These are the CORRECT ways to enhance mPDF's CSS support
        $mpdf->showImageErrors = true;
        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;


        $mpdf->WriteHTML($html);

        return response($mpdf->Output('CMO-Value-Playbook-Professional.pdf', 'D'))
            ->header('Content-Type', 'application/pdf');
    }

    public function previewReport()
    {
        $data = $this->getReportData();
        return view('reports.cmo-playbook-professional', compact('data'));
    }




    /**
     * Enhanced data structure with more detailed information for better visualizations
     */
    private function getReportData()
    {
        return [
            'title' => 'The CMO Value Playbook',
            'subtitle' => '5 strategies to boost influence and showcase marketing\'s value',
            'survey_info' => [
                'year' => '2024',
                'source' => 'Gartner Marketing Analytics and Technology Survey',
                'sample_size' => 377,
                'respondent_type' => 'senior marketing leaders'
            ],
            'key_statistics' => [
                'prove_value_and_credit' => 52,
                'unable_to_prove' => 48,
                'holistic_long_term_success' => 68,
                'individual_short_term_success' => 30,
                'high_complexity_metrics_improvement' => 1.5,
                'da_activity_improvement' => 1.4
            ],
            'stakeholder_data' => [
                'most_skeptical' => [
                    ['role' => 'Chief Financial Officer (CFO)', 'percentage' => 40, 'color' => '#f59e0b'],
                    ['role' => 'Chief Executive Officer (CEO)', 'percentage' => 39, 'color' => '#3b82f6']
                ],
                'ceo_beliefs' => [
                    'Marketing is crucial, but measuring its direct impact on our bottom line can be challenging',
                    'Marketing must move from being a cost center to a profit driver',
                    'Marketing should demonstrate its impact on the overall business strategy'
                ],
                'cfo_beliefs' => [
                    'Marketing\'s broad range of activities makes it challenging to pinpoint financial accountability',
                    'Investments in marketing dollars need to show a clear and directly measurable impact on revenue and growth',
                    'Marketing\'s impact is often subtle and temporary, as many of its efforts are geared toward indirectly influencing engagement and perception'
                ]
            ],
            'strategies' => [
                [
                    'number' => 1,
                    'title' => 'Focus on marketing\'s long-term, holistic impact',
                    'description' => 'CMOs who adopt a long-term, holistic view are more successful in proving marketing\'s value and gaining credit. Only 30% of those focusing on short-term initiatives reported success.',
                    'key_stat' => '68% success rate with holistic, long-term focus',
                    'actions' => [
                        'Measure long-term value using advanced approaches like marketing mix modeling (MMM)',
                        'Create a holistic view across six value vectors: Connection to Strategy, ROI Story, Critical-Project Impact, Insight Engine, Empowering Others and Optimizing Resources'
                    ],
                    'icon' => '📊'
                ],
                [
                    'number' => 2,
                    'title' => 'Build a narrative about marketing\'s value for all stakeholders',
                    'description' => 'CEOs and CFOs are the most skeptical of marketing\'s value. CMOs must understand their priorities and craft compelling narratives that resonate.',
                    'key_stat' => '40% of CFOs and 39% of CEOs are skeptical',
                    'actions' => [
                        'Address CEO concerns about measuring direct impact on bottom line',
                        'Help CFOs understand clear financial accountability and measurable revenue impact'
                    ],
                    'icon' => '🎯'
                ],
                [
                    'number' => 3,
                    'title' => 'Increase variety and sophistication of metric types',
                    'description' => 'Using high-complexity metrics drives significant improvement in proving value. Variety and quality of metrics both matter.',
                    'key_stat' => '1.5x increase in likelihood to prove value',
                    'actions' => [
                        'Implement relationship metrics: Customer LTV, CAC, LTV:CAC ratio',
                        'Use return on transactional metrics: CPA, ROAS, ROI',
                        'Track operational metrics: stakeholder satisfaction, resource productivity'
                    ],
                    'icon' => '📈'
                ],
                [
                    'number' => 4,
                    'title' => 'Expand leadership involvement in data and analytics activity',
                    'description' => 'Marketing leaders engaged in D&A activities have a clear advantage. Regular meetings with stakeholders and hands-on involvement are crucial.',
                    'key_stat' => '1.4x more likely to prove value',
                    'actions' => [
                        'Manage teams of marketing data analysts',
                        'Create marketing dashboards and custom reports',
                        'Develop measurement strategies for marketing activities'
                    ],
                    'icon' => '⚡'
                ],
                [
                    'number' => 5,
                    'title' => 'Invest in marketing talent to close gaps',
                    'description' => 'Talent gaps present the biggest barriers to proving marketing value. CMOs must develop adaptive capabilities across multiple skill areas.',
                    'key_stat' => 'Top 3 barriers are all talent-related',
                    'actions' => [
                        'Develop soft skills and competencies for storytelling',
                        'Invest in analytical talent for data analysis and insights',
                        'Focus on technical talent for data integration and advanced technologies'
                    ],
                    'icon' => '👥'
                ]
            ],
            'barriers' => [
                ['description' => 'Lack of necessary soft skills/competencies', 'percentage' => 39, 'color' => '#ef4444'],
                ['description' => 'Lack of analytical talent to analyze data and generate insight', 'percentage' => 34, 'color' => '#f97316'],
                ['description' => 'Lack of technical talent to integrate and analyze data', 'percentage' => 33, 'color' => '#eab308']
            ],
            'success_matrix' => [
                'holistic_long_term' => ['label' => 'Holistic, longer-term focus', 'value' => 68, 'category' => 'best'],
                'holistic_short_term' => ['label' => 'Holistic, shorter-term focus', 'value' => 51, 'category' => 'good'],
                'individual_long_term' => ['label' => 'Individual, longer-term focus', 'value' => 49, 'category' => 'moderate'],
                'individual_short_term' => ['label' => 'Individual, shorter-term focus', 'value' => 30, 'category' => 'worst']
            ]
        ];
    }




    public function landscapeChart()
    {

        $data = [
            'bars' => [
                ['label' => 'Marketing', 'value' => 60],
                ['label' => 'Sales', 'value' => 40],
                ['label' => 'Support', 'value' => 30],
            ],
            'text' => 'Key takeaways from the performance data include increased marketing investment and noticeable under-resourcing of support.',
            'list' => [
                'Rebalance budgets toward support',
                'Double down on ROI in marketing',
                'Explore AI-driven sales enablement tools'
            ]
        ];

        $html = view('reports.half-chart', compact('data'))->render();

        $mpdf = new Mpdf([
            'format' => 'A4-L', // A4 Landscape
            'margin_top' => 10,
            'margin_bottom' => 10,
            'margin_left' => 10,
            'margin_right' => 10,
        ]);

        $mpdf->WriteHTML($html);
        return response($mpdf->Output('half_chart.pdf', 'I'))->header('Content-Type', 'application/pdf');
    }

}
