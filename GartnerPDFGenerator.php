<?php
/**
 * Gartner CMO Value Playbook PDF Generator
 * This creates an exact visual clone using DomPDF with strategic workarounds
 */
require_once 'vendor/autoload.php';

use Dompdf\Dompdf;
use Dompdf\Options;

class GartnerPDFGenerator
{
    private $dompdf;
    private $data;

    public function __construct()
    {
        // Configure DomPDF for professional documents
        $options = new Options();
        $options->set([
            'isRemoteEnabled' => true,           // Allow external resources
            'isHtml5ParserEnabled' => true,      // Better HTML parsing
            'isFontSubsettingEnabled' => true,   // Optimize fonts
            'defaultFont' => 'DejaVu Sans',      // Reliable default font
            'dpi' => 96,                         // Standard web DPI
            'fontHeightRatio' => 1.1,            // Better line spacing
            'debugKeepTemp' => false,            // Set true for debugging
            'chroot' => realpath(''),            // Security measure
        ]);

        $this->dompdf = new Dompdf($options);

        // Sample data structure matching the original document
        $this->data = [
            'title' => 'The CMO Value Playbook',
            'subtitle' => '5 strategies to boost influence and showcase marketing\'s value',
            'statistics' => [
                'unable_to_prove' => 48,
                'able_to_prove' => 52,
                'cfo_skeptical' => 40,
                'ceo_skeptical' => 39
            ],
            'steps' => [
                [
                    'number' => 1,
                    'title' => 'Focus on marketing\'s long-term, holistic impact',
                    'metrics' => [
                        'holistic_long_term' => 68,
                        'holistic_short_term' => 51,
                        'individual_long_term' => 49,
                        'individual_short_term' => 30
                    ]
                ],
                [
                    'number' => 2,
                    'title' => 'Build a narrative about marketing\'s value for all stakeholders',
                    'description' => 'CEOs and CFOs are the most skeptical of marketing\'s value.'
                ],
                [
                    'number' => 3,
                    'title' => 'Increase variety and sophistication of metric types',
                    'metrics' => [
                        'no_high_complexity' => 37,
                        'high_complexity' => 56
                    ]
                ],
                [
                    'number' => 4,
                    'title' => 'Expand leadership involvement in D&A activity',
                    'description' => 'More leadership participation in D&A activity is advantageous.'
                ],
                [
                    'number' => 5,
                    'title' => 'Invest in marketing talent to close gaps',
                    'barriers' => [
                        'soft_skills' => 39,
                        'analytical_talent' => 34,
                        'technical_talent' => 33
                    ]
                ]
            ]
        ];
    }

    /**
     * Generate the complete PDF document
     */
    public function generate()
    {
        $html = $this->buildCompleteHTML();

        $this->dompdf->loadHtml($html);
        $this->dompdf->setPaper('A4', 'portrait');
        $this->dompdf->render();

        return $this->dompdf->output();
    }

    /**
     * Build the complete HTML structure
     */
    private function buildCompleteHTML()
    {
        $css = $this->getStyles();
        $coverPage = $this->getCoverPage();
        $summaryPage = $this->getSummaryPage();
        $contentPages = $this->getContentPages();

        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset=\"utf-8\">
            <title>{$this->data['title']}</title>
            <style>{$css}</style>
        </head>
        <body>
            {$coverPage}
            <div class=\"page-break\"></div>
            {$summaryPage}
            {$contentPages}
        </body>
        </html>";
    }

    /**
     * Professional CSS styling optimized for DomPDF
     */
    private function getStyles()
    {
        return "
        /* Base styles optimized for DomPDF */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
        }

        .page-break {
            page-break-before: always;
        }

