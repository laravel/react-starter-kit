<?php

/**
 * File Location: app/Services/AssessmentPDFService.php
 *
 * This service generates professional PDF replicas for assessment tool results
 * using Laravel and browser-based PDF generation for maximum quality.
 *
 * This is a dynamic service that works with any tool and generates results
 * based on domains with percentages.
 *
 * Installation Requirements:
 * 1. composer require spatie/browsershot
 * 2. Install Node.js and npm on your server
 * 3. npm install -g puppeteer
 *
 * Usage in Controller:
 * $service = new AssessmentPDFService();
 * $service->setAssessmentData($assessment, $results, $user);
 * return $service->generatePDF();
 */

namespace App\Services;

use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;

class AssessmentPDFService
{
    private array $data;

    public function __construct()
    {
        // Initialize with empty data structure
        $this->data = [
            'tool_name' => '',
            'company_name' => '',
            'assessment_name' => '',
            'assessment_email' => '',
            'completion_date' => '',
            'overall_percentage' => 0,
            'certification_level' => '',
            'certification_color' => '',
            'total_criteria' => 0,
            'applicable_criteria' => 0,
            'yes_count' => 0,
            'no_count' => 0,
            'na_count' => 0,
            'domain_results' => []
        ];
    }

    /**
     * Set assessment data from assessment model and results
     */
    public function setAssessmentData($assessment, $results, $user = null): void
    {
        // Get certification info based on overall percentage
        $certificationInfo = $this->getCertificationInfo($results['overall_percentage'] ?? 0);

        $this->data = [
            'tool_name' => $assessment->tool->name_en ?? 'Assessment Tool',
            'company_name' => $user && $user->details ? $user->details->company_name : ($assessment->organization ?? 'Your Organization'),
            'assessment_name' => $assessment->name,
            'assessment_email' => $assessment->email,
            'completion_date' => $assessment->completed_at ? $assessment->completed_at->format('F d, Y') : now()->format('F d, Y'),
            'overall_percentage' => $results['overall_percentage'] ?? 0,
            'certification_level' => $certificationInfo['level'],
            'certification_color' => $certificationInfo['color'],
            'certification_text' => $certificationInfo['text'],
            'total_criteria' => $results['total_criteria'] ?? 0,
            'applicable_criteria' => $results['applicable_criteria'] ?? 0,
            'yes_count' => $results['yes_count'] ?? 0,
            'no_count' => $results['no_count'] ?? 0,
            'na_count' => $results['na_count'] ?? 0,
            'domain_results' => $results['domain_results'] ?? []
        ];
    }

