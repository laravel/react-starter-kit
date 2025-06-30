<?php

/**
 * File Location: app/Services/GartnerPDFService.php
 *
 * This service generates professional PDF replicas of the Gartner CMO Value Playbook
 * using Laravel and browser-based PDF generation for maximum quality.
 *
 * Installation Requirements:
 * 1. composer require spatie/browsershot
 * 2. Install Node.js and npm on your server
 * 3. npm install -g puppeteer
 *
 * Usage in Controller:
 * $service = new GartnerPDFService();
 * return $service->generatePDF();
 */

namespace App\Services;

use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;

class GartnerPDFService
{
    private array $data;

    public function __construct()
    {
        // Sample data structure - in real usage, this would come from your database
        // You might inject this through the constructor or load it from a model
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
     * Generate PDF and return as download response
     * This method orchestrates the entire PDF generation process
     */
    public function generatePDF(): Response
    {
        // Generate the complete HTML content
        $html = $this->buildCompleteHTML();

        try {
            // Create Browsershot instance with proper timeout and paper size settings
            $browsershot = Browsershot::html($html)
                ->format('A4') // Use standard A4 format instead of custom dimensions
                ->margins(0, 0, 0, 0) // No margins for full-bleed design
                ->printBackground() // Include CSS backgrounds and colors
                ->waitUntilNetworkIdle() // Wait for any fonts or resources to load
                ->timeout(120) // Increase timeout to 2 minutes for complex rendering
                ->setDelay(1000) // Wait 1 second after page load before PDF generation
                ->emulateMedia('print') // Use print media queries if any
                ->setOption('addStyleTag', json_encode(['content' => 'body { -webkit-print-color-adjust: exact; }'])) // Ensure colors print
                ->setOption('args', ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']); // Stability options for server environments

            // Only set Chrome path if we found a valid one
            $chromePath = $this->getChromePath();
            if ($chromePath !== null) {
                $browsershot->setChromePath($chromePath);
            }
            // If $chromePath is null, Browsershot will auto-detect Chrome

            $pdf = $browsershot->pdf();

            // Return as downloadable response
            return response($pdf, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="gartner_cmo_playbook.pdf"'
            ]);

        } catch (\Exception $e) {
            // Handle errors gracefully - in production, you'd log this
            throw new \Exception("Failed to generate PDF: " . $e->getMessage());
        }
    }

    /**
     * Alternative method: Save PDF to storage and return path
     * Useful if you want to store the PDF for later use or email it
     */
    public function savePDF(string $filename = null): string
    {
        $filename = $filename ?? 'gartner_playbook_' . now()->format('Y-m-d_H-i-s') . '.pdf';
        $html = $this->buildCompleteHTML();

        $browsershot = Browsershot::html($html)
            ->format('A4')
            ->margins(0, 0, 0, 0)
            ->printBackground()
            ->waitUntilNetworkIdle()
            ->timeout(120)
            ->setDelay(1000)
            ->emulateMedia('print')
            ->setOption('addStyleTag', json_encode(['content' => 'body { -webkit-print-color-adjust: exact; }']))
            ->setOption('args', ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']);

        // Only set Chrome path if we found a valid one
        $chromePath = $this->getChromePath();
        if ($chromePath !== null) {
            $browsershot->setChromePath($chromePath);
        }

        $pdf = $browsershot->pdf();

        // Save to Laravel's storage system
        Storage::disk('public')->put("pdfs/{$filename}", $pdf);

        return "pdfs/{$filename}";
    }

    /**
     * Generate preview HTML for browser viewing
     * This allows you to test and preview the design before generating PDF
     */
    public function generatePreview(): string
    {
        return $this->buildCompleteHTML();
    }

    /**
     * Build the complete HTML document with all styling and content
     * This is where the magic happens - we create a complete web page
     * that looks exactly like the Gartner document
     */
    private function buildCompleteHTML(): string
    {
        // Get all the component parts
        $css = $this->getAdvancedCSS();
        $coverPage = $this->generateCoverPage();
        $summaryPage = $this->generateSummaryPage();
        $stepPages = $this->generateStepPages();

        // Combine everything into a complete HTML document
        return "
        <!DOCTYPE html>
        <html lang=\"en\">
        <head>
            <meta charset=\"UTF-8\">
            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
            <title>{$this->data['title']}</title>
            <style>{$css}</style>
        </head>
        <body>
            {$coverPage}
            {$summaryPage}
            {$stepPages}
        </body>
        </html>";
    }

    /**
     * Professional CSS styling optimized for modern browser PDF generation
     * This CSS uses all the advanced features that make the replica look professional
     */
    private function getAdvancedCSS(): string
    {
        return "
        /* Reset and base styles for consistent rendering */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Professional typography stack */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #2c3e50;
            background: white;
        }

        /* Page structure for perfect print layout */
        .page {
            width: 8.5in;
            min-height: 11in;
            margin: 0 auto;
            background: white;
            position: relative;
            page-break-after: always;
            overflow: hidden;
        }

        .page:last-child {
            page-break-after: avoid;
        }

        /* Cover page with Gartner's signature blue gradient */
        .cover-page {
            background: linear-gradient(135deg, #1a237e 0%, #283593 25%, #3949ab 75%, #5c6bc0 100%);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 80px 60px;
            position: relative;
        }

        /* Network pattern background using pure CSS */
        .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
                radial-gradient(circle at 20% 25%, rgba(255, 193, 7, 0.4) 3px, transparent 3px),
                radial-gradient(circle at 80% 35%, rgba(255, 193, 7, 0.3) 4px, transparent 4px),
                radial-gradient(circle at 40% 70%, rgba(0, 188, 212, 0.4) 3px, transparent 3px),
                radial-gradient(circle at 90% 80%, rgba(0, 188, 212, 0.3) 2px, transparent 2px);
            background-size: 120px 120px, 180px 180px, 150px 150px, 100px 100px;
            opacity: 0.7;
            pointer-events: none;
        }

        .gartner-logo {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 60px;
            z-index: 10;
            position: relative;
        }

        .cover-title {
            font-size: 64px;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 24px;
            z-index: 10;
            position: relative;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .cover-subtitle {
            font-size: 24px;
            font-weight: 400;
            opacity: 0.95;
            z-index: 10;
            position: relative;
            max-width: 600px;
        }

        /* Content pages with professional spacing */
        .content-page {
            padding: 60px;
        }

        .section-title {
            font-size: 28px;
            font-weight: 700;
            color: #1a237e;
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .section-subtitle {
            font-size: 16px;
            color: #546e7a;
            margin-bottom: 32px;
            line-height: 1.6;
        }

        /* Statistics layout using CSS Grid for perfect alignment */
        .stats-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin: 40px 0;
            align-items: center;
        }

        .stat-card {
            text-align: center;
            padding: 32px;
            border-radius: 12px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 1px solid #dee2e6;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .stat-number {
            font-size: 72px;
            font-weight: 800;
            color: #1a237e;
            line-height: 1;
            margin-bottom: 12px;
        }

        .stat-label {
            font-size: 16px;
            color: #495057;
            font-weight: 500;
        }

        /* Professional pie chart using conic-gradient */
        .chart-container {
            display: flex;
            justify-content: center;
            margin: 48px 0;
        }

        .pie-chart {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: conic-gradient(#1a237e 0% 48%, #ffc107 48% 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: 0 8px 32px rgba(26, 35, 126, 0.3);
        }

        .chart-label {
            font-size: 48px;
            font-weight: 800;
            color: white;
            text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        /* Modern card design for steps overview */
        .steps-overview {
            margin: 48px 0;
        }

        .step-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding: 24px;
            background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
            border-radius: 12px;
            border-left: 6px solid #ffc107;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        .step-number {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
            color: #1a237e;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 20px;
            margin-right: 24px;
            box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
        }

        .step-content {
            flex: 1;
        }

        .step-title {
            font-size: 18px;
            font-weight: 600;
            color: #1a237e;
            line-height: 1.4;
        }

        /* Individual step pages with progress indicators */
        .step-page {
            padding: 60px;
        }

        .step-header {
            display: flex;
            align-items: flex-start;
            margin-bottom: 48px;
            gap: 48px;
        }

        .progress-indicator {
            display: flex;
            gap: 16px;
            align-items: center;
        }

        .progress-circle {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
        }

        .progress-circle.active {
            background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
            color: #1a237e;
            box-shadow: 0 4px 16px rgba(255, 193, 7, 0.4);
            transform: scale(1.1);
        }

        .progress-circle.inactive {
            background: #e9ecef;
            color: #6c757d;
        }

        .step-main-title {
            font-size: 36px;
            font-weight: 700;
            color: #1a237e;
            line-height: 1.2;
            flex: 1;
        }

        /* Two-column content layout */
        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            margin: 32px 0;
        }

        .content-card {
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .challenge-card {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-left: 6px solid #2196f3;
        }

        .action-card {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border-left: 6px solid #ffc107;
        }

        .card-title {
            font-size: 18px;
            font-weight: 700;
            color: #1a237e;
            margin-bottom: 16px;
        }

        .card-content {
            font-size: 15px;
            line-height: 1.6;
            color: #37474f;
        }

        /* Professional bar charts with gradients */
        .bar-chart {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 32px;
            border-radius: 12px;
            margin: 24px 0;
        }

        .bar-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            gap: 16px;
        }

        .bar-label {
            min-width: 200px;
            font-weight: 500;
            font-size: 14px;
            color: #495057;
        }

        .bar-track {
            flex: 1;
            height: 32px;
            background: #dee2e6;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
        }

        .bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #1a237e 0%, #3949ab 100%);
            border-radius: 16px;
            position: relative;
        }

        .bar-value {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-weight: 700;
            font-size: 14px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        /* Stakeholder table with modern design */
        .stakeholder-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin: 32px 0;
        }

        .stakeholder-table th {
            background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
            color: white;
            padding: 20px;
            font-weight: 700;
            text-align: center;
            font-size: 16px;
        }

        .stakeholder-table td {
            padding: 16px 20px;
            text-align: center;
            border-bottom: 1px solid #e9ecef;
            background: white;
        }

        .stakeholder-table tr:nth-child(even) td {
            background: #f8f9fa;
        }

        .sentiment-badge {
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .sentiment-positive { background: #4caf50; color: white; }
        .sentiment-negative { background: #f44336; color: white; }
        .sentiment-neutral { background: #ff9800; color: white; }

        /* Highlight boxes for key insights */
        .highlight-box {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
        }

        .highlight-text {
            font-size: 20px;
            font-weight: 700;
            color: #2e7d32;
        }

        /* List styling for professional bullet points */
        .content-list {
            list-style: none;
            padding-left: 0;
        }

        .content-list li {
            position: relative;
            padding-left: 24px;
            margin-bottom: 12px;
            line-height: 1.6;
        }

        .content-list li::before {
            content: '•';
            color: #ffc107;
            font-weight: bold;
            position: absolute;
            left: 0;
            font-size: 16px;
        }

        /* Print optimization */
        @media print {
            body { margin: 0; }
            .page { margin: 0; width: 100%; min-height: 100vh; }
        }
        ";
    }

    /**
     * Generate the professional cover page
     */
    private function generateCoverPage(): string
    {
        return "
        <div class=\"page cover-page\">
            <div class=\"gartner-logo\">Gartner</div>
            <div class=\"cover-title\">{$this->data['title']}</div>
            <div class=\"cover-subtitle\">{$this->data['subtitle']}</div>
        </div>";
    }

    /**
     * Generate the summary page with key statistics
     */
    private function generateSummaryPage(): string
    {
        $stats = $this->data['statistics'];

        $stepsHTML = '';
        foreach ($this->data['steps'] as $step) {
            $stepsHTML .= "
                <div class=\"step-item\">
                    <div class=\"step-number\">{$step['number']}</div>
                    <div class=\"step-content\">
                        <div class=\"step-title\">{$step['title']}</div>
                    </div>
                </div>";
        }

        return "
        <div class=\"page content-page\">
            <div class=\"section-title\">Only half of marketing leaders can prove value and receive credit</div>
            <div class=\"section-subtitle\">
                The 2024 Gartner Marketing Analytics and Technology Survey indicates that proving the value of marketing and
                receiving credit for business outcomes is a common challenge, with nearly half of marketing leaders feeling it's out of reach.
            </div>

            <div class=\"stats-container\">
                <div class=\"stat-card\">
                    <div class=\"stat-number\">{$stats['unable_to_prove']}%</div>
                    <div class=\"stat-label\">Unable to prove value and/or don't get credit</div>
                </div>
                <div class=\"stat-card\">
                    <div class=\"stat-number\">{$stats['able_to_prove']}%</div>
                    <div class=\"stat-label\">Able to prove value and get credit</div>
                </div>
            </div>

            <div class=\"chart-container\">
                <div class=\"pie-chart\">
                    <div class=\"chart-label\">{$stats['unable_to_prove']}%</div>
                </div>
            </div>

            <div class=\"section-title\">5 steps to success for CMOs</div>
            <div class=\"steps-overview\">
                {$stepsHTML}
            </div>
        </div>";
    }

    /**
     * Generate all individual step pages
     */
    private function generateStepPages(): string
    {
        $pagesHTML = '';

        foreach ($this->data['steps'] as $index => $step) {
            $pagesHTML .= $this->generateStepPage($step, $index + 1);
        }

        return $pagesHTML;
    }

    /**
     * Generate an individual step page with progress indicator and proper page breaks
     */
    private function generateStepPage(array $step, int $currentStep): string
    {
        // Generate progress circles
        $progressHTML = '';
        for ($i = 1; $i <= 5; $i++) {
            $class = ($i == $currentStep) ? 'active' : 'inactive';
            $progressHTML .= "<div class=\"progress-circle {$class}\">{$i}</div>";
        }

        // Generate step-specific content
        $contentHTML = $this->generateStepContent($step, $currentStep);

        return "
        <div class=\"page step-page\">
            <div class=\"step-header\">
                <div class=\"progress-indicator\">
                    {$progressHTML}
                </div>
                <div class=\"step-main-title\">{$step['title']}</div>
            </div>
            <div class=\"step-content-area\">
                {$contentHTML}
            </div>
        </div>";
    }

    /**
     * Generate content specific to each step based on the step number
     */
    private function generateStepContent(array $step, int $stepNumber): string
    {
        switch($stepNumber) {
            case 1:
                return $this->generateStep1Content($step);
            case 2:
                return $this->generateStep2Content($step);
            case 3:
                return $this->generateStep3Content($step);
            case 4:
                return $this->generateStep4Content($step);
            case 5:
                return $this->generateStep5Content($step);
            default:
                return '';
        }
    }

    /**
     * Step 1: Focus on long-term, holistic impact - compact version
     */
    private function generateStep1Content(array $step): string
    {
        $metrics = $step['metrics'];

        return "
        <div class=\"content-grid\">
            <div class=\"content-card challenge-card\">
                <div class=\"card-title\">The challenge and opportunity</div>
                <div class=\"card-content\">
                    CMOs who adopt a long-term, holistic view are more successful in proving marketing's value
                    and gaining credit. Only 30% of those focusing on short-term initiatives reported success.
                </div>
            </div>
            <div class=\"bar-chart\">
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Holistic, longer-term focus</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: {$metrics['holistic_long_term']}%;\">
                            <div class=\"bar-value\">{$metrics['holistic_long_term']}%</div>
                        </div>
                    </div>
                </div>
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Holistic, shorter-term focus</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: {$metrics['holistic_short_term']}%;\">
                            <div class=\"bar-value\">{$metrics['holistic_short_term']}%</div>
                        </div>
                    </div>
                </div>
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Individual, longer-term focus</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: {$metrics['individual_long_term']}%;\">
                            <div class=\"bar-value\">{$metrics['individual_long_term']}%</div>
                        </div>
                    </div>
                </div>
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Individual, shorter-term focus</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: {$metrics['individual_short_term']}%;\">
                            <div class=\"bar-value\">{$metrics['individual_short_term']}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>";
    }

    /**
     * Step 2: Build narrative for stakeholders
     */
    private function generateStep2Content(array $step): string
    {
        return "
        <div class=\"content-grid\">
            <div class=\"content-card challenge-card\">
                <div class=\"card-title\">Understanding stakeholder perspectives</div>
                <div class=\"card-content\">
                    {$step['description']} CMOs aiming to foster a strong relationship with their CEO and CFO
                    should understand their main priorities and views on marketing.
                </div>
            </div>
            <div class=\"bar-chart\">
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Chief financial officer (CFO)</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: 40%;\">
                            <div class=\"bar-value\">40%</div>
                        </div>
                    </div>
                </div>
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Chief executive officer (CEO)</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: 39%;\">
                            <div class=\"bar-value\">39%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <table class=\"stakeholder-table\">
            <thead>
                <tr>
                    <th>Stakeholder</th>
                    <th>CEO</th>
                    <th>CFO</th>
                    <th>BU Heads</th>
                    <th>Sales & Service Heads</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Perception of marketing</strong></td>
                    <td><span class=\"sentiment-badge sentiment-positive\">Champion</span></td>
                    <td><span class=\"sentiment-badge sentiment-negative\">Skeptic</span></td>
                    <td><span class=\"sentiment-badge sentiment-neutral\">Neutral</span></td>
                    <td><span class=\"sentiment-badge sentiment-negative\">Skeptic</span></td>
                </tr>
                <tr>
                    <td><strong>Influence</strong></td>
                    <td>High</td>
                    <td>High</td>
                    <td>High</td>
                    <td>High</td>
                </tr>
            </tbody>
        </table>";
    }

    /**
     * Step 3: Increase metric sophistication
     */
    private function generateStep3Content(array $step): string
    {
        $metrics = $step['metrics'];

        return "
        <div class=\"content-grid\">
            <div class=\"content-card challenge-card\">
                <div class=\"card-title\">Quality over quantity in metrics</div>
                <div class=\"card-content\">
                    The 2024 Gartner survey found that using a variety of metrics makes it 26% more likely to prove value and get credit.
                    However, it's not just about variety; it's the quality of the metrics that matters.
                </div>
                <div class=\"content-card action-card\" style=\"margin-top: 24px;\">
                    <div class=\"card-title\">The survey assessed marketing leaders' use of three high-complexity metrics:</div>
                    <ul class=\"content-list\">
                        <li>Relationship</li>
                        <li>Return on transactional</li>
                        <li>Operational</li>
                    </ul>
                </div>
            </div>
            <div>
                <div class=\"bar-chart\">
                    <div class=\"bar-item\">
                        <div class=\"bar-label\">No high-complexity metrics</div>
                        <div class=\"bar-track\">
                            <div class=\"bar-fill\" style=\"width: {$metrics['no_high_complexity']}%;\">
                                <div class=\"bar-value\">{$metrics['no_high_complexity']}%</div>
                            </div>
                        </div>
                    </div>
                    <div class=\"bar-item\">
                        <div class=\"bar-label\">At least one high-complexity metric</div>
                        <div class=\"bar-track\">
                            <div class=\"bar-fill\" style=\"width: {$metrics['high_complexity']}%; background: linear-gradient(90deg, #4caf50 0%, #66bb6a 100%);\">
                                <div class=\"bar-value\">{$metrics['high_complexity']}%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=\"highlight-box\">
                    <div class=\"highlight-text\">1.5x more likely to prove value and get credit</div>
                </div>
            </div>
        </div>";
    }

    /**
     * Step 4: Expand D&A leadership involvement - compact version
     */
    private function generateStep4Content(array $step): string
    {
        return "
        <div class=\"content-grid\">
            <div class=\"content-card challenge-card\">
                <div class=\"card-title\">Leadership makes the difference</div>
                <div class=\"card-content\">
                    {$step['description']} CMO and senior marketing leader participation in high D&A activities,
                    particularly managing a D&A function, is vital to proving value and getting credit.
                </div>
                <div class=\"content-card action-card\" style=\"margin-top: 12px; padding: 12px;\">
                    <div class=\"card-title\">Analytical activities included:</div>
                    <ul class=\"content-list\">
                        <li>Managing marketing data analysts</li>
                        <li>Creating marketing dashboards</li>
                        <li>Building custom reports from raw data</li>
                        <li>Developing measurement strategies</li>
                        <li>Synthesizing data to inform strategies</li>
                    </ul>
                </div>
            </div>
            <div>
                <div class=\"bar-chart\">
                    <div class=\"bar-item\">
                        <div class=\"bar-label\">Low number of activities (current role)</div>
                        <div class=\"bar-track\">
                            <div class=\"bar-fill\" style=\"width: 44%;\">
                                <div class=\"bar-value\">44%</div>
                            </div>
                        </div>
                    </div>
                    <div class=\"bar-item\">
                        <div class=\"bar-label\">High number of activities (current role)</div>
                        <div class=\"bar-track\">
                            <div class=\"bar-fill\" style=\"width: 60%; background: linear-gradient(90deg, #4caf50 0%, #66bb6a 100%);\">
                                <div class=\"bar-value\">60%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=\"highlight-box\">
                    <div class=\"highlight-text\">1.4x more likely to prove value and get credit</div>
                </div>
            </div>
        </div>";
    }

    /**
     * Step 5: Invest in marketing talent - ultra-compact version
     */
    private function generateStep5Content(array $step): string
    {
        $barriers = $step['barriers'];

        return "
        <div class=\"content-grid\">
            <div class=\"content-card challenge-card\">
                <div class=\"card-title\">Closing the talent gap</div>
                <div class=\"card-content\">
                    Talent gaps present the biggest barriers to proving marketing value. Lacking the right talent
                    affects how the C-suite perceives marketing's value and impacts D&A investment.
                </div>
                <div class=\"content-card action-card\" style=\"margin-top: 10px; padding: 12px;\">
                    <div class=\"card-title\">CMOs should develop adaptive capabilities:</div>
                    <ul class=\"content-list\">
                        <li><strong>Soft skills:</strong> Tell credible stories to help CFOs understand investment value.</li>
                        <li><strong>Analytical talent:</strong> Invest in training to bridge gaps and enhance decisions.</li>
                        <li><strong>Technical talent:</strong> Recruit and upskill talent for advanced technologies.</li>
                    </ul>
                </div>
            </div>
            <div class=\"bar-chart\">
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Lack of soft skills/competencies</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: {$barriers['soft_skills']}%; background: linear-gradient(90deg, #f44336 0%, #ef5350 100%);\">
                            <div class=\"bar-value\">{$barriers['soft_skills']}%</div>
                        </div>
                    </div>
                </div>
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Lack of analytical talent</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: {$barriers['analytical_talent']}%; background: linear-gradient(90deg, #ff9800 0%, #ffb74d 100%);\">
                            <div class=\"bar-value\">{$barriers['analytical_talent']}%</div>
                        </div>
                    </div>
                </div>
                <div class=\"bar-item\">
                    <div class=\"bar-label\">Lack of technical talent</div>
                    <div class=\"bar-track\">
                        <div class=\"bar-fill\" style=\"width: {$barriers['technical_talent']}%; background: linear-gradient(90deg, #9c27b0 0%, #ba68c8 100%);\">
                            <div class=\"bar-value\">{$barriers['technical_talent']}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>";
    }

    /**
     * Helper method to find Chrome/Chromium path for different systems
     * This method tries to locate Chrome in common installation directories
     * and provides helpful debugging information when Chrome isn't found
     */
    private function getChromePath(): ?string
    {
        // Build paths dynamically to avoid PHP string parsing issues
        // This approach is more robust and handles different operating systems properly
        $paths = [];

        // Linux paths (Ubuntu, Debian, CentOS, etc.)
        $paths[] = '/usr/bin/google-chrome-stable';    // Most common Linux path
        $paths[] = '/usr/bin/google-chrome';           // Alternative Linux path
        $paths[] = '/usr/bin/chromium-browser';        // Chromium on Ubuntu/Debian
        $paths[] = '/usr/bin/chromium';                // Chromium alternative name
        $paths[] = '/snap/bin/chromium';               // Snap package installation

        // macOS paths
        $paths[] = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        $paths[] = '/Applications/Chromium.app/Contents/MacOS/Chromium';

        // Windows paths - constructed safely to avoid backslash issues
        // We use forward slashes and let PHP handle the conversion, or build paths properly
        if (PHP_OS_FAMILY === 'Windows') {
            // Standard Program Files locations
            $paths[] = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
            $paths[] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

            // User-specific installation - built dynamically to avoid syntax errors
            $userPath = 'C:\\Users\\' . get_current_user() . '\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
            $paths[] = $userPath;

            // Alternative construction using DIRECTORY_SEPARATOR for better cross-platform support
            $userProfilePath = getenv('USERPROFILE');
            if ($userProfilePath) {
                $paths[] = $userProfilePath . '\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
            }
        }

        // XAMPP/Local development specific paths
        $paths[] = '/opt/google/chrome/chrome';        // Some XAMPP installations
        $paths[] = '/usr/local/bin/chrome';            // Homebrew on macOS
        $paths[] = '/usr/local/bin/chromium';          // Alternative local installation

        // Try each path and return the first one that exists
        foreach ($paths as $path) {
            if (file_exists($path) && is_executable($path)) {
                // Log successful detection for debugging
                \Log::info("Chrome detected at: {$path}");
                return $path;
            }
        }

        // If we reach here, Chrome wasn't found in any expected location
        // Log this for debugging purposes
        \Log::warning('Chrome not found in expected locations. Browsershot will attempt auto-detection.', [
            'searched_paths' => $paths,
            'system' => PHP_OS_FAMILY,
            'current_user' => get_current_user(),
            'suggestion' => 'Install Chrome or set custom path if PDF generation fails'
        ]);

        // Return null to let Browsershot try its own auto-detection
        return null;
    }

    /**
     * Allow customization of data from outside the class
     */
    public function setData(array $data): void
    {
        $this->data = array_merge($this->data, $data);
    }

    /**
     * Generate preview HTML with visual page boundaries for debugging
     * This method adds visible page boundaries so you can see if content fits properly
     */
    public function generateDebugPreview(): string
    {
        $html = $this->buildCompleteHTML();

        // Add debug CSS to visualize page boundaries
        $debugCSS = "
        <style>
        /* Debug styles to visualize page boundaries */
        .page {
            border: 3px solid red !important;
            position: relative;
        }

        .page::before {
            content: 'Page Boundary - 11 inches high';
            position: absolute;
            top: 5px;
            left: 5px;
            background: red;
            color: white;
            padding: 2px 8px;
            font-size: 12px;
            font-weight: bold;
            z-index: 1000;
        }

        .step-content-area {
            border: 2px dashed blue !important;
            position: relative;
        }

        .step-content-area::before {
            content: 'Content Area - Must fit here';
            position: absolute;
            top: 5px;
            right: 5px;
            background: blue;
            color: white;
            padding: 2px 8px;
            font-size: 10px;
            z-index: 1000;
        }

        /* Height warning for content that might overflow */
        .content-grid {
            position: relative;
        }

        body::after {
            content: 'DEBUG MODE: Red borders show page boundaries. Blue borders show content areas. If content extends beyond borders, it will be cut off in PDF.';
            position: fixed;
            bottom: 10px;
            left: 10px;
            right: 10px;
            background: yellow;
            padding: 10px;
            font-weight: bold;
            text-align: center;
            z-index: 2000;
            border: 2px solid orange;
        }
        </style>";

        // Insert debug CSS before closing head tag
        $html = str_replace('</head>', $debugCSS . '</head>', $html);

        return $html;
    }
}
