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
        $datetime = $date instanceof \DateTime ? $date : new \DateTime($date);
        return $this->isArabic ? \IntlDateFormatter::formatObject($datetime, 'd MMMM yyyy', 'ar_SA') : $datetime->format('F j, Y');
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
        // Add other pages back in as needed
        // $pages[] = $this->generateSummaryPage();
        // ... loop for domain pages ...
        // $pages[] = $this->generateContactPage();

        $htmlContent = implode('', $pages);

        return "<!DOCTYPE html><html lang=\"{$lang}\" dir=\"{$dir}\"><head><meta charset=\"UTF-8\"><title>{$this->data['tool_name']} {$this->t('assessment_results')}</title><style>{$css}</style></head><body>{$htmlContent}</body></html>";
    }

    private function getAdvancedCSS(): string
    {
        $fontFamily = $this->isArabic ? "'Amiri', 'Noto Sans Arabic', sans-serif" : "'Poppins', 'Calibri', sans-serif";
        $textAlign = $this->isArabic ? 'right' : 'left';

        return "
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }
        body { font-family: {$fontFamily}; font-size: 14px; line-height: 1.6; color: #333; background: white; }

        .page { width: 8.5in; min-height: 11in; margin: 0; background: white; position: relative; page-break-after: always; overflow: hidden; }
        .page:last-child { page-break-after: avoid; }
        .page.full-bleed { padding: 0 !important; }

        .cover-page-content {
            display: flex;
            flex-direction: column;
            height: 100%;
            position: relative;
            color: #0d2a4c;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            overflow: hidden;
        }

        .cover-graphic {
            position: absolute;
            top: 0;
            right: 0;
            width: 65%;
            height: 100%;
            object-fit: cover;
            opacity: 0.07;
            z-index: 0;
            filter: grayscale(100%) contrast(1.1); /* ENHANCEMENT: Grayscale for subtlety */
        }

        html[dir='rtl'] .cover-graphic {
            right: auto;
            left: 0;
        }

        .cover-page-content > * {
            z-index: 2;
            position: relative;
        }

        .cover-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 40px 50px;
            border-bottom: 1px solid #e2e8f0;
        }

        .cover-logo {
            max-width: 150px;
            height: auto;
            transition: transform 0.3s ease; /* ENHANCEMENT: Smooth hover effect for preview */
        }
        .cover-logo:hover {
            transform: scale(1.05);
        }

        .cover-date {
            font-size: 14px;
            font-weight: 500;
            color: #475569;
            background: white;
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .cover-main {
            flex-grow: 1;
            display: flex;
            align-items: center;
            padding: 40px 50px;
        }

        .cover-subtitle {
            font-size: 16px;
            font-weight: 500;
            color: #3b82f6; /* A brighter blue for accent */
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .cover-main h1 {
            font-size: 48px;
            font-weight: 700;
            line-height: 1.2;
            margin: 0;
            color: #0d2a4c;
            text-shadow: 0 1px 2px rgba(255,255,255,0.5);
            max-width: 60%;
        }

        .cover-description {
            font-size: 16px;
            color: #475569;
            margin-top: 16px;
            max-width: 55%;
            line-height: 1.7;
        }

        .cover-footer {
            padding: 30px 50px;
            border-top: 1px solid #e2e8f0;
        }

        .footer-label {
            font-size: 14px;
            font-weight: 500;
            color: #64748b;
            margin-bottom: 4px;
        }

        .company-name {
            font-size: 24px;
            font-weight: 600;
            color: #0d2a4c;
        }

        .footer-meta {
            /* ENHANCEMENT: Flexbox for clean alignment */
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            font-size: 12px;
            color: #94a3b8;
        }

        /* Accent elements for a sharp, geometric look */
        .cover-accent-dot {
            position: absolute;
            width: 8px; height: 8px;
            background: #3b82f6;
            border-radius: 50%;
            top: 50px;
            right: 50px;
            z-index: 3;
        }
        html[dir='rtl'] .cover-accent-dot {
            right: auto;
            left: 50px;
        }

        .cover-accent-line {
            position: absolute;
            width: 100px; height: 1px;
            background: linear-gradient(to right, #3b82f6, transparent);
            top: 53px;
            right: 65px;
            z-index: 3;
        }
        html[dir='rtl'] .cover-accent-line {
            right: auto;
            left: 65px;
            background: linear-gradient(to left, #3b82f6, transparent);
        }
        ";
    }

    private function generateCoverPage(): string
    {
        $logoHtml = $this->getLogoHtml('cover-logo');
        $backgroundGraphicHtml = $this->getBackgroundImageHtml();

        $date = $this->data['completion_date'] ? new \DateTime($this->data['completion_date']) : new \DateTime();
        $formattedDate = $this->formatDate($date);

        $currentYear = date('Y');

        return "
        <div class=\"page full-bleed\">
            <div class=\"cover-page-content\">
                " . $backgroundGraphicHtml . "

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
        $path = storage_path('app/public/waves.png');
        if (file_exists($path)) {
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            return "<img src='{$base64}' alt='Background Graphic' class='cover-graphic'>";
        }
        return '';
    }

    private function getLogoHtml(string $class = 'logo'): string
    {
        if ($this->logoPath && file_exists($this->logoPath)) {
            $type = pathinfo($this->logoPath, PATHINFO_EXTENSION);
            $data = file_get_contents($this->logoPath);
            $base64 = 'data:image/' . ($type === 'svg' ? 'svg+xml' : $type) . ';base64,' . base64_encode($data);
            return "<img src='{$base64}' alt='Company Logo' class='{$class}'>";
        }
        return '';
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
