<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Mpdf\Mpdf;

class AssessmentPDFController extends Controller
{
    /**
     * Generate PDF report for assessment - Simple version
     */
    public function downloadReport(Request $request, Assessment $assessment)
    {
        // Basic validation
        $settings = $request->validate([
            'language' => 'in:arabic,english,bilingual',
            'template' => 'in:comprehensive,summary,detailed',
            'include_charts' => 'boolean',
            'include_recommendations' => 'boolean',
            'watermark' => 'boolean',
        ]);

        // Set defaults
        $settings = array_merge([
            'language' => 'arabic',
            'template' => 'comprehensive',
            'include_charts' => true,
            'include_recommendations' => true,
            'watermark' => false,
        ], $settings);

        try {
            // Load assessment with relationships
            $assessment->load(['tool', 'responses', 'results']);

            // Calculate results if not already calculated
            if ($assessment->results->isEmpty()) {
                $assessment->calculateResults();
                $assessment->refresh();
            }

            // Get assessment results
            $results = $assessment->getResults();

            // Generate HTML content
            $html = $this->generateHTML($assessment, $results, $settings);

            // Create PDF
            $pdf = $this->createPDF($html, $settings);

            // Generate filename
            $filename = $this->generateFilename($assessment, $settings);

            return response($pdf, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            ]);

        } catch (\Exception $e) {
            \Log::error('PDF Generation Error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to generate PDF report'], 500);
        }
    }

    /**
     * Generate HTML content for PDF
     */
    private function generateHTML(Assessment $assessment, array $results, array $settings): string
    {
        $isArabic = $settings['language'] === 'arabic';

        // Get certification level
        $certification = $this->getCertificationLevel($results['overall_percentage']);

        // Generate recommendations
        $recommendations = $settings['include_recommendations']
            ? $this->generateRecommendations($results['domain_results'], $isArabic)
            : [];

        // Create HTML content
        $html = $this->buildHTMLTemplate($assessment, $results, $certification, $recommendations, $settings);

        return $html;
    }

    /**
     * Build HTML template
     */
    private function buildHTMLTemplate(Assessment $assessment, array $results, array $certification, array $recommendations, array $settings): string
    {
        $isArabic = $settings['language'] === 'arabic';
        $dir = $isArabic ? 'rtl' : 'ltr';
        $lang = $isArabic ? 'ar' : 'en';

        $html = "
<!DOCTYPE html>
<html dir='{$dir}' lang='{$lang}'>
<head>
    <meta charset='UTF-8'>
    <title>" . ($isArabic ? 'تقرير التقييم' : 'Assessment Report') . "</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            line-height: 1.6;
            color: #333;
            direction: {$dir};
        }
        .header {
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            color: white;
            padding: 30px;
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #1e40af;
            font-size: 18px;
            margin-bottom: 15px;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 5px;
        }
        .client-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .score-card {
            background: #f0f7ff;
            border: 2px solid #3b82f6;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .overall-score {
            font-size: 48px;
            font-weight: bold;
            color: {$certification['color']};
            margin-bottom: 10px;
        }
        .cert-badge {
            background-color: {$certification['bg_color']};
            color: {$certification['color']};
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
        }
        .domain-card {
            border: 1px solid #e5e7eb;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        .domain-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .domain-name {
            font-weight: bold;
            font-size: 16px;
        }
        .domain-score {
            font-size: 18px;
            font-weight: bold;
        }
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e);
            border-radius: 10px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin-top: 10px;
        }
        .stat-item {
            text-align: center;
            padding: 10px;
            border-radius: 5px;
        }
        .stat-yes { background-color: #dcfce7; color: #166534; }
        .stat-no { background-color: #fee2e2; color: #dc2626; }
        .stat-na { background-color: #f3f4f6; color: #6b7280; }
        .recommendations {
            background: #fffbeb;
            border: 1px solid #fbbf24;
            padding: 15px;
            border-radius: 8px;
        }
        .recommendation-item {
            margin-bottom: 10px;
            padding: 10px;
            background: white;
            border-left: 4px solid #f59e0b;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #f8f9fa;
            color: #666;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class='header'>
        <h1>" . ($isArabic ? 'تقرير التقييم النهائي' : 'Final Assessment Report') . "</h1>
        <h2>" . ($isArabic ? $assessment->tool->name_ar : $assessment->tool->name_en) . "</h2>
        <p>" . ($isArabic ? 'التاريخ: ' : 'Date: ') . date('Y/m/d') . "</p>
    </div>

    <!-- Client Information -->
    <div class='section'>
        <h2>" . ($isArabic ? 'معلومات العميل' : 'Client Information') . "</h2>
        <div class='client-info'>
            <p><strong>" . ($isArabic ? 'الاسم: ' : 'Name: ') . "</strong>" . $assessment->getAssessorName() . "</p>
            <p><strong>" . ($isArabic ? 'البريد الإلكتروني: ' : 'Email: ') . "</strong>" . $assessment->getAssessorEmail() . "</p>
            " . ($assessment->organization ? "<p><strong>" . ($isArabic ? 'المؤسسة: ' : 'Organization: ') . "</strong>" . $assessment->organization . "</p>" : "") . "
            <p><strong>" . ($isArabic ? 'تاريخ التقييم: ' : 'Assessment Date: ') . "</strong>" . $assessment->created_at->format('Y/m/d') . "</p>
        </div>
    </div>

    <!-- Overall Score -->
    <div class='section'>
        <h2>" . ($isArabic ? 'النتيجة الإجمالية' : 'Overall Score') . "</h2>
        <div class='score-card'>
            <div class='overall-score'>" . number_format($results['overall_percentage'], 1) . "%</div>
            <div class='cert-badge'>" . $certification['text'] . "</div>
            <div class='stats-grid' style='margin-top: 20px;'>
                <div class='stat-item stat-yes'>
                    <div style='font-size: 20px; font-weight: bold;'>" . $results['yes_count'] . "</div>
                    <div>" . ($isArabic ? 'نعم' : 'Yes') . "</div>
                </div>
                <div class='stat-item stat-no'>
                    <div style='font-size: 20px; font-weight: bold;'>" . $results['no_count'] . "</div>
                    <div>" . ($isArabic ? 'لا' : 'No') . "</div>
                </div>
                <div class='stat-item stat-na'>
                    <div style='font-size: 20px; font-weight: bold;'>" . $results['na_count'] . "</div>
                    <div>" . ($isArabic ? 'غير قابل' : 'N/A') . "</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Domain Results -->
    <div class='section'>
        <h2>" . ($isArabic ? 'النتائج التفصيلية' : 'Detailed Results') . "</h2>";

        // Domain results loop
        foreach ($results['domain_results'] as $domain) {
            $scoreColor = $this->getScoreColor($domain['score_percentage']);
            $html .= "
        <div class='domain-card'>
            <div class='domain-header'>
                <div class='domain-name'>" . $domain['domain_name'] . "</div>
                <div class='domain-score' style='color: {$scoreColor};'>" . number_format($domain['score_percentage'], 1) . "%</div>
            </div>
            <div class='progress-bar'>
                <div class='progress-fill' style='width: " . $domain['score_percentage'] . "%;'></div>
            </div>
            <div class='stats-grid'>
                <div class='stat-item stat-yes'>
                    <div style='font-weight: bold;'>" . $domain['yes_count'] . "</div>
                    <div style='font-size: 12px;'>" . ($isArabic ? 'نعم' : 'Yes') . "</div>
                </div>
                <div class='stat-item stat-no'>
                    <div style='font-weight: bold;'>" . $domain['no_count'] . "</div>
                    <div style='font-size: 12px;'>" . ($isArabic ? 'لا' : 'No') . "</div>
                </div>
                <div class='stat-item stat-na'>
                    <div style='font-weight: bold;'>" . $domain['na_count'] . "</div>
                    <div style='font-size: 12px;'>" . ($isArabic ? 'غير قابل' : 'N/A') . "</div>
                </div>
            </div>
        </div>";
        }

        $html .= "
    </div>";

        // Add recommendations if enabled
        if (!empty($recommendations)) {
            $html .= "
    <!-- Recommendations -->
    <div class='section'>
        <h2>" . ($isArabic ? 'التوصيات' : 'Recommendations') . "</h2>
        <div class='recommendations'>";

            foreach ($recommendations as $recommendation) {
                $html .= "
            <div class='recommendation-item'>
                <strong>" . $recommendation['domain'] . ":</strong>
                " . $recommendation['text'] . "
            </div>";
            }

            $html .= "
        </div>
    </div>";
        }

        $html .= "
    <!-- Footer -->
    <div class='footer'>
        <p>" . ($isArabic ? 'هذا التقرير تم إنتاجه بواسطة نظام التقييم الآلي' : 'This report was generated by the automated assessment system') . "</p>
        <p>" . ($isArabic ? 'تاريخ الإنتاج: ' : 'Generated on: ') . now()->format('Y/m/d H:i') . "</p>
    </div>
</body>
</html>";

        return $html;
    }

    /**
     * Create PDF using mPDF
     */
    private function createPDF(string $html, array $settings): string
    {
        $isArabic = $settings['language'] === 'arabic';

        $config = [
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 11,
            'default_font' => 'dejavusans',
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 20,
            'margin_bottom' => 20,
            'margin_header' => 10,
            'margin_footer' => 10,
            'dir' => $isArabic ? 'rtl' : 'ltr',
        ];

        $mpdf = new Mpdf($config);

        // Set document properties
        $mpdf->SetTitle($isArabic ? 'تقرير التقييم' : 'Assessment Report');
        $mpdf->SetAuthor('Assessment System');

        // Add watermark if requested
        if ($settings['watermark']) {
            $mpdf->SetWatermarkText($isArabic ? 'سري' : 'CONFIDENTIAL');
            $mpdf->watermarkTextAlpha = 0.1;
            $mpdf->showWatermarkText = true;
        }

        $mpdf->WriteHTML($html);

        return $mpdf->Output('', 'S'); // Return as string
    }

    /**
     * Get certification level
     */
    private function getCertificationLevel(float $score): array
    {
        if ($score >= 90) {
            return [
                'text' => 'اعتماد كامل', // Full Certification
                'color' => '#22c55e',
                'bg_color' => '#dcfce7'
            ];
        } elseif ($score >= 80) {
            return [
                'text' => 'اعتماد مشروط', // Conditional Certification
                'color' => '#f59e0b',
                'bg_color' => '#fef3c7'
            ];
        } else {
            return [
                'text' => 'اعتماد مرفوض', // Certification Denied
                'color' => '#ef4444',
                'bg_color' => '#fee2e2'
            ];
        }
    }

    /**
     * Get score color
     */
    private function getScoreColor(float $score): string
    {
        if ($score >= 80) return '#22c55e'; // Green
        if ($score >= 60) return '#f59e0b'; // Amber
        if ($score >= 40) return '#ef4444'; // Red
        return '#6b7280'; // Gray
    }

    /**
     * Generate simple recommendations
     */
    private function generateRecommendations(array $domainResults, bool $isArabic): array
    {
        $recommendations = [];

        foreach ($domainResults as $domain) {
            if ($domain['score_percentage'] < 70) {
                $recommendations[] = [
                    'domain' => $domain['domain_name'],
                    'text' => $isArabic
                        ? "النتيجة {$domain['score_percentage']}% - يتطلب تحسين هذا المجال لرفع الأداء"
                        : "Score {$domain['score_percentage']}% - This domain requires improvement to enhance performance"
                ];
            }
        }

        if (empty($recommendations)) {
            $recommendations[] = [
                'domain' => $isArabic ? 'الأداء العام' : 'Overall Performance',
                'text' => $isArabic
                    ? 'أداء ممتاز! استمر في الحفاظ على هذه المعايير العالية'
                    : 'Excellent performance! Continue maintaining these high standards'
            ];
        }

        return $recommendations;
    }

    /**
     * Generate filename
     */
    private function generateFilename(Assessment $assessment, array $settings): string
    {
        $assessorName = str_replace([' ', '.', '/', '\\'], '_', $assessment->getAssessorName());
        $toolName = str_replace([' ', '.', '/', '\\'], '_', $assessment->tool->name_en);
        $date = $assessment->created_at->format('Y-m-d');
        $language = $settings['language'];

        return "assessment_report_{$toolName}_{$assessorName}_{$date}_{$language}.pdf";
    }

    /**
     * Handle guest assessment reports
     */
    public function downloadGuestReport(Request $request, Assessment $assessment)
    {
        // Validate that this is a guest assessment
        if (!$assessment->isGuestAssessment()) {
            return response()->json(['error' => 'Invalid assessment type'], 403);
        }

        // For guest assessments, we can be more lenient with session validation
        // or implement a token-based system

        return $this->downloadReport($request, $assessment);
    }
}
