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
 * $service->setLogoPath(public_path('storage/logo.png')); // Set your logo path
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
    private ?string $logoPath = null;

    public function __construct(string $language = 'en')
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
                'confidential_report' => 'Confidential Report',
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
                'confidential_report' => 'تقرير سري',
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
     * Set the path to the logo file.
     *
     * @param string|null $path Absolute path to the logo file.
     */
    public function setLogoPath(?string $path): void
    {
        if ($path && file_exists($path)) {
            $this->logoPath = $path;
        }
    }

    /**
     * Set assessment data from assessment model and results
     */
    public function setAssessmentData($assessment, $results, $user = null): void
    {
        $certificationInfo = $this->getCertificationInfo($results['overall_percentage'] ?? 0);
        $toolName = $this->isArabic ? ($assessment->tool->name_ar ?? 'أداة التقييم') : ($assessment->tool->name_en ?? 'Assessment Tool');

        $this->data = [
            'tool_name' => $toolName,
            'company_name' => $user->organization->name ?? $assessment->organization ?? ($this->isArabic ? 'مؤسستك' : 'Your Organization'),
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
        if (!$date) $date = now();
        return $this->isArabic ? $date->locale('ar')->translatedFormat('d F Y') : $date->format('F d, Y');
    }

    /**
     * Generate PDF and return as download response
     */
    public function generatePDF(): Response
    {
        $html = $this->buildCompleteHTML();
        $pdf = $this->createPdfFromHtml($html);
        $filename = $this->generateFilename();

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "attachment; filename=\"{$filename}\""
        ]);
    }

    /**
     * Save PDF to storage and return path
     */
    public function savePDF(string $filename = null): string
    {
        $filename = $filename ?? $this->generateFilename();
        $html = $this->buildCompleteHTML();
        $pdf = $this->createPdfFromHtml($html);

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
     * Centralized PDF generation logic
     */
    private function createPdfFromHtml(string $html): string
    {
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

            return $browsershot->pdf();

        } catch (\Exception $e) {
            // It's good practice to log the error
            // Log::error("PDF Generation Failed: " . $e->getMessage());
            throw new \Exception("Failed to generate PDF: " . $e->getMessage());
        }
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

        return "<!DOCTYPE html><html lang=\"{$lang}\" dir=\"{$dir}\"><head><meta charset=\"UTF-8\"><title>{$this->data['tool_name']} {$this->t('assessment_results')}</title><style>{$css}</style></head><body>{$coverPage}{$summaryPage}{$domainPages}</body></html>";
    }

    /**
     * Professional CSS styling optimized for assessment results with RTL support
     */
    private function getAdvancedCSS(): string
    {
        $fontFamily = $this->isArabic ? "'Amiri', 'Noto Sans Arabic', sans-serif" : "'Helvetica Neue', Arial, sans-serif";
        $textAlign = $this->isArabic ? 'right' : 'left';
        $marginDirection = $this->isArabic ? 'margin-left' : 'margin-right';

        return "
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: {$fontFamily}; font-size: 14px; line-height: 1.6; color: #333; background: white; direction: " . ($this->isArabic ? 'rtl' : 'ltr') . "; }
        .page { width: 8.5in; min-height: 11in; margin: 0 auto; background: white; position: relative; page-break-after: always; overflow: hidden; }
        .page:last-child { page-break-after: avoid; }

        /* Enhanced Cover Page */
        .cover-page {
            background: #f8f9fa;
            color: #2c3e50;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 80px 60px;
            position: relative;
        }
        .cover-page .header { text-align: " . ($this->isArabic ? 'right' : 'left') . "; }
        .cover-page .footer { text-align: center; font-size: 12px; color: #6c757d; }
        .cover-page .main-content { text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
        .cover-logo { max-width: 180px; max-height: 60px; margin-bottom: 20px; }
        .cover-title { font-size: " . ($this->isArabic ? '44px' : '52px') . "; font-weight: 700; line-height: 1.1; margin-bottom: 16px; color: #0056b3; }
        .cover-subtitle { font-size: " . ($this->isArabic ? '26px' : '30px') . "; font-weight: 400; color: #495057; margin-bottom: 40px; }
        .cover-info { font-size: " . ($this->isArabic ? '18px' : '16px') . "; color: #495057; }
        .cover-info strong { color: #0056b3; }
        .cover-page::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* Content pages */
        .content-page { padding: 60px; text-align: {$textAlign}; }
        .section-title { font-size: " . ($this->isArabic ? '26px' : '28px') . "; font-weight: 700; color: #0056b3; margin-bottom: 24px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px; }
        .section-subtitle { font-size: 16px; color: #546e7a; margin-bottom: 32px; line-height: 1.7; }

        /* Overall results section */
        .overall-results { background: #f8f9fa; border-radius: 12px; padding: 30px; margin: 20px 0; text-align: center; border: 1px solid #dee2e6; }
        .overall-score { font-size: 60px; font-weight: 700; line-height: 1; margin-bottom: 10px; }
        .certification-badge { display: inline-block; padding: 10px 20px; border-radius: 20px; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .cert-excellent { background: #28a745; color: white; }
        .cert-good { background: #007bff; color: white; }
        .cert-satisfactory { background: #ffc107; color: #333; }
        .cert-needs-improvement { background: #dc3545; color: white; }

        /* Stats grid */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 32px 0; }
        .stat-card { text-align: center; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .stat-number { font-size: 32px; font-weight: 700; line-height: 1; margin-bottom: 6px; }
        .stat-label { font-size: 13px; color: #6c757d; font-weight: 500; }
        .stat-yes .stat-number { color: #28a745; } .stat-no .stat-number { color: #dc3545; } .stat-na .stat-number { color: #6c757d; } .stat-total .stat-number { color: #007bff; }

        /* Domain results */
        .domains-overview { margin: 40px 0; }
        .domain-item { display: flex; align-items: center; margin-bottom: 12px; padding: 20px; background: #fff; border-radius: 8px; border-" . ($this->isArabic ? 'right' : 'left') . ": 5px solid; box-shadow: 0 2px 8px rgba(0,0,0,0.07); " . ($this->isArabic ? 'flex-direction: row-reverse;' : '') . " }
        .domain-content { flex: 1; text-align: {$textAlign}; }
        .domain-title { font-size: 18px; font-weight: 600; color: #343a40; }
        .domain-score { font-size: 28px; font-weight: 700; margin-" . ($this->isArabic ? 'right' : 'left') . ": auto; min-width: 90px; text-align: " . ($this->isArabic ? 'left' : 'right') . "; }

        /* Individual domain pages */
        .domain-page { padding: 60px; }
        .domain-header { display: flex; align-items: center; margin-bottom: 40px; gap: 20px; " . ($this->isArabic ? 'flex-direction: row-reverse;' : '') . " }
        .domain-icon { width: 60px; height: 60px; border-radius: 50%; background: #007bff; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 24px; }
        .domain-info { flex: 1; }
        .domain-main-title { font-size: " . ($this->isArabic ? '28px' : '32px') . "; font-weight: 700; color: #2c3e50; line-height: 1.2; }

        /* Progress bars */
        .progress-bar { width: 100%; height: 20px; background: #e9ecef; border-radius: 10px; overflow: hidden; margin: 12px 0; direction: ltr; }
        .progress-fill { height: 100%; border-radius: 10px; position: relative; text-align: right; }
        .progress-fill.excellent { background: #28a745; } .progress-fill.good { background: #007bff; } .progress-fill.satisfactory { background: #ffc107; } .progress-fill.needs-improvement { background: #dc3545; }
        .progress-text { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-weight: 600; font-size: 12px; }

        /* Domain details */
        .domain-details { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px; }
        .detail-card { padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; }
        .card-title { font-size: 16px; font-weight: 700; color: #343a40; margin-bottom: 12px; }
        .card-content { font-size: 14px; line-height: 1.7; color: #495057; }

        /* NEW Bar Graph Styles */
        .response-bar { display: flex; width: 100%; height: 24px; border-radius: 12px; overflow: hidden; background-color: #e9ecef; margin-bottom: 12px; }
        .bar-segment { height: 100%; float: left; }
        .bar-segment-yes { background-color: #28a745; }
        .bar-segment-no { background-color: #dc3545; }
        .bar-segment-na { background-color: #6c757d; }
        .bar-legend { display: flex; justify-content: center; gap: 20px; margin-top: 16px; font-size: 12px; }
        .legend-item { display: flex; align-items: center; gap: 6px; }
        .legend-color { width: 12px; height: 12px; border-radius: 3px; }
        ";
    }

    /**
     * Generate the cover page
     */
    private function generateCoverPage(): string
    {
        $logoHtml = '';
        if ($this->logoPath) {
            $type = pathinfo($this->logoPath, PATHINFO_EXTENSION);
            $data = file_get_contents($this->logoPath);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            $logoHtml = "<img src='{$base64}' alt='Company Logo' class='cover-logo'>";
        }

        return "
        <div class=\"page cover-page\">
            <div class=\"header\">{$logoHtml}</div>
            <div class=\"main-content\">
                <div class=\"cover-title\">{$this->data['tool_name']}</div>
                <div class=\"cover-subtitle\">{$this->t('assessment_results')}</div>
                <div class=\"cover-info\">
                    <p><strong>{$this->t('for')}:</strong> {$this->data['company_name']}</p>
                    <p><strong>{$this->t('completed_on')}:</strong> {$this->data['completion_date']}</p>
                </div>
            </div>
            <div class=\"footer\">{$this->t('confidential_report')}</div>
        </div>";
    }

    /**
     * Generate the summary page with overall results
     */
    private function generateSummaryPage(): string
    {
        $domainsHTML = '';
        foreach ($this->data['domain_results'] as $domain) {
            $scoreColor = $this->getScoreColor($domain['score_percentage']);
            $domainsHTML .= "
                <div class=\"domain-item\" style=\"border-color: {$scoreColor};\">
                    <div class=\"domain-content\">
                        <div class=\"domain-title\">{$domain['domain_name']}</div>
                    </div>
                    <div class=\"domain-score\" style=\"color: {$scoreColor};\">
                        " . round($domain['score_percentage']) . "%
                    </div>
                </div>";
        }

        return "
        <div class=\"page content-page\">
            <div class=\"section-title\">{$this->t('assessment_results')}</div>
            <div class=\"section-subtitle\">
                {$this->t('assessment_completed_by')} <strong>{$this->data['assessment_name']}</strong> ({$this->data['assessment_email']})
                {$this->t('for')} <strong>{$this->data['company_name']}</strong>.
            </div>
            <div class=\"overall-results\">
                <div class=\"overall-score\" style=\"color: {$this->data['certification_color']};\">
                    " . round($this->data['overall_percentage']) . "%
                </div>
                <div class=\"certification-badge cert-{$this->data['certification_level']}\">
                    {$this->data['certification_text']}
                </div>
            </div>
            <div class=\"section-title\">{$this->t('domain_performance_overview')}</div>
            <div class=\"domains-overview\">{$domainsHTML}</div>
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

        // Calculate percentages for the bar graph
        $totalResponses = $domain['yes_count'] + $domain['no_count'] + $domain['na_count'];
        $yesPercent = $totalResponses > 0 ? ($domain['yes_count'] / $totalResponses) * 100 : 0;
        $noPercent = $totalResponses > 0 ? ($domain['no_count'] / $totalResponses) * 100 : 0;
        $naPercent = $totalResponses > 0 ? ($domain['na_count'] / $totalResponses) * 100 : 0;

        $responseBreakdownHtml = "
            <div class='response-bar'>
                <div class='bar-segment bar-segment-yes' style='width: {$yesPercent}%;'></div>
                <div class='bar-segment bar-segment-no' style='width: {$noPercent}%;'></div>
                <div class='bar-segment bar-segment-na' style='width: {$naPercent}%;'></div>
            </div>
            <div class='bar-legend'>
                <div class='legend-item'><div class='legend-color' style='background-color: #28a745;'></div>{$this->t('yes')} ({$domain['yes_count']})</div>
                <div class='legend-item'><div class='legend-color' style='background-color: #dc3545;'></div>{$this->t('no')} ({$domain['no_count']})</div>
                <div class='legend-item'><div class='legend-color' style='background-color: #6c757d;'></div>{$this->t('not_applicable')} ({$domain['na_count']})</div>
            </div>
        ";

        return "
        <div class=\"page domain-page\">
            <div class=\"domain-header\">
                <div class=\"domain-icon\">{$domainNumber}</div>
                <div class=\"domain-info\">
                    <div class=\"domain-main-title\">{$domain['domain_name']}</div>
                </div>
            </div>
            <div class=\"progress-bar\">
                <div class=\"progress-fill {$scoreClass}\" style=\"width: {$domain['score_percentage']}%;\">
                    <div class=\"progress-text\">" . round($domain['score_percentage']) . "%</div>
                </div>
            </div>
            <div class=\"domain-details\">
                <div class=\"detail-card\">
                    <div class=\"card-title\">{$this->t('performance_analysis')}</div>
                    <div class=\"card-content\">
                        <p>{$this->t('this_domain_achieved')} <strong style=\"color:{$scoreColor}\">" . round($domain['score_percentage']) . "%</strong>, {$this->t('which_is_considered')} <strong>" . $this->getPerformanceLevel($domain['score_percentage']) . "</strong>.</p>
                        <p>{$this->getPerformanceRecommendation($domain['score_percentage'])}</p>
                    </div>
                </div>
                <div class=\"detail-card\">
                    <div class=\"card-title\">{$this->t('response_breakdown')}</div>
                    <div class=\"card-content\">
                        {$responseBreakdownHtml}
                    </div>
                </div>
            </div>
        </div>";
    }

    // --- Helper Methods ---
    private function getCertificationInfo(float $percentage): array
    {
        if ($percentage >= 90) return ['level' => 'excellent', 'color' => '#28a745', 'text' => $this->t('excellent_performance')];
        if ($percentage >= 75) return ['level' => 'good', 'color' => '#007bff', 'text' => $this->t('good_performance')];
        if ($percentage >= 60) return ['level' => 'satisfactory', 'color' => '#ffc107', 'text' => $this->t('satisfactory_performance')];
        return ['level' => 'needs-improvement', 'color' => '#dc3545', 'text' => $this->t('needs_improvement')];
    }

    private function getScoreClass(float $percentage): string
    {
        if ($percentage >= 90) return 'excellent';
        if ($percentage >= 75) return 'good';
        if ($percentage >= 60) return 'satisfactory';
        return 'needs-improvement';
    }

    private function getScoreColor(float $percentage): string
    {
        if ($percentage >= 90) return '#28a745';
        if ($percentage >= 75) return '#007bff';
        if ($percentage >= 60) return '#ffc107';
        return '#dc3545';
    }

    private function getPerformanceLevel(float $percentage): string
    {
        if ($percentage >= 90) return $this->t('excellent');
        if ($percentage >= 75) return $this->t('good');
        if ($percentage >= 60) return $this->t('satisfactory');
        return $this->t('needing_improvement');
    }

    private function getPerformanceRecommendation(float $percentage): string
    {
        if ($percentage >= 90) $rec = $this->t('outstanding_recommendation');
        elseif ($percentage >= 75) $rec = $this->t('good_recommendation');
        elseif ($percentage >= 60) $rec = $this->t('satisfactory_recommendation');
        else $rec = $this->t('poor_recommendation');
        return '<p><strong>' . $this->t('recommendation') . ':</strong> ' . $rec . '</p>';
    }

    private function generateFilename(): string
    {
        $toolName = preg_replace('/[^A-Za-z0-9_\x{0600}-\x{06FF}-]/u', '_', $this->data['tool_name']);
        $companyName = preg_replace('/[^A-Za-z0-9_\x{0600}-\x{06FF}-]/u', '_', $this->data['company_name']);
        return "{$toolName}_{$companyName}_Results_{$this->language}.pdf";
    }

    private function getChromePath(): ?string
    {
        $paths = ['/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium', '/snap/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium'];
        if (PHP_OS_FAMILY === 'Windows') {
            $paths[] = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
            $paths[] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
        }
        foreach ($paths as $path) {
            if (file_exists($path) && is_executable($path)) return $path;
        }
        return null;
    }

    public function setData(array $data): void
    {
        $this->data = array_merge($this->data, $data);
    }
}
