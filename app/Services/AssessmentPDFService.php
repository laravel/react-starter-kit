<?php

/**
 * File Location: app/Services/AssessmentPDFService.php
 *
 * This service generates professional PDF replicas for assessment tool results
 * using Laravel and browser-based PDF generation for maximum quality.
 *
 * This is a dynamic service that works with any tool and generates results
 * based on domains with percentages. Now supports both English and Arabic.
 *
 * Installation Requirements:
 * 1. composer require spatie/browsershot
 * 2. Install Node.js and npm on your server
 * 3. npm install -g puppeteer
 *
 * Usage in Controller:
 * $service = new AssessmentPDFService('ar'); // For Arabic
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
    private string $language;
    private bool $isArabic;
    private array $translations;

    public function __construct(string $language = 'ar')
    {
        $this->language = $language;
        $this->isArabic = $language === 'ar';
        $this->initializeTranslations();

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
            'certification_text' => '',
            'total_criteria' => 0,
            'applicable_criteria' => 0,
            'yes_count' => 0,
            'no_count' => 0,
            'na_count' => 0,
            'domain_results' => []
        ];
    }

    /**
     * Initialize translations for both languages
     */
    private function initializeTranslations(): void
    {
        $this->translations = [
            'en' => [
                'assessment_results' => 'Assessment Results',
                'completed_on' => 'Completed on',
                'assessment_completed_by' => 'Assessment completed by',
                'for' => 'for',
                'using_tool' => 'using the',
                'assessment_tool' => 'assessment tool',
                'domain_performance_overview' => 'Domain Performance Overview',
                'performance_analysis' => 'Performance Analysis',
                'response_breakdown' => 'Response Breakdown',
                'this_domain_achieved' => 'This domain achieved a score of',
                'which_is_considered' => 'which is considered',
                'based_on_criteria' => 'Based on',
                'applicable_criteria' => 'applicable criteria out of',
                'total_criteria' => 'total criteria',
                'recommendation' => 'Recommendation',
                'yes' => 'Yes',
                'no' => 'No',
                'not_applicable' => 'Not Applicable',
                'criteria_marked_na' => 'criteria marked as Not Applicable',
                'score' => 'Score',
                'excellent_performance' => 'Excellent Performance',
                'good_performance' => 'Good Performance',
                'satisfactory_performance' => 'Satisfactory Performance',
                'needs_improvement' => 'Needs Improvement',
                'excellent' => 'excellent',
                'good' => 'good',
                'satisfactory' => 'satisfactory',
                'needing_improvement' => 'needing improvement',
                'outstanding_recommendation' => 'Outstanding performance! Continue maintaining these high standards and consider sharing best practices with other domains.',
                'good_recommendation' => 'Good performance with room for optimization. Focus on addressing the remaining gaps to achieve excellence.',
                'satisfactory_recommendation' => 'Satisfactory performance but significant improvement opportunities exist. Consider developing an action plan to address key gaps.',
                'poor_recommendation' => 'This domain requires immediate attention. Develop a comprehensive improvement strategy and consider additional resources or training.'
            ],
            'ar' => [
                'assessment_results' => 'نتائج التقييم',
                'completed_on' => 'اكتمل في',
                'assessment_completed_by' => 'تم إكمال التقييم بواسطة',
                'for' => 'لـ',
                'using_tool' => 'باستخدام أداة',
                'assessment_tool' => 'التقييم',
                'domain_performance_overview' => 'نظرة عامة على أداء المجالات',
                'performance_analysis' => 'تحليل الأداء',
                'response_breakdown' => 'تفصيل الإجابات',
                'this_domain_achieved' => 'حقق هذا المجال نتيجة',
                'which_is_considered' => 'والتي تعتبر',
                'based_on_criteria' => 'بناءً على',
                'applicable_criteria' => 'معايير قابلة للتطبيق من أصل',
                'total_criteria' => 'إجمالي المعايير',
                'recommendation' => 'التوصية',
                'yes' => 'نعم',
                'no' => 'لا',
                'not_applicable' => 'غير قابل للتطبيق',
                'criteria_marked_na' => 'معايير مُحددة كغير قابلة للتطبيق',
                'score' => 'النتيجة',
                'excellent_performance' => 'أداء ممتاز',
                'good_performance' => 'أداء جيد',
                'satisfactory_performance' => 'أداء مُرضي',
                'needs_improvement' => 'يحتاج تحسين',
                'excellent' => 'ممتاز',
                'good' => 'جيد',
                'satisfactory' => 'مُرضي',
                'needing_improvement' => 'يحتاج تحسين',
                'outstanding_recommendation' => 'أداء متميز! استمر في الحفاظ على هذه المعايير العالية وفكر في مشاركة أفضل الممارسات مع المجالات الأخرى.',
                'good_recommendation' => 'أداء جيد مع مجال للتحسين. ركز على معالجة الثغرات المتبقية لتحقيق التميز.',
                'satisfactory_recommendation' => 'أداء مُرضي ولكن توجد فرص تحسين كبيرة. فكر في وضع خطة عمل لمعالجة الثغرات الرئيسية.',
                'poor_recommendation' => 'يتطلب هذا المجال اهتماماً فورياً. ضع استراتيجية تحسين شاملة وفكر في موارد أو تدريب إضافي.'
            ]
        ];
    }

    /**
     * Get translation for a key
     */
    private function t(string $key): string
    {
        return $this->translations[$this->language][$key] ?? $key;
    }

    /**
     * Set language and reinitialize translations
     */
    public function setLanguage(string $language): void
    {

        $this->language = $language;
        $this->isArabic = $language === 'ar';
    }

    /**
     * Set assessment data from assessment model and results
     */
    public function setAssessmentData($assessment, $results, $user = null): void
    {
        // Get certification info based on overall percentage
        $certificationInfo = $this->getCertificationInfo($results['overall_percentage'] ?? 0);

        // Get tool name based on language
        $toolName = $this->isArabic
            ? ($assessment->tool->name_ar ?? $assessment->tool->name_en ?? 'أداة التقييم')
            : ($assessment->tool->name_en ?? 'Assessment Tool');

        $this->data = [
            'tool_name' => $toolName,
            'company_name' => $user && $user->details ? $user->details->company_name : ($assessment->organization ?? ($this->isArabic ? 'مؤسستك' : 'Your Organization')),
            'assessment_name' => $assessment->name,
            'assessment_email' => $assessment->email,
            'completion_date' => $this->formatDate($assessment->completed_at ?? now()),
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
     * Format date according to language
     */
    private function formatDate($date): string
    {
        if (!$date) {
            $date = now();
        }

        if ($this->isArabic) {
            return $date->locale('ar')->translatedFormat('d F Y');
        } else {
            return $date->format('F d, Y');
        }
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
        $lang = $this->language;
        $dir = $this->isArabic ? 'rtl' : 'ltr';
        $css = $this->getAdvancedCSS();
        $coverPage = $this->generateCoverPage();
        $summaryPage = $this->generateSummaryPage();
        $domainPages = $this->generateDomainPages();

        return "
        <!DOCTYPE html>
        <html lang=\"{$lang}\" dir=\"{$dir}\">
        <head>
            <meta charset=\"UTF-8\">
            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
            <title>{$this->data['tool_name']} {$this->t('assessment_results')}</title>
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
     * Professional CSS styling optimized for assessment results with RTL support
     */
    private function getAdvancedCSS(): string
    {
        $fontFamily = $this->isArabic
            ? "'Amiri', 'Noto Sans Arabic', 'Tahoma', 'Arial Unicode MS', sans-serif"
            : "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";

        $textAlign = $this->isArabic ? 'right' : 'left';
        $marginDirection = $this->isArabic ? 'margin-left' : 'margin-right';

        return "
        /* Import Arabic fonts */
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap');

        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: {$fontFamily};
            font-size: " . ($this->isArabic ? '16px' : '14px') . ";
            line-height: " . ($this->isArabic ? '1.8' : '1.5') . ";
            color: #2c3e50;
            background: white;
            direction: " . ($this->isArabic ? 'rtl' : 'ltr') . ";
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
            font-size: " . ($this->isArabic ? '28px' : '24px') . ";
            font-weight: 600;
            margin-bottom: 40px;
            z-index: 10;
            position: relative;
            opacity: 0.9;
        }

        .cover-title {
            font-size: " . ($this->isArabic ? '48px' : '56px') . ";
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 24px;
            z-index: 10;
            position: relative;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .cover-subtitle {
            font-size: " . ($this->isArabic ? '24px' : '28px') . ";
            font-weight: 400;
            opacity: 0.95;
            z-index: 10;
            position: relative;
            margin-bottom: 40px;
        }

        .cover-date {
            font-size: " . ($this->isArabic ? '20px' : '18px') . ";
            opacity: 0.8;
            z-index: 10;
            position: relative;
        }

        /* Content pages */
        .content-page {
            padding: 60px;
            text-align: {$textAlign};
        }

        .section-title {
            font-size: " . ($this->isArabic ? '28px' : '32px') . ";
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .section-subtitle {
            font-size: " . ($this->isArabic ? '18px' : '16px') . ";
            color: #546e7a;
            margin-bottom: 32px;
            line-height: " . ($this->isArabic ? '1.8' : '1.6') . ";
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
            font-size: " . ($this->isArabic ? '20px' : '18px') . ";
            font-weight: 700;
            margin-bottom: 24px;
            text-transform: " . ($this->isArabic ? 'none' : 'uppercase') . ";
            letter-spacing: " . ($this->isArabic ? '0' : '1px') . ";
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
            font-size: " . ($this->isArabic ? '16px' : '14px') . ";
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
            border-" . ($this->isArabic ? 'right' : 'left') . ": 6px solid #007bff;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            " . ($this->isArabic ? 'flex-direction: row-reverse;' : '') . "
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
            {$marginDirection}: 24px;
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
        }

        .domain-content {
            flex: 1;
            text-align: {$textAlign};
        }

        .domain-title {
            font-size: " . ($this->isArabic ? '22px' : '20px') . ";
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
        }

        .domain-score {
            font-size: 32px;
            font-weight: 800;
            margin-" . ($this->isArabic ? 'right' : 'left') . ": auto;
            min-width: 100px;
            text-align: " . ($this->isArabic ? 'left' : 'right') . ";
        }

        /* Individual domain pages */
        .domain-page {
            padding: 60px;
            text-align: {$textAlign};
        }

        .domain-header {
            display: flex;
            align-items: center;
            margin-bottom: 48px;
            gap: 24px;
            " . ($this->isArabic ? 'flex-direction: row-reverse;' : '') . "
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
            font-size: " . ($this->isArabic ? '32px' : '36px') . ";
            font-weight: 700;
            color: #2c3e50;
            line-height: 1.2;
            margin-bottom: 8px;
        }

        .domain-percentage {
            font-size: " . ($this->isArabic ? '26px' : '24px') . ";
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
            direction: ltr; /* Progress bars always LTR */
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
            border-" . ($this->isArabic ? 'right' : 'left') . ": 6px solid #2196f3;
        }

        .breakdown-card {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border-" . ($this->isArabic ? 'right' : 'left') . ": 6px solid #ff9800;
        }

        .card-title {
            font-size: " . ($this->isArabic ? '20px' : '18px') . ";
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 16px;
        }

        .card-content {
            font-size: " . ($this->isArabic ? '17px' : '15px') . ";
            line-height: " . ($this->isArabic ? '1.8' : '1.6') . ";
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

        /* RTL specific adjustments */
        " . ($this->isArabic ? "
        .domain-item {
            text-align: right;
        }

        .domain-score {
            margin-right: auto;
            margin-left: 0;
            text-align: left;
        }

        .progress-text {
            right: auto;
            left: 12px;
        }
        " : "") . "
        ";
    }

    /**
     * Generate the cover page
     */
    private function generateCoverPage(): string
    {
        return "
        <div class=\"page cover-page\">
            <div class=\"company-logo\">{$this->data['company_name']}</div>
            <div class=\"cover-title\">{$this->data['tool_name']}</div>
            <div class=\"cover-subtitle\">{$this->t('assessment_results')}</div>
            <div class=\"cover-date\">{$this->t('completed_on')} {$this->data['completion_date']}</div>
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
            <div class=\"section-title\">{$this->t('assessment_results')}</div>
            <div class=\"section-subtitle\">
                {$this->t('assessment_completed_by')} {$this->data['assessment_name']} ({$this->data['assessment_email']})
                {$this->t('for')} {$this->data['company_name']} {$this->t('using_tool')} {$this->data['tool_name']} {$this->t('assessment_tool')}.
            </div>

            <div class=\"overall-results\">
                <div class=\"overall-score\" style=\"color: {$this->data['certification_color']};\">
                    " . number_format($this->data['overall_percentage'], 1) . "%
                </div>
                <div class=\"certification-badge cert-{$this->data['certification_level']}\">
                    {$this->data['certification_text']}
                </div>
            </div>

            <div class=\"section-title\">{$this->t('domain_performance_overview')}</div>
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
                    <div class=\"domain-percentage\">{$this->t('score')}: " . number_format($domain['score_percentage'], 1) . "%</div>
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
                    <div class=\"card-title\">{$this->t('performance_analysis')}</div>
                    <div class=\"card-content\">
                        <p>{$this->t('this_domain_achieved')} <strong>" . number_format($domain['score_percentage'], 1) . "%</strong>،
                        {$this->t('which_is_considered')} <strong>" . $this->getPerformanceLevel($domain['score_percentage']) . "</strong>.</p>

                        <p class=\"mb-4\">{$this->t('based_on_criteria')} {$domain['applicable_criteria']} {$this->t('applicable_criteria')} {$domain['total_criteria']} {$this->t('total_criteria')}.</p>

                        " . $this->getPerformanceRecommendation($domain['score_percentage']) . "
                    </div>
                </div>

                <div class=\"detail-card breakdown-card\">
                    <div class=\"card-title\">{$this->t('response_breakdown')}</div>
                    <div class=\"card-content\">
                        <div class=\"stats-grid\" style=\"grid-template-columns: 1fr 1fr; gap: 16px;\">
                            <div class=\"stat-card stat-yes\">
                                <div class=\"stat-number\">{$domain['yes_count']}</div>
                                <div class=\"stat-label\">{$this->t('yes')}</div>
                            </div>
                            <div class=\"stat-card stat-no\">
                                <div class=\"stat-number\">{$domain['no_count']}</div>
                                <div class=\"stat-label\">{$this->t('no')}</div>
                            </div>
                        </div>

                        <p style=\"margin-top: 16px; text-align: center; color: #6c757d;\">
                            {$domain['na_count']} {$this->t('criteria_marked_na')}
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
            return ['level' => 'excellent', 'color' => '#28a745', 'text' => $this->t('excellent_performance')];
        } elseif ($percentage >= 75) {
            return ['level' => 'good', 'color' => '#007bff', 'text' => $this->t('good_performance')];
        } elseif ($percentage >= 60) {
            return ['level' => 'satisfactory', 'color' => '#ffc107', 'text' => $this->t('satisfactory_performance')];
        } else {
            return ['level' => 'needs-improvement', 'color' => '#dc3545', 'text' => $this->t('needs_improvement')];
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
        if ($percentage >= 90) return $this->t('excellent');
        if ($percentage >= 75) return $this->t('good');
        if ($percentage >= 60) return $this->t('satisfactory');
        return $this->t('needing_improvement');
    }

    /**
     * Get performance recommendation
     */
    private function getPerformanceRecommendation(float $percentage): string
    {
        $recommendation = '';
        if ($percentage >= 90) {
            $recommendation = $this->t('outstanding_recommendation');
        } elseif ($percentage >= 75) {
            $recommendation = $this->t('good_recommendation');
        } elseif ($percentage >= 60) {
            $recommendation = $this->t('satisfactory_recommendation');
        } else {
            $recommendation = $this->t('poor_recommendation');
        }

        return '<p><strong>' . $this->t('recommendation') . ':</strong> ' . $recommendation . '</p>';
    }

    /**
     * Generate filename based on assessment data
     */
    private function generateFilename(): string
    {
        $toolName = preg_replace('/[^A-Za-z0-9_\u0600-\u06FF-]/', '_', $this->data['tool_name']);
        $companyName = preg_replace('/[^A-Za-z0-9_\u0600-\u06FF-]/', '_', $this->data['company_name']);
        $date = now()->format('Y-m-d');
        $lang = $this->language;

        return "{$toolName}_{$companyName}_Assessment_Results_{$date}_{$lang}.pdf";
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