    /**
     * Generate PDF and return as download response
     */
    public function generatePDF(): Response
    {
        $html = $this->buildCompleteHTML();

        try {
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

            $chromePath = $this->getChromePath();
            if ($chromePath !== null) {
                $browsershot->setChromePath($chromePath);
            }

            $pdf = $browsershot->pdf();

            $filename = $this->generateFilename();

            return response($pdf, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => "attachment; filename=\"{$filename}\""
            ]);

        } catch (\Exception $e) {
            throw new \Exception("Failed to generate PDF: " . $e->getMessage());
        }
    }

    /**
     * Save PDF to storage and return path
     */
    public function savePDF(string $filename = null): string
    {
        $filename = $filename ?? $this->generateFilename();
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

        $chromePath = $this->getChromePath();
        if ($chromePath !== null) {
            $browsershot->setChromePath($chromePath);
        }

        $pdf = $browsershot->pdf();

        Storage::disk('public')->put("pdfs/{$filename}", $pdf);

        return "pdfs/{$filename}";
    }

    /**
     * Generate preview HTML for browser viewing
     */
    public function generatePreview(): string
    {
        return $this->buildCompleteHTML();
    }

    /**
     * Build the complete HTML document
     */
    private function buildCompleteHTML(): string
    {
        $css = $this->getAdvancedCSS();
        $coverPage = $this->generateCoverPage();
        $summaryPage = $this->generateSummaryPage();
        $domainPages = $this->generateDomainPages();

        return "
        <!DOCTYPE html>
        <html lang=\"en\">
        <head>
            <meta charset=\"UTF-8\">
            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
            <title>{$this->data['tool_name']} Assessment Results</title>
            <style>{$css}</style>
        </head>
        <body>
            {$coverPage}
            {$summaryPage}
            {$domainPages}
        </body>
        </html>";
    }

    /**
     * Professional CSS styling optimized for assessment results
     */
    private function getAdvancedCSS(): string
    {
        return "
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #2c3e50;
            background: white;
        }

        /* Page structure */
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

        /* Cover page */
        .cover-page {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 80px 60px;
            position: relative;
            text-align: center;
        }

        .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
                radial-gradient(circle at 20% 25%, rgba(255, 255, 255, 0.2) 3px, transparent 3px),
                radial-gradient(circle at 80% 35%, rgba(255, 255, 255, 0.15) 4px, transparent 4px),
                radial-gradient(circle at 40% 70%, rgba(255, 255, 255, 0.2) 3px, transparent 3px);
            background-size: 120px 120px, 180px 180px, 150px 150px;
            opacity: 0.6;
        }

        .company-logo {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 40px;
            z-index: 10;
            position: relative;
            opacity: 0.9;
        }

        .cover-title {
            font-size: 56px;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 24px;
            z-index: 10;
            position: relative;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .cover-subtitle {
            font-size: 28px;
            font-weight: 400;
            opacity: 0.95;
            z-index: 10;
            position: relative;
            margin-bottom: 40px;
        }

        .cover-date {
            font-size: 18px;
            opacity: 0.8;
            z-index: 10;
            position: relative;
        }

        /* Content pages */
        .content-page {
            padding: 60px;
        }

        .section-title {
            font-size: 32px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .section-subtitle {
            font-size: 16px;
            color: #546e7a;
            margin-bottom: 32px;
            line-height: 1.6;
        }

        /* Overall results section */
        .overall-results {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 16px;
            padding: 40px;
            margin: 22px 0;
            text-align: center;
            border: 1px solid #dee2e6;
        }

        .overall-score {
            font-size: 64px;
            font-weight: 600;
            line-height: 1;
            margin-bottom: 12px;
        }

        .certification-badge {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 24px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .cert-excellent { background: #4caf50; color: white; }
        .cert-good { background: #2196f3; color: white; }
        .cert-satisfactory { background: #ff9800; color: white; }
        .cert-needs-improvement { background: #f44336; color: white; }

        /* Statistics grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            margin: 32px 0;
        }

        .stat-card {
            text-align: center;
            padding: 24px;
            background: white;
            border-radius: 12px;
            border: 1px solid #dee2e6;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .stat-number {
            font-size: 36px;
            font-weight: 800;
            line-height: 1;
            margin-bottom: 8px;
        }

        .stat-label {
            font-size: 14px;
            color: #6c757d;
            font-weight: 500;
        }

        .stat-yes .stat-number { color: #28a745; }
        .stat-no .stat-number { color: #dc3545; }
        .stat-na .stat-number { color: #6c757d; }
        .stat-total .stat-number { color: #007bff; }

        /* Domain results */
        .domains-overview {
            margin: 40px 0;
        }

        .domain-item {
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            padding: 24px;
            background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
            border-radius: 12px;
            border-left: 6px solid #007bff;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        .domain-number {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 24px;
            margin-right: 24px;
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
        }

        .domain-content {
            flex: 1;
        }

        .domain-title {
            font-size: 20px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
        }

        .domain-score {
            font-size: 32px;
            font-weight: 800;
            margin-left: auto;
            min-width: 100px;
            text-align: right;
        }

        /* Individual domain pages */
        .domain-page {
            padding: 60px;
        }

        .domain-header {
            display: flex;
            align-items: center;
            margin-bottom: 48px;
            gap: 24px;
        }

        .domain-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 32px;
            box-shadow: 0 8px 24px rgba(0, 123, 255, 0.4);
        }

        .domain-info {
            flex: 1;
        }

        .domain-main-title {
            font-size: 36px;
            font-weight: 700;
            color: #2c3e50;
            line-height: 1.2;
            margin-bottom: 8px;
        }

        .domain-percentage {
            font-size: 24px;
            font-weight: 600;
            color: #6c757d;
        }

        /* Progress bars */
        .progress-section {
            margin: 32px 0;
        }

        .progress-bar {
            width: 100%;
            height: 24px;
            background: #e9ecef;
            border-radius: 12px;
            overflow: hidden;
            margin: 16px 0;
        }

        .progress-fill {
            height: 100%;
            border-radius: 12px;
            position: relative;
            transition: width 0.3s ease;
        }

        .progress-fill.excellent { background: linear-gradient(90deg, #28a745 0%, #20c997 100%); }
        .progress-fill.good { background: linear-gradient(90deg, #007bff 0%, #6610f2 100%); }
        .progress-fill.satisfactory { background: linear-gradient(90deg, #ffc107 0%, #fd7e14 100%); }
        .progress-fill.needs-improvement { background: linear-gradient(90deg, #dc3545 0%, #e83e8c 100%); }

        .progress-text {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-weight: 700;
            font-size: 14px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        /* Domain details */
        .domain-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            margin: 32px 0;
        }

        .detail-card {
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .performance-card {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-left: 6px solid #2196f3;
        }

        .breakdown-card {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border-left: 6px solid #ff9800;
        }

        .card-title {
            font-size: 18px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 16px;
        }

        .card-content {
            font-size: 15px;
            line-height: 1.6;
            color: #37474f;
        }

        /* Utility classes */
        .text-center { text-align: center; }
        .mb-2 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }

        /* Print optimization */
        @media print {
            body { margin: 0; }
            .page { margin: 0; width: 100%; min-height: 100vh; }
        }
        ";
    }

    /**
     * Generate the cover page
     */
    private function generateCoverPage(): string
    {
        return "
        <div class=\"page cover-page\">
            <div class=\"company-logo\">{$this->data['company_name']}This is the name</div>
            <div class=\"cover-title\">{$this->data['tool_name']}</div>
            <div class=\"cover-subtitle\">Assessment Results</div>
            <div class=\"cover-date\">Completed on {$this->data['completion_date']}</div>
        </div>";
    }

    /**
     * Generate the summary page with overall results
     */
    private function generateSummaryPage(): string
    {
        $domainsHTML = '';
        foreach ($this->data['domain_results'] as $index => $domain) {
            $domainsHTML .= "
                <div class=\"domain-item\">
                    <div class=\"domain-number\">" . ($index + 1) . "</div>
                    <div class=\"domain-content\">
                        <div class=\"domain-title\">{$domain['domain_name']}</div>
                    </div>
                    <div class=\"domain-score\" style=\"color: {$this->getScoreColor($domain['score_percentage'])};\">
                        " . number_format($domain['score_percentage'], 1) . "%
                    </div>
                </div>";
        }

        return "
        <div class=\"page content-page\">
            <div class=\"section-title\">Assessment Results Summary</div>
            <div class=\"section-subtitle\">
                Assessment completed by {$this->data['assessment_name']} ({$this->data['assessment_email']})
                for {$this->data['company_name']} using the {$this->data['tool_name']} assessment tool.
            </div>

            <div class=\"overall-results\">
                <div class=\"overall-score\" style=\"color: {$this->data['certification_color']};\">
                    " . number_format($this->data['overall_percentage'], 1) . "%
                </div>
                <div class=\"certification-badge cert-{$this->data['certification_level']}\">
                    {$this->data['certification_text']}
                </div>


            </div>

            <div class=\"section-title\">Domain Performance Overview</div>
            <div class=\"domains-overview\">
                {$domainsHTML}
            </div>
        </div>";
    }

    /**
     * Generate individual domain pages
     */
    private function generateDomainPages(): string
    {
        $pagesHTML = '';

        foreach ($this->data['domain_results'] as $index => $domain) {
            $pagesHTML .= $this->generateDomainPage($domain, $index + 1);
        }

        return $pagesHTML;
    }

    /**
     * Generate an individual domain page
     */
    private function generateDomainPage(array $domain, int $domainNumber): string
    {
        $scoreClass = $this->getScoreClass($domain['score_percentage']);
        $scoreColor = $this->getScoreColor($domain['score_percentage']);

        return "
        <div class=\"page domain-page\">
            <div class=\"domain-header\">
                <div class=\"domain-icon\">{$domainNumber}</div>
                <div class=\"domain-info\">
                    <div class=\"domain-main-title\">{$domain['domain_name']}</div>
                    <div class=\"domain-percentage\">Score: " . number_format($domain['score_percentage'], 1) . "%</div>
                </div>
            </div>

            <div class=\"progress-section\">
                <div class=\"progress-bar\">
                    <div class=\"progress-fill {$scoreClass}\" style=\"width: {$domain['score_percentage']}%;\">
                        <div class=\"progress-text\">" . number_format($domain['score_percentage'], 1) . "%</div>
                    </div>
                </div>
            </div>

            <div class=\"domain-details\">
                <div class=\"detail-card performance-card\">
                    <div class=\"card-title\">Performance Analysis</div>
                    <div class=\"card-content\">
                        <p>This domain achieved a score of <strong>" . number_format($domain['score_percentage'], 1) . "%</strong>,
                        which is considered <strong>" . $this->getPerformanceLevel($domain['score_percentage']) . "</strong>.</p>

                        <p class=\"mb-4\">Based on {$domain['applicable_criteria']} applicable criteria out of {$domain['total_criteria']} total criteria.</p>

                        " . $this->getPerformanceRecommendation($domain['score_percentage']) . "
                    </div>
                </div>

                <div class=\"detail-card breakdown-card\">
                    <div class=\"card-title\">Response Breakdown</div>
                    <div class=\"card-content\">
                        <div class=\"stats-grid\" style=\"grid-template-columns: 1fr 1fr; gap: 16px;\">
                            <div class=\"stat-card stat-yes\">
                                <div class=\"stat-number\">{$domain['yes_count']}</div>
                                <div class=\"stat-label\">Yes</div>
                            </div>
                            <div class=\"stat-card stat-no\">
                                <div class=\"stat-number\">{$domain['no_count']}</div>
                                <div class=\"stat-label\">No</div>
                            </div>
                        </div>

                        <p style=\"margin-top: 16px; text-align: center; color: #6c757d;\">
                            {$domain['na_count']} criteria marked as Not Applicable
                        </p>
                    </div>
                </div>
            </div>
        </div>";
    }

    /**
     * Get certification info based on percentage
     */
    private function getCertificationInfo(float $percentage): array
    {
        if ($percentage >= 90) {
            return ['level' => 'excellent', 'color' => '#28a745', 'text' => 'Excellent Performance'];
        } elseif ($percentage >= 75) {
            return ['level' => 'good', 'color' => '#007bff', 'text' => 'Good Performance'];
        } elseif ($percentage >= 60) {
            return ['level' => 'satisfactory', 'color' => '#ffc107', 'text' => 'Satisfactory Performance'];
        } else {
            return ['level' => 'needs-improvement', 'color' => '#dc3545', 'text' => 'Needs Improvement'];
        }
    }

    /**
     * Get score class for styling
     */
    private function getScoreClass(float $percentage): string
    {
        if ($percentage >= 90) return 'excellent';
        if ($percentage >= 75) return 'good';
        if ($percentage >= 60) return 'satisfactory';
        return 'needs-improvement';
    }

    /**
     * Get score color
     */
    private function getScoreColor(float $percentage): string
    {
        if ($percentage >= 90) return '#28a745';
        if ($percentage >= 75) return '#007bff';
        if ($percentage >= 60) return '#ffc107';
        return '#dc3545';
    }

    /**
     * Get performance level text
     */
    private function getPerformanceLevel(float $percentage): string
    {
        if ($percentage >= 90) return 'excellent';
        if ($percentage >= 75) return 'good';
        if ($percentage >= 60) return 'satisfactory';
        return 'needing improvement';
    }

    /**
     * Get performance recommendation
     */
    private function getPerformanceRecommendation(float $percentage): string
    {
        if ($percentage >= 90) {
            return '<p><strong>Recommendation:</strong> Outstanding performance! Continue maintaining these high standards and consider sharing best practices with other domains.</p>';
        } elseif ($percentage >= 75) {
            return '<p><strong>Recommendation:</strong> Good performance with room for optimization. Focus on addressing the remaining gaps to achieve excellence.</p>';
        } elseif ($percentage >= 60) {
            return '<p><strong>Recommendation:</strong> Satisfactory performance but significant improvement opportunities exist. Consider developing an action plan to address key gaps.</p>';
        } else {
            return '<p><strong>Recommendation:</strong> This domain requires immediate attention. Develop a comprehensive improvement strategy and consider additional resources or training.</p>';
        }
    }

    /**
     * Generate filename based on assessment data
     */
    private function generateFilename(): string
    {
        $toolName = preg_replace('/[^A-Za-z0-9_-]/', '_', $this->data['tool_name']);
        $companyName = preg_replace('/[^A-Za-z0-9_-]/', '_', $this->data['company_name']);
        $date = now()->format('Y-m-d');

        return "{$toolName}_{$companyName}_Assessment_Results_{$date}.pdf";
    }

    /**
     * Helper method to find Chrome path
     */
    private function getChromePath(): ?string
    {
        $paths = [
            '/usr/bin/google-chrome-stable',
            '/usr/bin/google-chrome',
            '/usr/bin/chromium-browser',
            '/usr/bin/chromium',
            '/snap/bin/chromium',
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Chromium.app/Contents/MacOS/Chromium',
        ];

        if (PHP_OS_FAMILY === 'Windows') {
            $paths[] = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
            $paths[] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
        }

        foreach ($paths as $path) {
            if (file_exists($path) && is_executable($path)) {
                return $path;
            }
        }

        return null;
    }

    /**
     * Allow manual data override
     */
    public function setData(array $data): void
    {
        $this->data = array_merge($this->data, $data);
    }
}
