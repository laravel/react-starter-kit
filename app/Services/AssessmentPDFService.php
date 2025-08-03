<?php

namespace App\Services;

use App\Models\Tool;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;

class AssessmentPDFService
{
    private array $data;
    private string $language;
    private bool $isArabic;
    private array $translations;
    private ?string $logoPath = 'storage/logo.png';
    private ?string $whiteLogoPath = 'storage/logo-white.png';

    public function __construct(string $language = 'en')
    {
        $this->language = $language;
        $this->isArabic = $language === 'ar';
        $this->initializeTranslations();

        $this->data = [
            'tool_id' => null,
            'tool_name' => '',
            'assessment_title' => '',
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

    private function initializeTranslations(): void
    {
        $this->translations = [
            'en' => [
                'assessment_results' => 'Assessment Results',
                'report_for' => 'Report For',
                'completed_on' => 'Completed on',
                'assessment_completed_by' => 'Assessment completed by',
                'for' => 'for',
                'domain_performance_overview' => 'Domain Performance',
                'performance_analysis' => 'Performance Analysis',
                'response_breakdown' => 'Response Breakdown',
                'this_domain_achieved' => 'This domain achieved a score of',
                'which_is_considered' => 'which is considered',
                'recommendation' => 'Recommendation',
                'yes' => 'Yes',
                'no' => 'No',
                'not_applicable' => 'Not Applicable',
                'na' => 'N/A',
                'contact_us_prompt' => 'For more information: Contact Us',
                'overall_score' => 'Overall Score',
                // NEW additions
                'assessment_report' => 'Assessment Report',
                'comprehensive_assessment' => 'Comprehensive Assessment',
                'detailed_analysis_report' => 'Detailed analysis report based on the Abdaliyah Quartet standards.',
                'prepared_for' => 'Prepared For',
                'confidential_report' => 'Confidential Report',
            ],
            'ar' => [
                'assessment_results' => 'نتائج التقييم',
                'report_for' => 'تقرير لـ',
                'completed_on' => 'اكتمل في',
                'assessment_completed_by' => 'تم إكمال التقييم بواسطة',
                'for' => 'لـ',
                'domain_performance_overview' => 'أداء المجالات',
                'performance_analysis' => 'تحليل الأداء',
                'response_breakdown' => 'تفصيل الإجابات',
                'this_domain_achieved' => 'حقق هذا المجال نتيجة',
                'which_is_considered' => 'والتي تعتبر',
                'recommendation' => 'التوصية',
                'yes' => 'نعم',
                'no' => 'لا',
                'not_applicable' => 'غير قابل للتطبيق',
                'na' => 'غ/م',
                'contact_us_prompt' => 'لمزيد من المعلومات: اتصل بنا',
                'overall_score' => 'النتيجة الإجمالية',
                // NEW additions
                'assessment_report' => 'تقرير التقييم',
                'comprehensive_assessment' => 'تقييم شامل',
                'detailed_analysis_report' => 'تقرير تحليل مفصل بناءً على معايير الرباعية العبدلية.',
                'prepared_for' => 'مُعد لـ',
                'confidential_report' => 'تقرير سري',
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

    public function setWhiteLogoPath(?string $path): void
    {
        if ($path && file_exists($path)) {
            $this->whiteLogoPath = $path;
        }
    }

    public function setAssessmentData($assessment, $results, $user = null): void
    {
        $certificationInfo = $this->getCertificationInfo($assessment->tool_id, $results['overall_percentage'] ?? 0);
        $toolName = $this->isArabic ? ($assessment->tool->name_ar ?? 'أداة التقييم') : ($assessment->tool->name_en ?? 'Assessment Tool');
        $assessmentTitle = $this->isArabic ? ($assessment->title_ar ?? $this->t('assessment_results')) : ($assessment->title_en ?? $this->t('assessment_results'));

        $this->data = [
            'tool_id' => $assessment->tool_id,
            'tool_name' => $toolName,
            'assessment_title' => $assessmentTitle,
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

    public function savePDF(string $filename = null): string
    {
        $filename = $filename ?? $this->generateFilename();
        $html = $this->buildCompleteHTML();
        $pdf = $this->createPdfFromHtml($html);

        Storage::disk('public')->put("pdfs/{$filename}", $pdf);
        return "pdfs/{$filename}";
    }

    public function generatePreview(): string
    {
        return $this->buildCompleteHTML();
    }

    private function createPdfFromHtml(string $html): string
    {
        try {
            return Browsershot::html($html)
                ->format('A4')
                ->margins(0, 0, 0, 0)
                ->printBackground()
                ->waitUntilNetworkIdle()
                ->timeout(120)
                ->setDelay(1000)
                ->emulateMedia('print')
                ->setOption('addStyleTag', json_encode(['content' => 'body { -webkit-print-color-adjust: exact; }']))
                ->setOption('args', ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'])
                ->pdf();
        } catch (\Exception $e) {
            throw new \Exception("Failed to generate PDF: " . $e->getMessage());
        }
    }

    private function buildCompleteHTML(): string
    {
        $lang = $this->language;
        $dir = $this->isArabic ? 'rtl' : 'ltr';
        $css = $this->getAdvancedCSS();

        $pages = [];
        $pages[] = $this->generateCoverPage();
        $pages[] = $this->generateToolSummaryPage();
        $pages[] = $this->generateSummaryPage();

        foreach ($this->data['domain_results'] as $index => $domain) {
            $pages[] = $this->generateDomainPage($domain, $index + 1);
        }
        $pages[] = $this->generateContactPage();

        $htmlContent = implode('', $pages);

        return "<!DOCTYPE html><html lang=\"{$lang}\" dir=\"{$dir}\"><head><meta charset=\"UTF-8\"><title>{$this->data['tool_name']} {$this->t('assessment_results')}</title><style>{$css}</style></head><body>{$htmlContent}</body></html>";
    }

    private function getAdvancedCSS(): string
    {
        $fontFamily = $this->isArabic ? "'Amiri', 'Noto Sans Arabic', sans-serif" : "'Poppins', 'Calibri', sans-serif";
        $textAlign = $this->isArabic ? 'right' : 'left';
        $marginDir = $this->isArabic ? 'margin-left' : 'margin-right';
        $flexDir = $this->isArabic ? 'row-reverse' : 'row';

        return "
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: {$fontFamily}; font-size: 14px; line-height: 1.6; color: #333; background: white; }
        .page { width: 8.5in; height: 11in; margin: 0 auto; background: white; position: relative; page-break-after: always; overflow: hidden; padding: 60px; }
        .page:last-child { page-break-after: avoid; }
        /* FIXED: New class to remove padding for full-bleed color pages */
        .page.full-bleed { padding: 0; }
     /* Professional Cover Page Styles */
.cover-page-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    position: relative;
    color: #0d2a4c;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    overflow: hidden;
}

/* Professional wave graphic positioning */
.cover-graphic {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    object-fit: contain;
    opacity: 0.5;
    z-index: 1;
    filter: contrast(1.1);
}

html[dir='rtl'] .cover-graphic {
    right: auto;
    left: 0;
}

/* Ensures all content is above the graphic */
.cover-page-content > * {
    z-index: 2;
    position: relative;
}

/* Professional header with better spacing */
.cover-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 40px 50px 20px 50px;
    border-bottom: 2px solid #e2e8f0;
}

.cover-logo {
    max-width: 180px;
    height: auto;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.cover-date {
    font-size: 16px;
    font-weight: 500;
    color: #64748b;
    background: rgba(255, 255, 255, 0.9);
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Professional main title section */
.cover-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 60px 50px;
}

.cover-main h1 {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
    text-align: left;
    margin: 0;
    color: #0d2a4c;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    max-width: 70%;
    background: linear-gradient(135deg, #0d2a4c 0%, #1e40af 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

html[dir='rtl'] .cover-main h1 {
    text-align: right;
}

/* Professional footer with better hierarchy */
.cover-footer {
    padding: 30px 50px 40px 50px;
    background: rgba(255, 255, 255, 0.95);
    border-top: 2px solid #e2e8f0;
}

.cover-footer > div:first-child {
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
}

.cover-footer .company-name {
    font-size: 28px;
    font-weight: 700;
    color: #0d2a4c;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    margin: 0;
}

/* Add subtle geometric elements for professionalism */
.cover-page-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #0d2a4c, #1e40af, #3b82f6);
    z-index: 3;
}

html[dir='rtl'] .cover-page-content::before {
    left: auto;
    right: 0;
}

.cover-page-content::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #0d2a4c, #1e40af, #3b82f6);
    z-index: 3;
}

/* Professional accent elements */
.cover-accent-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
    top: 50px;
    right: 60px;
    z-index: 3;
}

html[dir='rtl'] .cover-accent-dot {
    right: auto;
    left: 60px;
}

.cover-accent-line {
    position: absolute;
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, #3b82f6, transparent);
    top: 53px;
    right: 80px;
    z-index: 3;
}

html[dir='rtl'] .cover-accent-line {
    right: auto;
    left: 80px;
    background: linear-gradient(to left, #3b82f6, transparent);
}

/* Responsive design for smaller formats */
@media (max-width: 768px) {
    .cover-header,
    .cover-main,
    .cover-footer {
        padding-left: 30px;
        padding-right: 30px;
    }

    .cover-main h1 {
        font-size: 36px;
        max-width: 85%;
    }

    .cover-footer .company-name {
        font-size: 22px;
    }
}

@media print {
    .cover-page-content {
        height: 100vh;
    }

    .cover-graphic {
        opacity: 0.06;
    }
}

        .section-title { font-size: " . ($this->isArabic ? '30px' : '32px') . "; font-weight: 700; color: #0d2a4c; margin-bottom: 24px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px; }
        .section-subtitle { font-size: 16px; color: #546e7a; margin-top: 20px; line-height: 1.7; }

   /* NEW: Styles for the certification status badge */
        .status-container { text-align: center; margin: 30px 0; }
        .certification-status-badge { display: inline-block; padding: 12px 35px; border-radius: 50px; font-size: 22px; font-weight: 700; color: white; }
        .completion-info { text-align: center; font-size: 14px; color: #6c757d; }

 /* NEW: Styles for Category Bar Graph */
        /* In getAdvancedCSS(), replace the old bar graph styles with these */


.bar-chart {
    width: 100%;
    max-width: 600px;
    margin: 1rem 0;
    font-family: 'Arial', sans-serif;
}

.bar-item {
    margin-bottom: 1rem;
}

.bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 4px;
    direction: rtl;
}

.bar-track {
    width: 100%;
    height: 16px;
    background-color: #e5e7eb; /* light gray */
    border-radius: 8px;
    overflow: hidden;
}

.bar-fill {
    height: 100%;
    background-color: #0d2a4c; /* deep blue */
    border-radius: 8px 0 0 8px;
    transition: width 0.3s ease;
}


        .summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; align-items: flex-start; }
        .summary-card { background: #f8f9fa; border-radius: 12px; padding: 25px; height: 100%; }
        .summary-card-title { font-size: 18px; font-weight: 600; color: #343a40; margin-bottom: 20px; }
        .chart-container { display: flex; align-items: center; gap: 25px; flex-direction: {$flexDir}; }
        .doughnut-chart { width: 140px; height: 140px; position: relative; flex-shrink: 0; }
        .doughnut-chart-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
        .doughnut-chart-score { font-size: 28px; font-weight: 700; line-height: 1; }
        .doughnut-chart-label { font-size: 12px; color: #6c757d; }
        .chart-legend { list-style: none; padding: 0; margin: 0; flex-grow: 1; }
        .chart-legend li { display: flex; align-items: center; margin-bottom: 10px; font-size: 14px; flex-direction: {$flexDir}; }
        .legend-marker { width: 12px; height: 12px; border-radius: 3px; {$marginDir}: 10px; }

     /* In getAdvancedCSS(), replace old tool summary styles with these */

       /* Tool intro header - more compact for PDF */
.tool-intro-header {
    text-align: center;
    margin-bottom: 20px;
}

.tool-intro-header h1 {
    font-size: 24px;
    font-weight: 700;
    color: #0d2a4c;
    margin-bottom: 6px;
}

.tool-intro-header p {
    font-size: 14px;
    color: #546e7a;
    max-width: 85%;
    margin: 0 auto;
    line-height: 1.4;
}

/* Compact horizontal domain list */
.domain-list-pro {
    list-style-type: none;
    padding: 0;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}

/* Compact card design - horizontal pill style */
.domain-card-enhanced {
    display: flex;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 25px;
    padding: 12px 20px;
    border: 1px solid #e9ecef;
    border-left: 4px solid #0056b3;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    min-width: 200px;
    max-width: 280px;
    flex: 1;
}

html[dir='rtl'] .domain-card-enhanced {
    border-left: none;
    border-right: 4px solid #0d2a4c;
}

.domain-card-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: #0056b3;
    margin-right: 12px;
}

html[dir='rtl'] .domain-card-icon {
    margin-right: 0;
    margin-left: 12px;
}

.domain-card-text h3 {
    font-size: 14px;
    font-weight: 600;
    color: #343a40;
    margin-bottom: 0;
    line-height: 1.3;
}

.domain-card-text p {
    display: none; /* Hide description for compact view */
}

/* Alternative: Grid layout for better PDF fit */
.domain-list-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
    padding: 0;
    list-style: none;
}

.domain-card-grid {
    display: flex;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 10px 15px;
    border: 1px solid #e9ecef;
    border-left: 3px solid #0056b3;
    text-align: left;
}

html[dir='rtl'] .domain-card-grid {
    border-left: none;
    border-right: 3px solid #0d2a4c;
    text-align: right;
}

.domain-card-grid h3 {
    font-size: 13px;
    font-weight: 600;
    color: #343a40;
    margin: 0;
    line-height: 1.2;
}

/* Vertical Bar Chart Styles - Adjusted for PDF */
.vertical-bar-chart-container {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    gap: 8px;
    padding: 15px 10px;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    margin: 15px 0;
    min-height: 180px;
}

.bar-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 80px;
}

.bar-value {
    font-size: 13px;
    font-weight: 600;
    color: #343a40;
    margin-bottom: 6px;
    min-height: 18px;
}

.bar-container {
    width: 35px;
    height: 120px;
    background-color: #f1f5f9;
    border-radius: 18px;
    border: 1px solid #e2e8f0;
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-bottom: 8px;
}

.bar-fill {
    width: 100%;
    border-radius: 18px;
    background: linear-gradient(to top, #3b82f6, #0d2a4c);
    transition: none; /* Remove animation for PDF */
    min-height: 2px;
}

.bar-label {
    font-size: 10px;
    color: #6c757d;
    margin-bottom: 3px;
    text-align: center;
}

.bar-domain {
    font-size: 11px;
    font-weight: 600;
    color: #343a40;
    text-align: center;
    word-wrap: break-word;
    line-height: 1.1;
    max-width: 70px;
}

/* PDF optimized styles */
@media print {
    .tool-intro-header {
        margin-bottom: 15px;
    }

    .domain-list-pro {
        margin-bottom: 15px;
    }

    .vertical-bar-chart-container {
        min-height: 160px;
        margin: 10px 0;
    }

    .bar-container {
        height: 100px;
    }
}
    /* Vertical Bar Chart Styles */
.vertical-bar-chart-container {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    gap: 10px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    margin: 20px 0;
    min-height: 50%;
}

.bar-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 50px;
}

.bar-value {
    font-size: 14px;
    font-weight: 600;
    color: #343a40;
    margin-bottom: 8px;
    min-height: 20px;
}

.bar-container {
    width: 40px;
    height: 100px;
    background-color: #f1f5f9;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-bottom: 12px;
}

.bar-fill {
    width: 100%;
    border-radius: 20px;
    background: linear-gradient(to top, #3b82f6, #0d2a4c);
    transition: height 0.3s ease-in-out;
    min-height: 2px;
}

.bar-label {
    font-size: 12px;
    color: #6c757d;
    margin-bottom: 4px;
    text-align: center;
}

.bar-domain {
    font-size: 13px;
    font-weight: 600;
    color: #343a40;
    text-align: center;
    word-wrap: break-word;
    line-height: 1.2;
}

/* Responsive design */
@media (max-width: 768px) {
    .vertical-bar-chart-container {
        gap: 10px;
        padding: 0px;
        min-height: 350px;
    }

    .bar-column {
        max-width: 60px;
    }

    .bar-container {
        width: 30px;
        height: 250px;
    }

    .bar-domain {
        font-size: 11px;
    }

    .bar-value {
        font-size: 12px;
    }
}

        .domain-perf-item { margin-bottom: 15px; }
        .domain-perf-title { font-size: 14px; font-weight: 600; margin-bottom: 5px; display: flex; justify-content: space-between; }
        .domain-perf-bar-bg { width: 100%; height: 18px; background: #e9ecef; border-radius: 9px; overflow: hidden; }
        .domain-perf-bar-fill { height: 100%; border-radius: 9px; }

        .domain-header { display: flex; align-items: center; margin-bottom: 40px; gap: 20px; flex-direction: {$flexDir}; }
        .domain-icon { width: 60px; height: 60px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 24px; flex-shrink: 0; }
        .domain-details { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px; }
        .detail-card { background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; }
        .card-title { font-size: 16px; font-weight: 700; color: #343a40; margin-bottom: 12px; }
        .card-content { font-size: 14px; line-height: 1.7; color: #495057; }
        .response-bar { display: flex; width: 100%; height: 24px; border-radius: 12px; overflow: hidden; background-color: #e9ecef; margin-bottom: 12px; flex-direction: {$flexDir}; }
        .bar-segment { height: 100%; }
        .bar-legend { display: flex; justify-content: center; gap: 20px; margin-top: 16px; font-size: 12px; }
        .legend-item { display: flex; align-items: center; gap: 6px; }
        .legend-color { width: 12px; height: 12px; border-radius: 3px; }

        .contact-page-content { align-items: center; text-align: center; margin-top: 45%; }
        .contact-logo { max-width: 320px; margin-bottom: 40px; }
        .contact-title { font-size: 22pt; font-weight: 700; margin-bottom: 40px; color: #0d2a4c; }
        .contact-details { display: flex; justify-content: center; align-items: center; gap: 40px; width: 100%; flex-wrap: wrap; }
        .contact-item { display: flex; align-items: center; gap: 12px; font-size: 11pt; color: #0d2a4c; flex-direction: {$flexDir}; }
        .contact-icon-wrapper { width: 40px; height: 40px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; }
        .contact-icon { height: 20px; width: 20px; }
        ";
    }

    private function generateCoverPage(): string
    {
        $logoHtml = $this->getLogoHtml('cover-logo');
        $backgroundGraphicHtml = $this->getBackgroundImageHtml();

        // Format the date professionally
        $formattedDate = date('F j, Y', strtotime($this->data['completion_date']));

        return "
    <div class=\"page full-bleed\">
        <div class=\"cover-page-content\">
            " . $backgroundGraphicHtml . "

            <!-- Professional accent elements -->
            <div class=\"cover-accent-dot\"></div>
            <div class=\"cover-accent-line\"></div>

            <header class=\"cover-header\">
                " . $logoHtml . "
                <div class=\"cover-date\">{$formattedDate}</div>
            </header>

            <main class=\"cover-main\">
                <h1>{$this->data['tool_name']}</h1>
            </main>

            <footer class=\"cover-footer\">
                <div>" . $this->t('assessment_report') . "</div>
                <div class=\"company-name\">{$this->data['company_name']}</div>
            </footer>
        </div>
    </div>";
    }

// Alternative version with additional professional elements
    private function generateProfessionalCoverPage(): string
    {
        $logoHtml = $this->getLogoHtml('cover-logo');
        $backgroundGraphicHtml = $this->getBackgroundImageHtml();

        // Format the date professionally
        $formattedDate = date('F j, Y', strtotime($this->data['completion_date']));

        // Get current year for footer
        $currentYear = date('Y');

        return "
    <div class=\"page full-bleed\">
        <div class=\"cover-page-content\">
            " . $backgroundGraphicHtml . "

            <!-- Professional accent elements -->
            <div class=\"cover-accent-dot\"></div>
            <div class=\"cover-accent-line\"></div>

            <header class=\"cover-header\">
                " . $logoHtml . "
                <div class=\"cover-date\">{$formattedDate}</div>
            </header>

            <main class=\"cover-main\">
                <div class=\"cover-title-section\">
                    <div class=\"cover-subtitle\">" . $this->t('comprehensive_assessment') . "</div>
                    <h1>{$this->data['tool_name']}</h1>
                    <div class=\"cover-description\">" . $this->t('detailed_analysis_report') . "</div>
                </div>
            </main>

            <footer class=\"cover-footer\">
                <div class=\"footer-label\">" . $this->t('prepared_for') . "</div>
                <div class=\"company-name\">{$this->data['company_name']}</div>
                <div class=\"footer-meta\">
                    <span>" . $this->t('confidential_report') . "</span>
                    <span>© {$currentYear}</span>
                </div>
            </footer>
        </div>
    </div>";
    }

    private function getBackgroundImageHtml(): string
    {
        $path = storage_path('app/public/waves-blue.png');
        if (file_exists($path)) {
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            return "<img src='{$base64}' alt='Background Graphic' class='cover-graphic'>";
        }
        return '';
    }
    private function generateToolSummaryPage(): string
    {
        $tool = Tool::find($this->data['tool_id']);
        if (!$tool) return '';

        $tool_name = $this->isArabic ? $tool->name_ar : $tool->name_en;
        $tool_description = $this->isArabic ? $tool->description_ar : $tool->description_en;

        // Option 1: Horizontal pill layout
        $domainsHTML = '';
        foreach ($tool->domains as $index => $domain) {
            $domain_name = $this->isArabic ? $domain->name_ar : $domain->name_en;

            $domainsHTML .= "
        <div class='domain-card-enhanced'>
            <div class='domain-card-text'>
                <h3>{$domain_name}</h3>
            </div>
        </div>";
        }

        // Option 2: Grid layout (uncomment to use instead)
        /*
        $domainsHTML = '';
        foreach ($tool->domains as $index => $domain) {
            $domain_name = $this->isArabic ? $domain->name_ar : $domain->name_en;

            $domainsHTML .= "
            <div class='domain-card-grid'>
                <h3>{$domain_name}</h3>
            </div>";
        }
        */

        $chartHTML = $this->generateCriteriaBarGraph();

        return "
    <div class='page'>
        <div class='section-title'>{$this->t('assessment_standards')}</div>

        <div class='tool-intro-header'>
            <h1>{$tool_name}</h1>
            <p>{$tool_description}</p>
        </div>

        <div class='domain-list-pro'>
            {$domainsHTML}
        </div>

        <div>{$chartHTML}</div>
    </div>";
    }

// Alternative version using grid layout
    private function generateToolSummaryPageGrid(): string
    {
        $tool = Tool::find($this->data['tool_id']);
        if (!$tool) return '';

        $tool_name = $this->isArabic ? $tool->name_ar : $tool->name_en;
        $tool_description = $this->isArabic ? $tool->description_ar : $tool->description_en;

        $domainsHTML = '';
        foreach ($tool->domains as $index => $domain) {
            $domain_name = $this->isArabic ? $domain->name_ar : $domain->name_en;

            $domainsHTML .= "
        <div class='domain-card-grid'>
            <h3>{$domain_name}</h3>
        </div>";
        }

        $chartHTML = $this->generateCriteriaBarGraph();

        return "
    <div class='page'>
        <div class='section-title'>{$this->t('assessment_standards')}</div>

        <div class='tool-intro-header'>
            <h1>{$tool_name}</h1>
            <p>{$tool_description}</p>
        </div>

        <div class='domain-list-grid'>
            {$domainsHTML}
        </div>

        <div>{$chartHTML}</div>
    </div>";
    }

    /**
     * Generates a bar graph showing the total number of criteria per domain.
     * This is a replacement for generateCategoryBarGraph.
     */
    /**
     * Generates a bar graph showing the total number of criteria per domain.
     * This is a replacement for generateCategoryBarGraph.
     */
    private function generateCriteriaBarGraph(): string
    {
        // Eager load domains, their categories, and the count of criteria for each category
        $tool = Tool::with(['domains' => function ($query) {
            $query->with(['categories' => function ($subQuery) {
                $subQuery->withCount('criteria');
            }])->orderBy('order');
        }])->find($this->data['tool_id']);

        if (!$tool || $tool->domains->isEmpty()) {
            return '<p>No domains found for this tool.</p>';
        }

        // First, calculate the total criteria for each domain and find the maximum
        $domainCriteriaCounts = $tool->domains->map(function ($domain) {
            // Sum the criteria_count from each of the domain's categories
            return $domain->categories->sum('criteria_count');
        });

        $maxCriteria = $domainCriteriaCounts->max();
        if ($maxCriteria == 0) $maxCriteria = 1; // Avoid division by zero

        $graphHtml = '<div class="vertical-bar-chart-container">';

        foreach ($tool->domains as $index => $domain) {
            $domainName = $this->isArabic ? $domain->name_ar : $domain->name_en;
            // Get the pre-calculated criteria count for the current domain
            $criteriaCount = $domainCriteriaCounts[$index];
            $barHeight = ($criteriaCount / $maxCriteria) * 100;

            $graphHtml .= "
            <div class='bar-column'>
                <div class='bar-value'>{$criteriaCount}</div>
                <div class='bar-container'>
                    <div class='bar-fill' style='height: {$barHeight}%;'></div>
                </div>
                <div class='bar-label'>{$this->t('criteria')}</div>
                <div class='bar-domain'>{$domainName}</div>
            </div>";
        }

        $graphHtml .= '</div>';
        return $graphHtml;
    }
    /**
     * Returns an SVG icon for a domain based on its index.
     */
    private function getDomainIconSVG(int $index): string
    {
        $icons = [
            // Icon 1: Structure
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8M5 22V12M19 22V16M5 12L12 8L19 12M5 12V8H19V12H5Z"></path></svg>',
            // Icon 2: Process
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6V3M12 21V18M12 12H21M3 12H12M18 18L15 15M6 6L9 9M18 6L15 9M6 18L9 15"></path></svg>',
            // Icon 3: Innovation & Technology
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69zM12 12a3 3 0 100-6 3 3 0 000 6z"></path></svg>',
            // Icon 4: Impact
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4zM4 12h16M12 4v16"></path></svg>'
        ];
        // Return icon based on index, or the last icon as a default
        return $icons[$index % count($icons)] ?? end($icons);
    }

    private function generateSummaryPage(): string
    {
        $leftCard = "<div class=\"summary-card\">
            <div class=\"summary-card-title\">{$this->t('response_breakdown')}</div>
            <div class=\"chart-container\">" . $this->generateDoughnutChart() . "</div>
        </div>";

        $domainsHTML = '';
        foreach ($this->data['domain_results'] as $domain) {
            $scoreColor = $this->getScoreColor($this->data['tool_id'], $domain['score_percentage']);
            $score = round($domain['score_percentage']);
            $domainsHTML .= "<div class=\"domain-perf-item\">
                <div class=\"domain-perf-title\">
                    <span>{$domain['domain_name']}</span>
                    <span style=\"color: {$scoreColor};\">{$score}%</span>
                </div>
                <div class=\"domain-perf-bar-bg\"><div class=\"domain-perf-bar-fill\" style=\"width: {$score}%; background-color: {$scoreColor};\"></div></div>
            </div>";
        }
        $rightCard = "<div class=\"summary-card\">
            <div class=\"summary-card-title\">{$this->t('domain_performance_overview')}</div>
            {$domainsHTML}
        </div>";

        $gridContent = $this->isArabic ? $rightCard . $leftCard : $leftCard . $rightCard;

        // NEW: Get dynamic certification text and color
        $certificationText = $this->data['certification_text'];
        $certificationColor = $this->data['certification_color'];

        return "<div class=\"page\">
            <div class=\"section-title\">{$this->t('assessment_results')}</div>
            <div class=\"summary-grid\">{$gridContent}</div>

            <div class='status-container'>
                <div class='certification-status-badge' style='background-color: {$certificationColor};'>
                    {$certificationText}
                </div>
            </div>

            <div class=\"completion-info\">

            </div>
        </div>";
    }
    /**
     * Returns an SVG icon for a domain based on its index.
     */


    private function generateDoughnutChart(): string
    {
        $yes = $this->data['yes_count'];
        $no = $this->data['no_count'];
        $na = $this->data['na_count'];
        $total = $yes + $no + $na;
        if ($total == 0) return '';

        $yes_pct = $yes / $total;
        $no_pct = $no / $total;

        $circumference = 2 * M_PI * 40;
        $yes_dash = $yes_pct * $circumference;
        $no_dash = $no_pct * $circumference;

        $yes_offset = 0;
        $no_offset = -$yes_dash;
        $na_offset = -$yes_dash - $no_dash;

        $chart_svg = "<div class=\"doughnut-chart\">
            <svg viewBox=\"0 0 100 100\">
                <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"#e9ecef\" stroke-width=\"12\"></circle>
                <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"12\" stroke-dasharray=\"{$circumference}\" stroke-dashoffset=\"{$yes_offset}\" transform=\"rotate(-90 50 50)\" stroke-linecap=\"round\"></circle>
                <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"#F44336\" stroke-width=\"12\" stroke-dasharray=\"{$circumference}\" stroke-dashoffset=\"{$no_offset}\" transform=\"rotate(-90 50 50)\" stroke-linecap=\"round\"></circle>
                <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"#9E9E9E\" stroke-width=\"12\" stroke-dasharray=\"{$circumference}\" stroke-dashoffset=\"{$na_offset}\" transform=\"rotate(-90 50 50)\" stroke-linecap=\"round\"></circle>
            </svg>
            <div class=\"doughnut-chart-center\">
                <div class=\"doughnut-chart-score\" style=\"color: {$this->data['certification_color']};\">" . round($this->data['overall_percentage']) . "%</div>
                <div class=\"doughnut-chart-label\">{$this->t('overall_score')}</div>
            </div>
        </div>";

        $legend_html = "<ul class=\"chart-legend\">
            <li><span class=\"legend-marker\" style=\"background-color: #4CAF50;\"></span><span>{$this->t('yes')} ({$yes})</span></li>
            <li><span class=\"legend-marker\" style=\"background-color: #F44336;\"></span><span>{$this->t('no')} ({$no})</span></li>
            <li><span class=\"legend-marker\" style=\"background-color: #9E9E9E;\"></span><span>{$this->t('na')} ({$na})</span></li>
        </ul>";

        return $chart_svg . $legend_html;
    }

    private function generateDomainPage(array $domain, int $domainNumber): string
    {
        $scoreColor = $this->getScoreColor($this->data['tool_id'], $domain['score_percentage']);
        $performanceLevel = $this->getPerformanceLevel($this->data['tool_id'], $domain['score_percentage']);
        $recommendation = $this->getPerformanceRecommendation($this->data['tool_id'], $domain['score_percentage']);

        $totalResponses = $domain['yes_count'] + $domain['no_count'] + $domain['na_count'];
        $yesPercent = $totalResponses > 0 ? ($domain['yes_count'] / $totalResponses) * 100 : 0;
        $noPercent = $totalResponses > 0 ? ($domain['no_count'] / $totalResponses) * 100 : 0;
        $naPercent = $totalResponses > 0 ? ($domain['na_count'] / $totalResponses) * 100 : 0;

        $barSegments = $this->isArabic
            ? "<div class='bar-segment' style='width: {$yesPercent}%; background-color: #4CAF50;'></div><div class='bar-segment' style='width: {$noPercent}%; background-color: #F44336;'></div><div class='bar-segment' style='width: {$naPercent}%; background-color: #9E9E9E;'></div>"
            : "<div class='bar-segment' style='width: {$naPercent}%; background-color: #9E9E9E;'></div><div class='bar-segment' style='width: {$noPercent}%; background-color: #F44336;'></div><div class='bar-segment' style='width: {$yesPercent}%; background-color: #4CAF50;'></div>";

        $responseBreakdownHtml = "<div class='response-bar'>{$barSegments}</div>
            <div class='bar-legend'>
                <div class='legend-item'><div class='legend-color' style='background-color: #4CAF50;'></div>{$this->t('yes')} ({$domain['yes_count']})</div>
                <div class='legend-item'><div class='legend-color' style='background-color: #F44336;'></div>{$this->t('no')} ({$domain['no_count']})</div>
                <div class='legend-item'><div class='legend-color' style='background-color: #9E9E9E;'></div>{$this->t('not_applicable')} ({$domain['na_count']})</div>
            </div>";

        return "<div class=\"page domain-page\">
            <div class=\"domain-header\">
                <div class=\"domain-icon\" style=\"background-color: {$scoreColor};\">{$domainNumber}</div>
                <div class=\"section-title\" style=\"margin-bottom: 0; border: none; padding-bottom: 0;\">{$domain['domain_name']}</div>
            </div>
            <div class=\"domain-details\">
                <div class=\"detail-card\">
                    <div class=\"card-title\">{$this->t('performance_analysis')}</div>
                    <div class=\"card-content\">
                        <p>{$this->t('this_domain_achieved')} <strong style=\"color:{$scoreColor}\">" . round($domain['score_percentage']) . "%</strong>, {$this->t('which_is_considered')} <strong>" . $performanceLevel . "</strong>.</p>
                        <p>{$recommendation}</p>
                    </div>
                </div>
                <div class=\"detail-card\">
                    <div class=\"card-title\">{$this->t('response_breakdown')}</div>
                    <div class=\"card-content\">{$responseBreakdownHtml}</div>
                </div>
            </div>
        </div>";
    }

    private function generateContactPage(): string
    {
        $logoHtml = $this->getLogoHtml('contact-logo');
        $phoneIcon = $this->getIconSVG('phone');
        $twitterIcon = $this->getIconSVG('twitter');
        $emailIcon = $this->getIconSVG('email');
        $flexDir = $this->isArabic ? 'row-reverse' : 'row';

        return "<div class='page full-bleed'><div class='contact-page-content'>
                {$logoHtml}
                <div class='contact-title'>{$this->t('contact_us_prompt')}</div>
                <div class='contact-details'>
                    <div class='contact-item' style='flex-direction: {$flexDir}'><span>+966554834833</span><div class='contact-icon-wrapper'>{$phoneIcon}</div></div>
                    <div class='contact-item' style='flex-direction: {$flexDir}'><span>@afaqcm</span><div class='contact-icon-wrapper'>{$twitterIcon}</div></div>
                    <div class='contact-item' style='flex-direction: {$flexDir}'><span>info@afaqcm.com</span><div class='contact-icon-wrapper'>{$emailIcon}</div></div>
                </div>
            </div></div>";
    }

    private function getWhiteLogoHtml(string $class = 'contact-logo'): string
    {
        $path = $this->whiteLogoPath ?? $this->logoPath;
        if ($path && file_exists($path)) {
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . ($type === 'svg' ? 'svg+xml' : $type) . ';base64,' . base64_encode($data);
            return "<img src='{$base64}' alt='Company Logo' class='{$class}'>";
        }
        return '';
    }

    private function getLogoHtml(string $class = 'contact-logo'): string
    {
        $path = $this->LogoPath ?? $this->logoPath;
        if ($path && file_exists($path)) {
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . ($type === 'svg' ? 'svg+xml' : $type) . ';base64,' . base64_encode($data);
            return "<img src='{$base64}' alt='Company Logo' class='{$class}'>";
        }
        return '';
    }

    private function getIconSVG(string $iconName): string
    {
        $icons = [
            'phone' => '<svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>',
            'twitter' => '<svg class="contact-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>',
            'email' => '<svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
        ];
        return $icons[$iconName] ?? '';
    }

    private function getCertificationInfo(int $toolId, float $percentage): array
    {
        $tool = Tool::find($toolId);
        if (!$tool) return ['level' => 'unknown', 'color' => '#6c757d', 'text' => 'Tool Not Found', 'recommendation' => ''];
        $level = $tool->getPerformanceByScore($percentage);
        if (!$level) return ['level' => 'unclassified', 'color' => '#6c757d', 'text' => 'Unclassified', 'recommendation' => ''];
        return [
            'level' => $level->code, 'color' => $level->color,
            'text' => $this->isArabic ? $level->text_ar : $level->text_en,
            'recommendation' => $this->isArabic ? $level->recommendation_ar : $level->recommendation_en
        ];
    }

    private function getScoreColor(int $toolId, float $percentage): string
    {
        return $this->getCertificationInfo($toolId, $percentage)['color'] ?? '#6c757d';
    }

    private function getPerformanceLevel(int $toolId, float $percentage): string
    {
        return $this->getCertificationInfo($toolId, $percentage)['text'] ?? 'Unclassified';
    }

    private function getPerformanceRecommendation(int $toolId, float $percentage): string
    {
        return $this->getCertificationInfo($toolId, $percentage)['recommendation'] ?? '';
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
}