        /* Cover Page Styles */
        .cover-page {
            height: 100vh;
            background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%);
            background-color: #1a237e; /* Fallback for DomPDF */
            color: white;
            position: relative;
            padding: 60px 40px;
        }

        .cover-network {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDYwMCA4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8ZmlsdGVyIGlkPSJnbG93Ij4KICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIgcmVzdWx0PSJjb2xvcmVkQmx1ciIvPgogICAgICA8ZmVNZXJnZT4gCiAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJjb2xvcmVkQmx1ciIvPgogICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPiAKICAgICAgPC9mZU1lcmdlPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgogIAogIDwhLS0gTmV0d29yayBub2RlcyAtLT4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxNTAiIHI9IjE1IiBmaWxsPSIjZmZjMTA3IiBmaWx0ZXI9InVybCgjZ2xvdykiLz4KICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSIyMDAiIHI9IjIwIiBmaWxsPSIjZmZjMTA3IiBmaWx0ZXI9InVybCgjZ2xvdykiLz4KICA8Y2lyY2xlIGN4PSI0NTAiIGN5PSIzNTAiIHI9IjI1IiBmaWxsPSIjZmZjMTA3IiBmaWx0ZXI9InVybCgjZ2xvdykiLz4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSI0MDAiIHI9IjEyIiBmaWxsPSIjMDBiY2Q0IiBmaWx0ZXI9InVybCgjZ2xvdykiLz4KICA8Y2lyY2xlIGN4PSI1MDAiIGN5PSI1MDAiIHI9IjE4IiBmaWxsPSIjMDBiY2Q0IiBmaWx0ZXI9InVybCgjZ2xvdykiLz4KICA8Y2lyY2xlIGN4PSIzNTAiIGN5PSI2MDAiIHI9IjE1IiBmaWxsPSIjMDBiY2Q0IiBmaWx0ZXI9InVybCgjZ2xvdykiLz4KICAKICA8IS0tIENvbm5lY3RpbmcgbGluZXMgLS0+CiAgPGxpbmUgeDE9IjEwMCIgeTE9IjE1MCIgeDI9IjMwMCIgeTI9IjIwMCIgc3Ryb2tlPSIjNjRiNWY2IiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuNyIvPgogIDxsaW5lIHgxPSIzMDAiIHkxPSIyMDAiIHgyPSI0NTAiIHkyPSIzNTAiIHN0cm9rZT0iIzY0YjVmNiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjciLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iNDAwIiB4Mj0iMzUwIiB5Mj0iNjAwIiBzdHJva2U9IiM2NGI1ZjYiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC43Ii8+CiAgPGxpbmUgeDE9IjQ1MCIgeTE9IjM1MCIgeDI9IjUwMCIgeTI9IjUwMCIgc3Ryb2tlPSIjNjRiNWY2IiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuNyIvPgo8L3N2Zz4=');
            background-repeat: no-repeat;
            background-position: center;
            opacity: 0.3;
        }

        .gartner-logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 40px;
        }

        .cover-title {
            font-size: 48px;
            font-weight: bold;
            line-height: 1.2;
            margin-bottom: 20px;
            z-index: 10;
            position: relative;
        }

        .cover-subtitle {
            font-size: 18px;
            margin-bottom: 40px;
            opacity: 0.9;
            z-index: 10;
            position: relative;
        }

        /* Summary Page */
        .summary-page {
            padding: 40px;
        }

        .section-title {
            font-size: 24px;
            font-weight: bold;
            color: #1a237e;
            margin-bottom: 20px;
        }

        .key-stats {
            display: table;
            width: 100%;
            margin: 30px 0;
        }

        .stat-row {
            display: table-row;
        }

        .stat-cell {
            display: table-cell;
            width: 50%;
            padding: 20px;
            text-align: center;
        }

        .stat-number {
            font-size: 36px;
            font-weight: bold;
            color: #1a237e;
        }

        .stat-label {
            font-size: 14px;
            margin-top: 5px;
        }

        /* Steps Overview */
        .steps-overview {
            margin: 30px 0;
        }

        .step-item {
            display: table;
            width: 100%;
            margin-bottom: 15px;
            padding: 15px;
            border-left: 4px solid #ffc107;
            background: #f8f9fa;
        }

        .step-number {
            display: table-cell;
            width: 40px;
            vertical-align: middle;
        }

        .step-circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #ffc107;
            color: #1a237e;
            text-align: center;
            line-height: 30px;
            font-weight: bold;
        }

        .step-content {
            display: table-cell;
            padding-left: 15px;
            vertical-align: middle;
        }

        .step-title {
            font-weight: bold;
            color: #1a237e;
            margin-bottom: 5px;
        }

        /* Content Pages */
        .content-page {
            padding: 40px;
            min-height: 90vh;
        }

        .step-header {
            display: table;
            width: 100%;
            margin-bottom: 30px;
        }

        .step-indicator {
            display: table-cell;
            width: 100px;
            vertical-align: top;
        }

        .step-circles {
            display: table;
            width: 100%;
        }

        .circle {
            display: table-cell;
            width: 20%;
            text-align: center;
        }

        .step-circle-large {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0 auto;
            text-align: center;
            line-height: 40px;
            font-weight: bold;
            color: white;
        }

        .circle.active .step-circle-large {
            background: #ffc107;
            color: #1a237e;
        }

        .circle.inactive .step-circle-large {
            background: #e0e0e0;
            color: #999;
        }

        .main-content {
            display: table-cell;
            padding-left: 40px;
            vertical-align: top;
        }

        .content-title {
            font-size: 28px;
            font-weight: bold;
            color: #1a237e;
            margin-bottom: 20px;
        }

        /* Charts and Data Visualization */
        .chart-container {
            margin: 30px 0;
            text-align: center;
        }

        .pie-chart {
            display: inline-block;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            position: relative;
            margin: 20px;
        }

        .pie-chart.unable-prove {
            background: conic-gradient(#1a237e 0% 48%, #ffc107 48% 100%);
            background: #1a237e; /* Fallback for DomPDF */
        }

        .chart-label {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            font-weight: bold;
            color: white;
        }

        .bar-chart {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .bar-item {
            display: table;
            width: 100%;
            margin: 10px 0;
        }

        .bar-label {
            display: table-cell;
            width: 200px;
            padding-right: 15px;
            vertical-align: middle;
            font-weight: 500;
        }

        .bar-visual {
            display: table-cell;
            vertical-align: middle;
        }

        .bar-fill {
            height: 25px;
            background: #1a237e;
            border-radius: 4px;
            position: relative;
        }

        .bar-value {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-weight: bold;
            font-size: 12px;
        }

        /* Two-column layout using tables */
        .two-column {
            display: table;
            width: 100%;
            margin: 20px 0;
        }

        .column {
            display: table-cell;
            width: 50%;
            padding: 0 15px;
            vertical-align: top;
        }

        .challenge-box {
            background: #e3f2fd;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #1976d2;
            margin: 15px 0;
        }

        .action-box {
            background: #fff3e0;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
            margin: 15px 0;
        }

        .box-title {
            font-weight: bold;
            color: #1a237e;
            margin-bottom: 10px;
        }

        /* Stakeholder Template */
        .stakeholder-grid {
            display: table;
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .stakeholder-row {
            display: table-row;
        }

        .stakeholder-cell {
            display: table-cell;
            border: 1px solid #ddd;
            padding: 15px;
            text-align: center;
            vertical-align: middle;
        }

        .stakeholder-header {
            background: #1a237e;
            color: white;
            font-weight: bold;
        }

        .sentiment-positive {
            background: #4caf50;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
        }

        .sentiment-negative {
            background: #f44336;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
        }

        .sentiment-neutral {
            background: #ff9800;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
        }

        /* Footer */
        .page-footer {
            position: fixed;
            bottom: 20px;
            right: 40px;
            font-size: 10px;
            color: #666;
        }

        .gartner-branding {
            position: fixed;
            bottom: 20px;
            left: 40px;
            font-size: 10px;
            color: #1a237e;
            font-weight: bold;
        }
        ";
    }

    /**
     * Generate the cover page matching Gartner's design
     */
    private function getCoverPage()
    {
        return "
        <div class=\"cover-page\">
            <div class=\"cover-network\"></div>
            <div class=\"gartner-logo\">Gartner</div>
            <div class=\"cover-title\">{$this->data['title']}</div>
            <div class=\"cover-subtitle\">{$this->data['subtitle']}</div>
        </div>";
    }

    /**
     * Generate the summary page with key statistics
     */
    private function getSummaryPage()
    {
        $stats = $this->data['statistics'];

        return "
        <div class=\"summary-page\">
            <div class=\"section-title\">Only half of marketing leaders can prove value and receive credit</div>

            <p>The 2024 Gartner Marketing Analytics and Technology Survey indicates that proving the value of marketing and receiving credit for business outcomes is a common challenge, with nearly half of marketing leaders feeling it's out of reach.</p>

            <div class=\"key-stats\">
                <div class=\"stat-row\">
                    <div class=\"stat-cell\">
                        <div class=\"stat-number\">{$stats['unable_to_prove']}%</div>
                        <div class=\"stat-label\">Unable to prove value and/or don't get credit</div>
                    </div>
                    <div class=\"stat-cell\">
                        <div class=\"stat-number\">{$stats['able_to_prove']}%</div>
                        <div class=\"stat-label\">Able to prove value and get credit</div>
                    </div>
                </div>
            </div>

            <div class=\"chart-container\">
                <div class=\"pie-chart unable-prove\">
                    <div class=\"chart-label\">{$stats['unable_to_prove']}%</div>
                </div>
            </div>

            <div class=\"section-title\">5 steps to success for CMOs</div>

            <div class=\"steps-overview\">";

        foreach ($this->data['steps'] as $step) {
            $html .= "
                <div class=\"step-item\">
                    <div class=\"step-number\">
                        <div class=\"step-circle\">{$step['number']}</div>
                    </div>
                    <div class=\"step-content\">
                        <div class=\"step-title\">{$step['title']}</div>
                    </div>
                </div>";
        }

        $html .= "
            </div>
        </div>";

        return $html;
    }

    /**
     * Generate content pages for each step
     */
    private function getContentPages()
    {
        $html = '';

        foreach ($this->data['steps'] as $index => $step) {
            $html .= '<div class="page-break"></div>';
            $html .= $this->getStepPage($step, $index + 1);
        }

        return $html;
    }

    /**
     * Generate individual step page
     */
    private function getStepPage($step, $currentStep)
    {
        $html = "
        <div class=\"content-page\">
            <div class=\"step-header\">
                <div class=\"step-indicator\">
                    <div class=\"step-circles\">";

        // Generate step indicator circles
        for ($i = 1; $i <= 5; $i++) {
            $class = ($i == $currentStep) ? 'active' : 'inactive';
            $html .= "
                        <div class=\"circle {$class}\">
                            <div class=\"step-circle-large\">{$i}</div>
                        </div>";
        }

        $html .= "
                    </div>
                </div>
                <div class=\"main-content\">
                    <div class=\"content-title\">{$step['title']}</div>
                </div>
            </div>";

        // Add specific content based on step
        switch ($currentStep) {
            case 1:
                $html .= $this->getStep1Content($step);
                break;
            case 2:
                $html .= $this->getStep2Content($step);
                break;
            case 3:
                $html .= $this->getStep3Content($step);
                break;
            case 4:
                $html .= $this->getStep4Content($step);
                break;
            case 5:
                $html .= $this->getStep5Content($step);
                break;
        }

        $html .= "
        </div>";

        return $html;
    }

    /**
     * Step 1 specific content with metrics
     */
    private function getStep1Content($step)
    {
        $metrics = $step['metrics'];

        return "
            <div class=\"two-column\">
                <div class=\"column\">
                    <div class=\"challenge-box\">
                        <div class=\"box-title\">The challenge and opportunity</div>
                        <p>CMOs who adopt a long-term, holistic view are more successful in proving marketing's value and gaining credit. In contrast, only 30% of those focusing on short-term initiatives reported success.</p>
                    </div>
                </div>
                <div class=\"column\">
                    <div class=\"bar-chart\">
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Holistic, longer-term focus</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$metrics['holistic_long_term']}%;\">
                                    <div class=\"bar-value\">{$metrics['holistic_long_term']}%</div>
                                </div>
                            </div>
                        </div>
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Holistic, shorter-term focus</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$metrics['holistic_short_term']}%;\">
                                    <div class=\"bar-value\">{$metrics['holistic_short_term']}%</div>
                                </div>
                            </div>
                        </div>
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Individual, longer-term focus</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$metrics['individual_long_term']}%;\">
                                    <div class=\"bar-value\">{$metrics['individual_long_term']}%</div>
                                </div>
                            </div>
                        </div>
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Individual, shorter-term focus</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$metrics['individual_short_term']}%;\">
                                    <div class=\"bar-value\">{$metrics['individual_short_term']}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";
    }

    /**
     * Step 2 content with stakeholder analysis
     */
    private function getStep2Content($step)
    {
        return "
            <div class=\"two-column\">
                <div class=\"column\">
                    <p>{$step['description']}</p>
                    <p>CMOs aiming to foster a strong relationship with their CEO and CFO should understand their main priorities and views on marketing.</p>
                </div>
                <div class=\"column\">
                    <div class=\"bar-chart\">
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Chief financial officer (CFO)</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: 40%;\">
                                    <div class=\"bar-value\">40%</div>
                                </div>
                            </div>
                        </div>
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Chief executive officer (CEO)</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: 39%;\">
                                    <div class=\"bar-value\">39%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class=\"stakeholder-grid\">
                <div class=\"stakeholder-row\">
                    <div class=\"stakeholder-cell stakeholder-header\">Stakeholder</div>
                    <div class=\"stakeholder-cell stakeholder-header\">CEO</div>
                    <div class=\"stakeholder-cell stakeholder-header\">CFO</div>
                    <div class=\"stakeholder-cell stakeholder-header\">BU Heads</div>
                    <div class=\"stakeholder-cell stakeholder-header\">Sales & Service Heads</div>
                </div>
                <div class=\"stakeholder-row\">
                    <div class=\"stakeholder-cell\"><strong>Perception of marketing</strong></div>
                    <div class=\"stakeholder-cell\"><span class=\"sentiment-positive\">Champion</span></div>
                    <div class=\"stakeholder-cell\"><span class=\"sentiment-negative\">Skeptic</span></div>
                    <div class=\"stakeholder-cell\"><span class=\"sentiment-neutral\">Neutral</span></div>
                    <div class=\"stakeholder-cell\"><span class=\"sentiment-negative\">Skeptic</span></div>
                </div>
                <div class=\"stakeholder-row\">
                    <div class=\"stakeholder-cell\"><strong>Influence</strong></div>
                    <div class=\"stakeholder-cell\">High</div>
                    <div class=\"stakeholder-cell\">High</div>
                    <div class=\"stakeholder-cell\">High</div>
                    <div class=\"stakeholder-cell\">High</div>
                </div>
            </div>";
    }

    /**
     * Step 3 content with metric sophistication
     */
    private function getStep3Content($step)
    {
        $metrics = $step['metrics'];

        return "
            <div class=\"two-column\">
                <div class=\"column\">
                    <p>The 2024 Gartner survey found that using a variety of metrics makes it 26% more likely to prove value and get credit. However, it's not just about variety; it's the quality of the metrics that matters.</p>

                    <div class=\"action-box\">
                        <div class=\"box-title\">The survey assessed marketing leaders' use of three high-complexity metrics:</div>
                        <ul style=\"margin: 10px 0; padding-left: 20px;\">
                            <li>Relationship</li>
                            <li>Return on transactional</li>
                            <li>Operational</li>
                        </ul>
                    </div>
                </div>
                <div class=\"column\">
                    <div class=\"bar-chart\">
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">No high-complexity metrics</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$metrics['no_high_complexity']}%;\">
                                    <div class=\"bar-value\">{$metrics['no_high_complexity']}%</div>
                                </div>
                            </div>
                        </div>
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">At least one high-complexity metric</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$metrics['high_complexity']}%; background: #4caf50;\">
                                    <div class=\"bar-value\">{$metrics['high_complexity']}%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style=\"text-align: center; margin-top: 20px; font-size: 18px; font-weight: bold; color: #4caf50;\">
                        1.5x more likely to prove value and get credit
                    </div>
                </div>
            </div>";
    }

    /**
     * Step 4 content
     */
    private function getStep4Content($step)
    {
        return "
            <div class=\"two-column\">
                <div class=\"column\">
                    <p>{$step['description']}</p>
                    <p>CMO and senior marketing leader participation in a high number of D&A activities, particularly managing a D&A function, is vital to proving value and getting credit.</p>

                    <div class=\"action-box\">
                        <div class=\"box-title\">Analytical activities in the survey included:</div>
                        <ul style=\"margin: 10px 0; padding-left: 20px;\">
                            <li>Managing a team of marketing data analysts</li>
                            <li>Creating a marketing dashboard</li>
                            <li>Building custom reports from raw marketing data</li>
                            <li>Developing measurement strategies for marketing activities</li>
                            <li>Synthesizing quantitative data to inform marketing strategies or tactics</li>
                        </ul>
                    </div>
                </div>
                <div class=\"column\">
                    <div class=\"bar-chart\">
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Low number of activities (current role)</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: 44%;\">
                                    <div class=\"bar-value\">44%</div>
                                </div>
                            </div>
                        </div>
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">High number of activities (current role)</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: 60%; background: #4caf50;\">
                                    <div class=\"bar-value\">60%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style=\"text-align: center; margin-top: 20px; font-size: 16px; font-weight: bold; color: #4caf50;\">
                        Those who did a high number of activities were 1.4x more likely to be able to prove value and get credit.
                    </div>
                </div>
            </div>";
    }

    /**
     * Step 5 content with talent gaps
     */
    private function getStep5Content($step)
    {
        $barriers = $step['barriers'];

        return "
            <div class=\"two-column\">
                <div class=\"column\">
                    <p>Talent gaps present the biggest barriers to proving the value of marketing. For CMOs, lacking the right talent affects how the C-suite perceives marketing's value and impacts investment in marketing D&A.</p>

                    <div class=\"action-box\">
                        <div class=\"box-title\">CMOs should develop adaptive capabilities including:</div>
                        <ul style=\"margin: 10px 0; padding-left: 20px;\">
                            <li><strong>Soft skills and competencies.</strong> Marketing leaders must tell a consistent, credible story to help the CFO understand how budget and talent investment decisions support marketing's purpose, value and ability to drive growth.</li>
                            <li><strong>Analytical talent.</strong> CMOs must invest in continuous training and development to help bridge the analytical talent gap as key to enhancing decision-making capabilities.</li>
                            <li><strong>Technical talent.</strong> CMOs must focus on recruiting and upskilling technical talent capable of leveraging advanced marketing technologies and ensuring seamless data integration.</li>
                        </ul>
                    </div>
                </div>
                <div class=\"column\">
                    <div class=\"bar-chart\">
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Lack of necessary soft skills/competencies</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$barriers['soft_skills']}%; background: #f44336;\">
                                    <div class=\"bar-value\">{$barriers['soft_skills']}%</div>
                                </div>
                            </div>
                        </div>
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Lack of analytical talent to analyze data and generate insight</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$barriers['analytical_talent']}%; background: #ff9800;\">
                                    <div class=\"bar-value\">{$barriers['analytical_talent']}%</div>
                                </div>
                            </div>
                        </div>
                        <div class=\"bar-item\">
                            <div class=\"bar-label\">Lack of technical talent to integrate and analyze data</div>
                            <div class=\"bar-visual\">
                                <div class=\"bar-fill\" style=\"width: {$barriers['technical_talent']}%; background: #9c27b0;\">
                                    <div class=\"bar-value\">{$barriers['technical_talent']}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";
    }

    /**
     * Save PDF to file
     */
    public function saveToPDF($filename = 'gartner_cmo_playbook.pdf')
    {
        $output = $this->generate();
        file_put_contents($filename, $output);
        return $filename;
    }

    /**
     * Output PDF to browser
     */
    public function streamToBrowser($filename = 'gartner_cmo_playbook.pdf')
    {
        $this->dompdf->stream($filename, ['Attachment' => false]);
    }
}

// Usage example
try {
    $generator = new GartnerPDFGenerator();

    // Generate and save to file
    $filename = $generator->saveToPDF('gartner_cmo_playbook_clone.pdf');
    echo "PDF generated successfully: {$filename}\n";

    // Or stream directly to browser (uncomment for web use)
    // $generator->streamToBrowser();

} catch (Exception $e) {
    echo "Error generating PDF: " . $e->getMessage() . "\n";
}

?>
