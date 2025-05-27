<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Mpdf\Mpdf;

class AssessmentReportController extends Controller
{
    /**
     * Generate PDF report for assessment
     */
    public function generateReport(Request $request, Assessment $assessment)
    {
        $request->validate([
            'language' => 'in:arabic,english,bilingual',
            'template' => 'in:comprehensive,summary,detailed,minimal',
            'include_charts' => 'boolean',
            'include_recommendations' => 'boolean',
            'watermark' => 'boolean',
        ]);

        $settings = [
            'language' => $request->get('language', 'arabic'),
            'template' => $request->get('template', 'comprehensive'),
            'include_charts' => $request->get('include_charts', true),
            'include_recommendations' => $request->get('include_recommendations', true),
            'watermark' => $request->get('watermark', false),
        ];

        // Load assessment with relationships
        $assessment->load(['tool.domains.categories.criteria', 'responses', 'results']);

        // Calculate results if not already calculated
        if ($assessment->results->isEmpty()) {
            $assessment->calculateResults();
            $assessment->load('results');
        }

        // Get assessment results
        $results = $this->getAssessmentResults($assessment);

        // Generate HTML content
        $html = $this->generateReportHTML($assessment, $results, $settings);

        // Generate PDF
        $pdf = $this->createPDF($html, $settings);

        // Return PDF response
        $filename = $this->generateFilename($assessment, $settings);

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    /**
     * Get structured assessment results
     */
    private function getAssessmentResults(Assessment $assessment): array
    {
        $results = $assessment->getResults();

        return [
            'assessment' => [
                'id' => $assessment->id,
                'client_name' => $assessment->getAssessorName(),
                'client_email' => $assessment->getAssessorEmail(),
                'organization' => $assessment->organization,
                'status' => $assessment->status,
                'created_at' => $assessment->created_at,
                'completed_at' => $assessment->completed_at,
            ],
            'tool' => [
                'id' => $assessment->tool->id,
                'name_en' => $assessment->tool->name_en,
                'name_ar' => $assessment->tool->name_ar,
                'description_en' => $assessment->tool->description_en,
                'description_ar' => $assessment->tool->description_ar,
            ],
            'overall_percentage' => $results['overall_percentage'],
            'total_criteria' => $results['total_criteria'],
            'applicable_criteria' => $results['applicable_criteria'],
            'yes_count' => $results['yes_count'],
            'no_count' => $results['no_count'],
            'na_count' => $results['na_count'],
            'domain_results' => $results['domain_results'],
            'category_results' => $results['category_results'],
        ];
    }

    /**
     * Generate HTML content for PDF
     */
    private function generateReportHTML(Assessment $assessment, array $results, array $settings): string
    {
        $isArabic = $settings['language'] === 'arabic';
        $template = $settings['template'];

        // Determine certification level
        $certification = $this->getCertificationLevel($results['overall_percentage'], $assessment->tool);

        // Generate recommendations
        $recommendations = $settings['include_recommendations']
            ? $this->generateRecommendations($results['domain_results'], $assessment->tool, $isArabic)
            : [];

        // Load appropriate template
        $templatePath = $this->getTemplatePath($template, $isArabic);

        return view($templatePath, compact(
            'assessment',
            'results',
            'settings',
            'certification',
            'recommendations',
            'isArabic'
        ))->render();
    }

    /**
     * Create PDF using mPDF
     */
    private function createPDF(string $html, array $settings): string
    {
        $isArabic = $settings['language'] === 'arabic';

        $config = [
            'mode' => $isArabic ? 'utf-8' : 'utf-8',
            'format' => 'A4',
            'default_font_size' => 12,
            'default_font' => $isArabic ? 'almarai' : 'sans-serif',
            'margin_left' => 20,
            'margin_right' => 20,
            'margin_top' => 20,
            'margin_bottom' => 20,
            'margin_header' => 10,
            'margin_footer' => 10,
            'autoScriptToLang' => true,
            'autoLangToFont' => true,
            'dir' => $isArabic ? 'rtl' : 'ltr',
        ];

        $mpdf = new Mpdf($config);

        // Add watermark if requested
        if ($settings['watermark']) {
            $mpdf->SetWatermarkText('CONFIDENTIAL');
            $mpdf->watermark_font = 'DejaVuSansCondensed';
            $mpdf->watermarkTextAlpha = 0.1;
            $mpdf->showWatermarkText = true;
        }

        $mpdf->WriteHTML($html);

        return $mpdf->Output('', 'S'); // Return as string
    }

    /**
     * Get certification level based on score
     */
    private function getCertificationLevel(float $score, Tool $tool): array
    {
        // This would be based on your tool's specific thresholds
        // For now, using general thresholds
        if ($score >= 90) {
            return [
                'level' => 'full',
                'text_en' => 'Full Certification',
                'text_ar' => 'اعتماد كامل',
                'color' => '#22c55e',
                'bg_color' => '#dcfce7'
            ];
        } elseif ($score >= 80) {
            return [
                'level' => 'conditional',
                'text_en' => 'Conditional Certification',
                'text_ar' => 'اعتماد مشروط',
                'color' => '#f59e0b',
                'bg_color' => '#fef3c7'
            ];
        } else {
            return [
                'level' => 'denied',
                'text_en' => 'Certification Denied',
                'text_ar' => 'اعتماد مرفوض',
                'color' => '#ef4444',
                'bg_color' => '#fee2e2'
            ];
        }
    }

    /**
     * Generate recommendations based on domain results
     */
    private function generateRecommendations(array $domainResults, Tool $tool, bool $isArabic): array
    {
        $recommendations = [];

        foreach ($domainResults as $domain) {
            if ($domain['score_percentage'] < 80) {
                $priority = $domain['score_percentage'] < 60 ? 'high' : 'medium';

                $recommendations[] = [
                    'domain_name' => $domain['domain_name'],
                    'score' => $domain['score_percentage'],
                    'priority' => $priority,
                    'text' => $isArabic
                        ? "يتطلب تحسين {$domain['domain_name']} - النتيجة الحالية {$domain['score_percentage']}%"
                        : "{$domain['domain_name']} requires improvement - Current score {$domain['score_percentage']}%"
                ];
            }
        }

        return $recommendations;
    }

    /**
     * Get template path based on type and language
     */
    private function getTemplatePath(string $template, bool $isArabic): string
    {
        $lang = $isArabic ? 'ar' : 'en';
        return "reports.{$template}.{$lang}";
    }

    /**
     * Generate filename for PDF
     */
    private function generateFilename(Assessment $assessment, array $settings): string
    {
        $clientName = str_replace(' ', '_', $assessment->getAssessorName());
        $toolName = str_replace(' ', '_', $assessment->tool->name_en);
        $date = $assessment->created_at->format('Y-m-d');
        $lang = $settings['language'];

        return "assessment_report_{$toolName}_{$clientName}_{$date}_{$lang}.pdf";
    }


    public function previewReport(Assessment $assessment)
    {
        // Load assessment with relationships
        $assessment->load(['tool.domains.categories.criteria', 'responses', 'results']);

        // Calculate results if not already calculated
        if ($assessment->results->isEmpty()) {
            $assessment->calculateResults();
            $assessment->load('results');
        }

        // Get assessment results
        $results = $this->getAssessmentResults($assessment);

        return response()->json([
            'success' => true,
            'data' => $results
        ]);
    }

    /**
     * Generate PDF for guest assessment
     */
    public function generateGuestReport(Request $request, Assessment $assessment)
    {
        // Validate that this is a guest assessment and session matches
        if (!$assessment->isGuestAssessment()) {
            return response()->json(['error' => 'Invalid assessment type'], 403);
        }

        // Validate session for guest assessments
        $guestSession = $assessment->guestSession;
        if (!$guestSession || $guestSession->session_id !== session()->getId()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        // Generate report same as authenticated users
        return $this->generateReport($request, $assessment);
    }

    /**
     * Get available report templates
     */
    public function getTemplates()
    {
        $templates = [
            [
                'id' => 'comprehensive',
                'name' => 'Comprehensive Report',
                'name_ar' => 'تقرير شامل',
                'description' => 'Complete assessment report with all details',
                'description_ar' => 'تقرير تقييم كامل مع جميع التفاصيل',
                'pages' => '8-12',
                'includes' => ['client_info', 'results', 'charts', 'recommendations', 'action_plan']
            ],
            [
                'id' => 'summary',
                'name' => 'Executive Summary',
                'name_ar' => 'ملخص تنفيذي',
                'description' => 'Brief overview with key findings',
                'description_ar' => 'نظرة عامة موجزة مع النتائج الرئيسية',
                'pages' => '3-5',
                'includes' => ['client_info', 'overall_score', 'key_recommendations']
            ],
            [
                'id' => 'detailed',
                'name' => 'Detailed Analysis',
                'name_ar' => 'تحليل مفصل',
                'description' => 'In-depth analysis with category breakdowns',
                'description_ar' => 'تحليل متعمق مع تفصيل الفئات',
                'pages' => '10-15',
                'includes' => ['client_info', 'results', 'category_breakdown', 'charts', 'detailed_recommendations']
            ],
            [
                'id' => 'minimal',
                'name' => 'Basic Report',
                'name_ar' => 'تقرير أساسي',
                'description' => 'Simple report with scores only',
                'description_ar' => 'تقرير بسيط مع النتائج فقط',
                'pages' => '2-3',
                'includes' => ['client_info', 'scores']
            ]
        ];

        return response()->json([
            'success' => true,
            'data' => $templates
        ]);
    }
}
