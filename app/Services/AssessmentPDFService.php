<?php

/**
 * File Location: app/Services/AssessmentPDFService.php
 *
 * This service generates a multi-page, professional PDF report for assessment results,
 * including advanced data visualizations and charts.
 *
 * Supports both English and Arabic.
 *
 * Installation Requirements:
 * 1. composer require spatie/browsershot
 * 2. Install Node.js and npm on your server
 * 3. npm install -g puppeteer
 *
 * Usage in Controller:
 * $service = new AssessmentPDFService('ar'); // For Arabic
 * $service->setLogoPath(public_path('storage/logo.svg'));
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
    private int $currentPage = 0;
    private int $totalPages = 0;

    public function __construct(string $language = 'en')
    {
        $this->language = $language;
        $this->isArabic = $language === 'ar';
        $this->initializeTranslations();

        $this->data = [
            'tool_name' => '',
            'company_name' => '',
            'completion_date' => '',
            'overall_percentage' => 0,
            'yes_count' => 0,
            'no_count' => 0,
            'domain_results' => []
        ];
    }

    private function initializeTranslations(): void
    {
        $this->translations = [
            'en' => [
                'assessment_results' => 'Assessment Results',
                'confidential_report' => 'Confidential Report',
                'completed_on' => 'Completed on',
                'for' => 'for',
                'page' => 'Page',
                'of' => 'of',
                'overall_summary' => 'Overall Summary',
                'domain_performance_overview' => 'Domain Performance Overview',
                'performance_analysis' => 'Performance Analysis',
                'response_breakdown' => 'Response Breakdown',
                'recommendation' => 'Recommendation',
                'yes' => 'Yes',
                'no' => 'No',
                'score' => 'Score',
                'excellent_performance' => 'Excellent Performance',
                'good_performance' => 'Good Performance',
                'satisfactory_performance' => 'Satisfactory Performance',
                'needs_improvement' => 'Needs Improvement',
                'excellent' => 'excellent',
                'good' => 'good',
                'satisfactory' => 'satisfactory',
                'needing_improvement' => 'needing improvement',
                'outstanding_recommendation' => 'Outstanding performance! Continue maintaining these high standards.',
                'good_recommendation' => 'Good performance with room for optimization. Focus on addressing the remaining gaps.',
                'satisfactory_recommendation' => 'Satisfactory performance. Consider developing an action plan to address key gaps.',
                'poor_recommendation' => 'This domain requires immediate attention. Develop a comprehensive improvement strategy.',
                'criteria_status' => 'Assessment Criteria',
                'availability_status' => 'Availability Status',
                'criteria_availability_status' => 'Criteria Availability Status',
                'readiness_by_category' => 'Readiness by Category',
                'contact_us' => 'Contact Us',
                'contact_us_prompt' => 'For more details or to discuss your results, please get in touch.',
                'phone' => 'Phone',
                'email' => 'Email',
                'website' => 'Website',
            ],
            'ar' => [
                'assessment_results' => 'نتائج التقييم',
                'confidential_report' => 'تقرير سري',
                'completed_on' => 'اكتمل في',
                'for' => 'لـ',
                'page' => 'صفحة',
                'of' => 'من',
                'overall_summary' => 'الملخص العام',
                'domain_performance_overview' => 'نظرة عامة على أداء المجالات',
                'performance_analysis' => 'تحليل الأداء',
                'response_breakdown' => 'تفصيل الإجابات',
                'recommendation' => 'التوصية',
                'yes' => 'نعم',
                'no' => 'لا',
                'score' => 'النتيجة',
                'excellent_performance' => 'أداء ممتاز',
                'good_performance' => 'أداء جيد',
                'satisfactory_performance' => 'أداء مُرضي',
                'needs_improvement' => 'يحتاج تحسين',
                'excellent' => 'ممتاز',
                'good' => 'جيد',
                'satisfactory' => 'مُرضي',
                'needing_improvement' => 'يحتاج تحسين',
                'outstanding_recommendation' => 'أداء متميز! استمر في الحفاظ على هذه المعايير العالية.',
                'good_recommendation' => 'أداء جيد مع مجال للتحسين. ركز على معالجة الثغرات المتبقية.',
                'satisfactory_recommendation' => 'أداء مُرضي ولكن توجد فرص تحسين كبيرة. ضع خطة عمل للمعالجة.',
                'poor_recommendation' => 'يتطلب هذا المجال اهتماماً فورياً. ضع استراتيجية تحسين شاملة.',
                'criteria_status' => 'معايير التقييم',
                'availability_status' => 'حالة التوفر',
                'criteria_availability_status' => 'حالة توفر المعايير',
                'readiness_by_category' => 'الجاهزية حسب الفئة',
                'contact_us' => 'تواصل معنا',
                'contact_us_prompt' => 'لمزيد من التفاصيل أو لمناقشة نتائجك، يرجى التواصل معنا.',
                'phone' => 'الهاتف',
                'email' => 'البريد الإلكتروني',
                'website' => 'الموقع الإلكتروني',
            ]
        ];
    }

    private function t(string $key): string
    {
        return $this->translations[$this->language][$key] ?? $key;
    }

    public function setLogoPath(?string $path): void
    {
        if ($path && file_exists($path)) {
            $this->logoPath = $path;
        }
    }

    public function setAssessmentData($assessment, $results, $user = null): void
    {
        $this->data = [
            'tool_name' => $this->isArabic ? $assessment->tool->name_ar : $assessment->tool->name_en,
            'company_name' => $user->organization->name ?? $assessment->organization ?? ($this->isArabic ? 'مؤسستك' : 'Your Organization'),
            'completion_date' => $this->formatDate($assessment->completed_at ?? now()),
            'overall_percentage' => $results['overall_percentage'] ?? 0,
            'yes_count' => $results['yes_count'] ?? 0,
            'no_count' => $results['no_count'] ?? 0,
            'domain_results' => $results['domain_results'] ?? []
        ];
    }

    private function formatDate($date): string
    {
        if (!$date) $date = now();
        return $this->isArabic ? $date->locale('ar')->translatedFormat('d F Y') : $date->format('F d, Y');
    }

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

    private function createPdfFromHtml(string $html): string
    {
        try {
            $browsershot = Browsershot::html($html)
                ->format('A4')
                ->margins(0, 0, 0, 0)
                ->printBackground()
                ->waitUntilNetworkIdle();

            $chromePath = $this->getChromePath();
            if ($chromePath !== null) $browsershot->setChromePath($chromePath);

            return $browsershot->pdf();
        } catch (\Exception $e) {
            throw new \Exception("Failed to generate PDF: " . $e->getMessage());
        }
    }

    private function buildCompleteHTML(): string
    {
        $this->totalPages = 2 + 3 + count($this->data['domain_results']) + 1; // Cover, Summary, 3 Charts, Domains, Contact
        $this->currentPage = 0;

        $lang = $this->language;
        $dir = $this->isArabic ? 'rtl' : 'ltr';
        $css = $this->getAdvancedCSS();

        $pages = [];
        $pages[] = $this->generateCoverPage();
        $pages[] = $this->generateSummaryPage();
        $pages[] = $this->generateChartPage($this->t('criteria_status'), $this->data['domain_results'], 'total_criteria', ['#3b82f6'], [$this->t('total_criteria')]);
        $pages[] = $this->generateChartPage($this->t('availability_status'), [['name' => $this->t('no'), 'value' => $this->data['no_count']], ['name' => $this->t('yes'), 'value' => $this->data['yes_count']]], 'value', ['#ef4444', '#22c55e'], [$this->t('no'), $this->t('yes')]);
        $pages[] = $this->generateGroupedChartPage($this->t('criteria_availability_status'), $this->data['domain_results'], ['no_count', 'yes_count'], ['#ef4444', '#22c55e'], [$this->t('no'), $this->t('yes')]);

        foreach ($this->data['domain_results'] as $domain) {
            $pages[] = $this->generateDomainPage($domain);
        }

        $pages[] = $this->generateContactPage();

        $htmlContent = implode('', $pages);

        return "<!DOCTYPE html><html lang=\"{$lang}\" dir=\"{$dir}\"><head><meta charset=\"UTF-8\"><title>{$this->data['tool_name']}</title><style>{$css}</style></head><body>{$htmlContent}</body></html>";
    }

    private function getAdvancedCSS(): string
    {
        $fontFamily = $this->isArabic ? "'Amiri', 'Noto Sans Arabic', sans-serif" : "'Helvetica Neue', Arial, sans-serif";
        $textAlign = $this->isArabic ? 'right' : 'left';

        return "
            @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: {$fontFamily}; font-size: 10pt; line-height: 1.5; color: #334155; background: white; direction: " . ($this->isArabic ? 'rtl' : 'ltr') . "; }
            .page { width: 8.5in; height: 11in; margin: 0 auto; background: white; position: relative; page-break-after: always; overflow: hidden; display: flex; flex-direction: column; padding: 40px 50px; }
            .page:last-child { page-break-after: avoid; }
            .page-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #e2e8f0; }
            .header-logo { max-height: 30px; }
            .header-title { font-size: 11pt; font-weight: 600; color: #475569; }
            .page-footer { text-align: center; font-size: 8pt; color: #64748b; padding-top: 10px; border-top: 1px solid #e2e8f0; margin-top: auto; }
            .page-content { flex-grow: 1; padding-top: 30px; }
            .section-title { font-size: 20pt; font-weight: 700; color: #1e3a8a; margin-bottom: 20px; }

            /* Cover Page */
            .cover-page { background: #f1f5f9; justify-content: space-between; padding: 60px; }
            .cover-page .main-content { text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
            .cover-logo { max-width: 180px; max-height: 60px; margin-bottom: 20px; }
            .cover-title { font-size: " . ($this->isArabic ? '38pt' : '40pt') . "; font-weight: 700; line-height: 1.1; margin-bottom: 16px; color: #1e3a8a; }
            .cover-subtitle { font-size: " . ($this->isArabic ? '20pt' : '22pt') . "; font-weight: 400; color: #334155; margin-bottom: 40px; }
            .cover-info { font-size: 12pt; color: #475569; }
            .cover-info strong { color: #1e3a8a; }
            .cover-page::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 8px; background: #2563eb; }

            /* Charts */
            .chart-container { width: 100%; height: 500px; margin-top: 30px; display: flex; flex-direction: column; }
            .chart-body { flex-grow: 1; display: flex; border-left: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; direction: ltr; }
            .y-axis { display: flex; flex-direction: column; justify-content: space-between; padding-right: 10px; font-size: 9pt; color: #64748b; text-align: right; }
            .x-axis { display: flex; justify-content: space-around; padding-top: 8px; font-size: 8pt; font-weight: 600; color: #475569; }
            .chart-bars { flex-grow: 1; display: flex; justify-content: space-around; align-items: flex-end; padding: 0 15px; }
            .bar-group { display: flex; justify-content: center; align-items: flex-end; gap: 4px; height: 100%; flex-grow: 1; margin: 0 10px; }
            .bar { width: 100%; background-color: #3b82f6; border-radius: 3px 3px 0 0; position: relative; }
            .bar-value { position: absolute; top: -18px; width: 100%; text-align: center; font-size: 8pt; font-weight: bold; color: #334155; }
            .legend { display: flex; justify-content: center; gap: 15px; margin-top: 20px; }
            .legend-item { display: flex; align-items: center; gap: 5px; font-size: 9pt; }
            .legend-color { width: 10px; height: 10px; border-radius: 2px; }

            /* Contact Page */
            .contact-page { justify-content: center; align-items: center; text-align: center; background: #1e3a8a; color: white; }
            .contact-title { font-size: 32pt; font-weight: 700; margin-bottom: 20px; }
            .contact-prompt { font-size: 12pt; color: #93c5fd; margin-bottom: 40px; max-width: 500px; }
            .contact-details { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; }
            .contact-item { font-size: 11pt; }
            .contact-item strong { display: block; font-size: 13pt; color: #bfdbfe; margin-bottom: 5px; }
        ";
    }

    private function getPageHeader(string $title): string
    {
        $logoHtml = $this->getLogoHtml();
        return "<div class='page-header'>
            <div>{$logoHtml}</div>
            <div class='header-title'>{$title}</div>
        </div>";
    }

    private function getPageFooter(): string
    {
        $this->currentPage++;
        return "<div class='page-footer'>
            <span>{$this->t('page')} {$this->currentPage} {$this->t('of')} {$this->totalPages}</span>
        </div>";
    }

    private function generateCoverPage(): string
    {
        $logoHtml = $this->getLogoHtml();
        return "<div class=\"page cover-page\">
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

    private function generateSummaryPage(): string { /* Unchanged but will now include header/footer */ return ''; }

    private function generateChartPage(string $title, array $data, string $valueKey, array $colors, array $labels): string
    {
        $header = $this->getPageHeader($title);
        $footer = $this->getPageFooter();

        $maxValue = 0;
        foreach ($data as $item) $maxValue = max($maxValue, $item[$valueKey]);
        $yAxisMax = $maxValue > 0 ? ceil($maxValue / 4) * 4 : 4;

        $yAxisHtml = '';
        for ($i = 4; $i >= 0; $i--) $yAxisHtml .= "<div>" . ($yAxisMax / 4 * $i) . "</div>";

        $barsHtml = '';
        $xAxisHtml = '';
        foreach ($data as $index => $item) {
            $name = $item['domain_name'] ?? $item['name'];
            $height = $yAxisMax > 0 ? ($item[$valueKey] / $yAxisMax) * 100 : 0;
            $color = $colors[$index % count($colors)];
            $barsHtml .= "<div class='bar-group'><div class='bar' style='height: {$height}%; background-color: {$color};'><span class='bar-value'>{$item[$valueKey]}</span></div></div>";
            $xAxisHtml .= "<div>{$name}</div>";
        }

        return "<div class='page'>{$header}<div class='page-content'><div class='section-title'>{$title}</div><div class='chart-container'><div class='chart-body'><div class='y-axis'>{$yAxisHtml}</div><div class='chart-bars'>{$barsHtml}</div></div><div class='x-axis'>{$xAxisHtml}</div></div></div>{$footer}</div>";
    }

    private function generateGroupedChartPage(string $title, array $data, array $valueKeys, array $colors, array $labels): string
    {
        $header = $this->getPageHeader($title);
        $footer = $this->getPageFooter();

        $maxValue = 0;
        foreach ($data as $item) foreach ($valueKeys as $key) $maxValue = max($maxValue, $item[$key]);
        $yAxisMax = $maxValue > 0 ? ceil($maxValue / 4) * 4 : 4;

        $yAxisHtml = '';
        for ($i = 4; $i >= 0; $i--) $yAxisHtml .= "<div>" . ($yAxisMax / 4 * $i) . "</div>";

        $barsHtml = '';
        $xAxisHtml = '';
        foreach ($data as $item) {
            $groupHtml = '';
            foreach ($valueKeys as $index => $key) {
                $height = $yAxisMax > 0 ? ($item[$key] / $yAxisMax) * 100 : 0;
                $color = $colors[$index % count($colors)];
                $groupHtml .= "<div class='bar' style='height: {$height}%; background-color: {$color};'><span class='bar-value'>{$item[$key]}</span></div>";
            }
            $barsHtml .= "<div class='bar-group'>{$groupHtml}</div>";
            $xAxisHtml .= "<div>{$item['domain_name']}</div>";
        }

        $legendHtml = '';
        foreach ($labels as $index => $label) {
            $color = $colors[$index % count($colors)];
            $legendHtml .= "<div class='legend-item'><div class='legend-color' style='background-color: {$color};'></div>{$label}</div>";
        }

        return "<div class='page'>{$header}<div class='page-content'><div class='section-title'>{$title}</div><div class='chart-container'><div class='chart-body'><div class='y-axis'>{$yAxisHtml}</div><div class='chart-bars'>{$barsHtml}</div></div><div class='x-axis'>{$xAxisHtml}</div><div class='legend'>{$legendHtml}</div></div></div>{$footer}</div>";
    }

    private function generateDomainPages(): string
    {
        $pagesHTML = '';
        foreach ($this->data['domain_results'] as $domain) {
            $pagesHTML .= $this->generateSingleDomainPage($domain);
        }
        return $pagesHTML;
    }

    private function generateSingleDomainPage(array $domain): string
    {
        $title = $this->t('readiness_by_category');
        $header = $this->getPageHeader($domain['domain_name']);
        $footer = $this->getPageFooter();

        $data = $domain['category_results'];
        $valueKeys = ['no_count', 'yes_count'];
        $colors = ['#ef4444', '#22c55e'];
        $labels = [$this->t('no'), $this->t('yes')];

        $maxValue = 0;
        foreach ($data as $item) foreach ($valueKeys as $key) $maxValue = max($maxValue, $item[$key]);
        $yAxisMax = $maxValue > 0 ? ceil($maxValue / 4) * 4 : 4;

        $yAxisHtml = '';
        for ($i = 4; $i >= 0; $i--) $yAxisHtml .= "<div>" . ($yAxisMax / 4 * $i) . "</div>";

        $barsHtml = '';
        $xAxisHtml = '';
        foreach ($data as $item) {
            $groupHtml = '';
            foreach ($valueKeys as $index => $key) {
                $height = $yAxisMax > 0 ? ($item[$key] / $yAxisMax) * 100 : 0;
                $color = $colors[$index % count($colors)];
                $groupHtml .= "<div class='bar' style='height: {$height}%; background-color: {$color};'><span class='bar-value'>{$item[$key]}</span></div>";
            }
            $barsHtml .= "<div class='bar-group'>{$groupHtml}</div>";
            $xAxisHtml .= "<div>{$item['category_name']}</div>";
        }

        $legendHtml = '';
        foreach ($labels as $index => $label) {
            $color = $colors[$index % count($colors)];
            $legendHtml .= "<div class='legend-item'><div class='legend-color' style='background-color: {$color};'></div>{$label}</div>";
        }

        return "<div class='page'>{$header}<div class='page-content'><div class='section-title'>{$title}</div><div class='chart-container'><div class='chart-body'><div class='y-axis'>{$yAxisHtml}</div><div class='chart-bars'>{$barsHtml}</div></div><div class='x-axis'>{$xAxisHtml}</div><div class='legend'>{$legendHtml}</div></div></div>{$footer}</div>";
    }

    private function generateContactPage(): string
    {
        $header = $this->getPageHeader($this->t('contact_us'));
        $footer = $this->getPageFooter();
        return "<div class='page contact-page'>
            <div class='contact-title'>{$this->t('contact_us')}</div>
            <p class='contact-prompt'>{$this->t('contact_us_prompt')}</p>
            <div class='contact-details'>
                <div class='contact-item'><strong>{$this->t('phone')}</strong><span>+966 11 123 4567</span></div>
                <div class='contact-item'><strong>{$this->t('email')}</strong><span>info@afaqcm.com</span></div>
                <div class='contact-item'><strong>{$this->t('website')}</strong><span>www.afaqcm.com</span></div>
            </div>
        </div>";
    }

    private function getLogoHtml(): string
    {
        if ($this->logoPath) {
            $type = pathinfo($this->logoPath, PATHINFO_EXTENSION);
            $data = file_get_contents($this->logoPath);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            return "<img src='{$base64}' alt='Company Logo' class='header-logo'>";
        }
        return '';
    }

    // --- Other Helper Methods (getCertificationInfo, etc.) are assumed to be here ---
    private function getCertificationInfo(float $percentage): array { return []; }
    private function getScoreColor(float $percentage): string { return ''; }
    private function generateFilename(): string { return 'report.pdf'; }
    private function getChromePath(): ?string { return null; }
}
