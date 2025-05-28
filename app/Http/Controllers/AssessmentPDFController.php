<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Mpdf\Mpdf;
use Illuminate\Support\Facades\Log;

class AssessmentPDFController extends Controller
{
    /**
     * Generate PDF report for assessment - Simplified version
     */
    public function downloadReport(Request $request, Assessment $assessment)
    {
        Log::info('PDF Generation Started', [
            'assessment_id' => $assessment->id,
            'user_id' => auth()->id(),
            'assessment_user_id' => $assessment->user_id,
        ]);

        try {
            // Check authorization
            if ($assessment->user_id !== auth()->id()) {
                Log::warning('Unauthorized PDF access attempt');
                return response()->json(['error' => 'Unauthorized access'], 403);
            }

            // Simple validation
            $settings = [
                'language' => $request->get('language', 'arabic'),
                'template' => $request->get('template', 'comprehensive'),
                'include_charts' => $request->boolean('include_charts', true),
                'include_recommendations' => $request->boolean('include_recommendations', true),
                'watermark' => $request->boolean('watermark', false),
            ];

            Log::info('Settings prepared', $settings);

            // Load basic assessment data
            $assessment->load(['tool']);

            Log::info('Assessment loaded', [
                'tool_name' => $assessment->tool->name_en ?? 'Unknown',
                'status' => $assessment->status
            ]);

            // Get results - with fallback if getResults() fails
            try {
                $results = $assessment->getResults();
                Log::info('Results retrieved via getResults()', [
                    'overall_percentage' => $results['overall_percentage'] ?? 0
                ]);
            } catch (\Exception $e) {
                Log::warning('getResults() failed, using fallback', ['error' => $e->getMessage()]);

                // Fallback: calculate basic results from responses
                $responses = $assessment->responses;
                $yesCount = $responses->where('response', 'yes')->count();
                $noCount = $responses->where('response', 'no')->count();
                $naCount = $responses->where('response', 'na')->count();
                $total = $yesCount + $noCount + $naCount;

                $results = [
                    'overall_percentage' => $total > 0 ? ($yesCount / $total) * 100 : 0,
                    'yes_count' => $yesCount,
                    'no_count' => $noCount,
                    'na_count' => $naCount,
                    'total_criteria' => $total,
                    'applicable_criteria' => $yesCount + $noCount,
                    'domain_results' => []
                ];

                Log::info('Fallback results calculated', $results);
            }

            // Generate simple HTML
            $html = $this->generateSimpleHTML($assessment, $results, $settings);

            Log::info('HTML generated', ['length' => strlen($html)]);

            // Create PDF
            $pdf = $this->createSimplePDF($html, $settings);

            Log::info('PDF created', ['size' => strlen($pdf)]);

            // Generate filename
            $filename = $this->generateFilename($assessment, $settings);

            return response($pdf, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => "attachment; filename=\"{$filename}\"",
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);

        } catch (\Exception $e) {
            Log::error('PDF Generation Failed', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => explode("\n", $e->getTraceAsString())
            ]);

            return response()->json([
                'error' => 'PDF generation failed',
                'message' => $e->getMessage(),
                'debug' => [
                    'file' => basename($e->getFile()),
                    'line' => $e->getLine(),
                    'assessment_id' => $assessment->id
                ]
            ], 500);
        }
    }

    /**
     * Generate simple HTML content
     */
    private function generateSimpleHTML(Assessment $assessment, array $results, array $settings): string
    {
        $isArabic = $settings['language'] === 'arabic';
        $dir = $isArabic ? 'rtl' : 'ltr';

        // Safe data extraction
        $toolName = $assessment->tool->name_en ?? 'Assessment Tool';
        if ($isArabic && !empty($assessment->tool->name_ar)) {
            $toolName = $assessment->tool->name_ar;
        }

        $assessorName = $assessment->name ?? 'Unknown';
        $assessorEmail = $assessment->email ?? 'Not provided';
        $organization = $assessment->organization ?? ($isArabic ? 'غير محدد' : 'Not specified');

        $overallScore = $results['overall_percentage'] ?? 0;
        $yesCount = $results['yes_count'] ?? 0;
        $noCount = $results['no_count'] ?? 0;
        $naCount = $results['na_count'] ?? 0;

        $certLevel = $this->getCertificationLevel($overallScore);

        $html = "<!DOCTYPE html>
<html dir='{$dir}'>
<head>
    <meta charset='UTF-8'>
    <title>" . ($isArabic ? 'تقرير التقييم' : 'Assessment Report') . "</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            direction: {$dir};
            margin: 20px;
            padding: 0;
        }
        .header {
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            color: white;
            padding: 30px;
            text-align: center;
            margin-bottom: 30px;
            border-radius: 10px;
        }
        .header h1 {
            font-size: 28px;
            margin: 0 0 10px 0;
        }
        .header h2 {
            font-size: 20px;
            margin: 0 0 10px 0;
            opacity: 0.9;
        }
        .section {
            background: #f8f9fa;
            margin-bottom: 25px;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        .section h3 {
            color: #1e40af;
            margin-top: 0;
            font-size: 18px;
        }
        .score-display {
            text-align: center;
            padding: 30px;
            background: white;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .score-number {
            font-size: 48px;
            font-weight: bold;
            color: " . $certLevel['color'] . ";
            margin-bottom: 10px;
        }
        .cert-badge {
            background: " . $certLevel['bg_color'] . ";
            color: " . $certLevel['color'] . ";
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            border: 2px solid " . $certLevel['color'] . ";
        }
        .stats-row {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }
        .stat-item {
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            min-width: 80px;
        }
        .stat-yes { background: #dcfce7; color: #166534; }
        .stat-no { background: #fee2e2; color: #dc2626; }
        .stat-na { background: #f3f4f6; color: #6b7280; }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        .info-table th, .info-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .info-table th {
            background: #f1f5f9;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class='header'>
        <h1>" . ($isArabic ? 'تقرير التقييم' : 'Assessment Report') . "</h1>
        <h2>" . htmlspecialchars($toolName) . "</h2>
        <p>" . ($isArabic ? 'تاريخ الإنتاج: ' : 'Generated: ') . date('Y-m-d H:i') . "</p>
    </div>

    <!-- Client Information -->
    <div class='section'>
        <h3>" . ($isArabic ? 'معلومات المقيم' : 'Assessor Information') . "</h3>
        <table class='info-table'>
            <tr>
                <th>" . ($isArabic ? 'الاسم' : 'Name') . "</th>
                <td>" . htmlspecialchars($assessorName) . "</td>
            </tr>
            <tr>
                <th>" . ($isArabic ? 'البريد الإلكتروني' : 'Email') . "</th>
                <td>" . htmlspecialchars($assessorEmail) . "</td>
            </tr>
            <tr>
                <th>" . ($isArabic ? 'المؤسسة' : 'Organization') . "</th>
                <td>" . htmlspecialchars($organization) . "</td>
            </tr>
            <tr>
                <th>" . ($isArabic ? 'تاريخ التقييم' : 'Assessment Date') . "</th>
                <td>" . $assessment->created_at->format('Y-m-d') . "</td>
            </tr>
            <tr>
                <th>" . ($isArabic ? 'الحالة' : 'Status') . "</th>
                <td>" . ucfirst($assessment->status) . "</td>
            </tr>
        </table>
    </div>

    <!-- Overall Score -->
    <div class='section'>
        <h3>" . ($isArabic ? 'النتيجة الإجمالية' : 'Overall Score') . "</h3>
        <div class='score-display'>
            <div class='score-number'>" . number_format($overallScore, 1) . "%</div>
            <div class='cert-badge'>" . ($isArabic ? $certLevel['text_ar'] : $certLevel['text_en']) . "</div>

            <div class='stats-row'>
                <div class='stat-item stat-yes'>
                    <div style='font-size: 24px; font-weight: bold;'>{$yesCount}</div>
                    <div>" . ($isArabic ? 'نعم' : 'Yes') . "</div>
                </div>
                <div class='stat-item stat-no'>
                    <div style='font-size: 24px; font-weight: bold;'>{$noCount}</div>
                    <div>" . ($isArabic ? 'لا' : 'No') . "</div>
                </div>
                <div class='stat-item stat-na'>
                    <div style='font-size: 24px; font-weight: bold;'>{$naCount}</div>
                    <div>" . ($isArabic ? 'غير قابل' : 'N/A') . "</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Summary -->
    <div class='section'>
        <h3>" . ($isArabic ? 'ملخص النتائج' : 'Results Summary') . "</h3>
        <table class='info-table'>
            <tr>
                <th>" . ($isArabic ? 'إجمالي الردود' : 'Total Responses') . "</th>
                <td>" . ($yesCount + $noCount + $naCount) . "</td>
            </tr>
            <tr>
                <th>" . ($isArabic ? 'الردود القابلة للتطبيق' : 'Applicable Responses') . "</th>
                <td>" . ($yesCount + $noCount) . "</td>
            </tr>
            <tr>
                <th>" . ($isArabic ? 'معدل النجاح' : 'Success Rate') . "</th>
                <td>" . (($yesCount + $noCount) > 0 ? number_format(($yesCount / ($yesCount + $noCount)) * 100, 1) : 0) . "%</td>
            </tr>
        </table>
    </div>";

        // Add recommendations if score is low
        if ($overallScore < 80) {
            $html .= "
    <!-- Recommendations -->
    <div class='section'>
        <h3>" . ($isArabic ? 'التوصيات' : 'Recommendations') . "</h3>
        <p>";

            if ($overallScore < 50) {
                $html .= $isArabic
                    ? "النتيجة الحالية تتطلب تحسينات جذرية وشاملة. ننصح بوضع خطة تطوير عاجلة وتخصيص الموارد اللازمة للتحسين."
                    : "Current score requires comprehensive improvements. We recommend developing an urgent improvement plan and allocating necessary resources.";
            } elseif ($overallScore < 70) {
                $html .= $isArabic
                    ? "النتيجة تشير إلى الحاجة لتحسينات متوسطة. ننصح بمراجعة العمليات الحالية وتطوير الممارسات."
                    : "Score indicates need for moderate improvements. We recommend reviewing current processes and developing practices.";
            } else {
                $html .= $isArabic
                    ? "النتيجة جيدة ولكن يمكن تحسينها. ننصح بالتركيز على النقاط الضعيفة والتحسين المستمر."
                    : "Good score but can be improved. We recommend focusing on weak points and continuous improvement.";
            }

            $html .= "</p>
    </div>";
        }

        $html .= "
    <!-- Footer -->
    <div class='footer'>
        <p><strong>" . ($isArabic ? 'تم إنتاج هذا التقرير آلياً بواسطة نظام التقييم' : 'This report was automatically generated by the assessment system') . "</strong></p>
        <p>" . ($isArabic ? 'معرف التقييم: ' : 'Assessment ID: ') . $assessment->id . "</p>
        <p>" . ($isArabic ? 'تاريخ الإنتاج: ' : 'Generated on: ') . now()->format('Y-m-d H:i:s') . "</p>
    </div>
</body>
</html>";

        return $html;
    }

    /**
     * Create PDF with simple configuration
     */
    private function createSimplePDF(string $html, array $settings): string
    {
        $isArabic = $settings['language'] === 'arabic';

        // Ensure temp directory exists
        $tempDir = storage_path('app/temp');
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0755, true);
        }

        $config = [
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 12,
            'default_font' => 'dejavusans',
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 20,
            'margin_bottom' => 20,
            'dir' => $isArabic ? 'rtl' : 'ltr',
            'tempDir' => $tempDir,
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
        return $mpdf->Output('', 'S');
    }

    /**
     * Get certification level
     */
    private function getCertificationLevel(float $score): array
    {
        if ($score >= 90) {
            return [
                'text_en' => 'Full Certification',
                'text_ar' => 'اعتماد كامل',
                'color' => '#22c55e',
                'bg_color' => '#dcfce7'
            ];
        } elseif ($score >= 80) {
            return [
                'text_en' => 'Conditional Certification',
                'text_ar' => 'اعتماد مشروط',
                'color' => '#f59e0b',
                'bg_color' => '#fef3c7'
            ];
        } elseif ($score >= 70) {
            return [
                'text_en' => 'Improvement Needed',
                'text_ar' => 'يحتاج تحسين',
                'color' => '#f97316',
                'bg_color' => '#fed7aa'
            ];
        } else {
            return [
                'text_en' => 'Certification Denied',
                'text_ar' => 'اعتماد مرفوض',
                'color' => '#ef4444',
                'bg_color' => '#fee2e2'
            ];
        }
    }

    /**
     * Generate filename
     */
    private function generateFilename(Assessment $assessment, array $settings): string
    {
        $assessorName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $assessment->name ?? 'assessor');
        $date = $assessment->created_at->format('Y-m-d');
        $language = $settings['language'];

        return "assessment_report_{$assessorName}_{$date}_{$language}.pdf";
    }

    /**
     * Handle guest assessment reports
     */
    public function downloadGuestReport(Request $request, Assessment $assessment)
    {
        // Skip auth check for guest assessments
        if (!$assessment->isGuestAssessment() || $assessment->status !== 'completed') {
            return response()->json(['error' => 'Invalid assessment'], 400);
        }

        // Use same logic but without auth check
        $settings = [
            'language' => $request->get('language', 'arabic'),
            'template' => $request->get('template', 'comprehensive'),
            'include_charts' => $request->boolean('include_charts', true),
            'include_recommendations' => $request->boolean('include_recommendations', true),
            'watermark' => $request->boolean('watermark', false),
        ];

        $assessment->load(['tool']);

        // Get results with fallback
        try {
            $results = $assessment->getResults();
        } catch (\Exception $e) {
            $responses = $assessment->responses;
            $yesCount = $responses->where('response', 'yes')->count();
            $noCount = $responses->where('response', 'no')->count();
            $naCount = $responses->where('response', 'na')->count();
            $total = $yesCount + $noCount + $naCount;

            $results = [
                'overall_percentage' => $total > 0 ? ($yesCount / $total) * 100 : 0,
                'yes_count' => $yesCount,
                'no_count' => $noCount,
                'na_count' => $naCount,
                'total_criteria' => $total,
                'applicable_criteria' => $yesCount + $noCount,
                'domain_results' => []
            ];
        }

        $html = $this->generateSimpleHTML($assessment, $results, $settings);
        $pdf = $this->createSimplePDF($html, $settings);
        $filename = $this->generateFilename($assessment, $settings);

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0'
        ]);
    }
}
