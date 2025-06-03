<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Action;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Mpdf\Mpdf;

class AssessmentReportController extends Controller
{
    /**
     * Generate comprehensive PDF report with actions
     */
    public function generateReport(Assessment $assessment, Request $request)
    {
        // Load assessment with all necessary relationships
        $assessment->load([
            'tool',
            'responses.criterion.category.domain',
            'responses.criterion.actions' // Load actions for each criterion
        ]);

        // Get assessment results
        $results = $this->getAssessmentResults($assessment);

        // Get actions data grouped by criteria with failed responses
        $actions = $this->getRelevantActions($assessment);

        // Get report settings
        $settings = $this->getReportSettings($request);

        // Get certification level
        $certification = $this->getCertificationLevel($results['overall_percentage']);

        // Get recommendations
        $recommendations = $this->generateRecommendations($results);

        // Prepare data for the view
        $reportData = [
            'results' => $results,
            'actions' => $actions,
            'settings' => $settings,
            'certification' => $certification,
            'recommendations' => $recommendations,
        ];

        // Generate PDF
        $locale = app()->getLocale();
        $templatePath = $locale === 'ar' ? 'reports.comprehensive.ar' : 'reports.comprehensive.en';

        $html = View::make($templatePath, $reportData)->render();

        return $this->generatePDF($html, $assessment, $locale);
    }

    /**
     * Get relevant actions based on assessment responses
     */
    private function getRelevantActions(Assessment $assessment): array
    {
        $actions = [];

        // Get all responses with 'no' answers (areas needing improvement)
        $failedResponses = $assessment->responses()
            ->where('response', 'no')
            ->with(['criterion.actions', 'criterion.category.domain'])
            ->get();

        // Get actions for criteria that failed
        foreach ($failedResponses as $response) {
            $criterion = $response->criterion;

            if ($criterion && $criterion->actions->count() > 0) {
                foreach ($criterion->actions as $action) {
                    $actions[] = [
                        'criterion_id' => $criterion->id,
                        'criterion' => $criterion,
                        'domain_name' => $criterion->category->domain->name_ar ?? $criterion->category->domain->name_en,
                        'category_name' => $criterion->category->name_ar ?? $criterion->category->name_en,
                        'criterion_name' => $criterion->name_ar ?? $criterion->name_en,
                        'action_ar' => $action->action_ar,
                        'action_en' => $action->action_en,
                        'flag' => $action->flag,
                        'action_type' => $action->getActionTypeText('ar'),
                        'priority' => $this->getActionPriority($response, $criterion),
                    ];
                }
            }
        }

        // Also get improvement actions for areas that passed but could be enhanced
        $passedResponses = $assessment->responses()
            ->where('response', 'yes')
            ->with(['criterion.actions', 'criterion.category.domain'])
            ->get();

        foreach ($passedResponses as $response) {
            $criterion = $response->criterion;

            if ($criterion) {
                // Only get improvement actions for passed criteria
                $improvementActions = $criterion->actions()->where('flag', true)->get();

                foreach ($improvementActions as $action) {
                    $actions[] = [
                        'criterion_id' => $criterion->id,
                        'criterion' => $criterion,
                        'domain_name' => $criterion->category->domain->name_ar ?? $criterion->category->domain->name_en,
                        'category_name' => $criterion->category->name_ar ?? $criterion->category->name_en,
                        'criterion_name' => $criterion->name_ar ?? $criterion->name_en,
                        'action_ar' => $action->action_ar,
                        'action_en' => $action->action_en,
                        'flag' => $action->flag,
                        'action_type' => $action->getActionTypeText('ar'),
                        'priority' => 'منخفضة', // Low priority for improvement actions
                    ];
                }
            }
        }

        return $actions;
    }

    /**
     * Get action priority based on response and domain performance
     */
    private function getActionPriority($response, $criterion): string
    {
        // Get domain score to determine priority
        $domain = $criterion->category->domain;
        $domainResponses = $domain->categories()
            ->with('criteria.responses')
            ->get()
            ->flatMap(fn($category) => $category->criteria)
            ->flatMap(fn($criteria) => $criteria->responses)
            ->where('assessment_id', $response->assessment_id);

        $yesCount = $domainResponses->where('response', 'yes')->count();
        $totalCount = $domainResponses->whereIn('response', ['yes', 'no'])->count();

        $domainScore = $totalCount > 0 ? ($yesCount / $totalCount) * 100 : 0;

        // Determine priority based on domain performance
        if ($domainScore < 50) {
            return 'عالية'; // High priority
        } elseif ($domainScore < 75) {
            return 'متوسطة'; // Medium priority
        } else {
            return 'منخفضة'; // Low priority
        }
    }

    /**
     * Get assessment results
     */
    private function getAssessmentResults(Assessment $assessment): array
    {
        return [
            'assessment' => [
                'client_name' => $assessment->name,
                'client_email' => $assessment->email,
                'organization' => $assessment->organization,
                'status' => $assessment->status,
                'created_at' => $assessment->created_at,
                'completed_at' => $assessment->completed_at,
            ],
            'tool' => [
                'name_ar' => $assessment->tool->name_ar,
                'name_en' => $assessment->tool->name_en,
            ],
            ...$assessment->getResults() // Use the existing getResults method
        ];
    }

    /**
     * Get report settings from request
     */
    private function getReportSettings(Request $request): array
    {
        return [
            'include_recommendations' => $request->get('include_recommendations', true),
            'include_actions' => $request->get('include_actions', true),
            'include_charts' => $request->get('include_charts', true),
            'template_type' => $request->get('template_type', 'comprehensive'),
        ];
    }

    /**
     * Get certification level based on score
     */
    private function getCertificationLevel(float $score): array
    {
        if ($score >= 85) {
            return [
                'level' => 'full',
                'text_ar' => 'شهادة استيفاء كاملة',
                'text_en' => 'Full Compliance Certificate',
                'color' => '#22c55e',
            ];
        } elseif ($score >= 70) {
            return [
                'level' => 'conditional',
                'text_ar' => 'شهادة استيفاء مشروطة',
                'text_en' => 'Conditional Compliance Certificate',
                'color' => '#f59e0b',
            ];
        } else {
            return [
                'level' => 'denied',
                'text_ar' => 'عدم استيفاء المعايير',
                'text_en' => 'Non-Compliance',
                'color' => '#ef4444',
            ];
        }
    }

    /**
     * Generate recommendations based on results
     */
    private function generateRecommendations(array $results): array
    {
        $recommendations = [];

        foreach ($results['domain_results'] as $domain) {
            $score = $domain['score_percentage'];
            $priority = 'medium';
            $text = '';

            if ($score < 60) {
                $priority = 'high';
                $text = "يتطلب المجال تطوير شامل وإعادة هيكلة للعمليات والإجراءات";
            } elseif ($score < 80) {
                $priority = 'medium';
                $text = "يحتاج المجال إلى تحسينات في بعض العمليات والممارسات";
            } else {
                $priority = 'low';
                $text = "أداء جيد مع إمكانية التحسين المستمر";
            }

            $recommendations[] = [
                'domain_name' => $domain['domain_name'],
                'priority' => $priority,
                'text' => $text,
                'score' => $score,
            ];
        }

        // Sort by priority (high first)
        $priorityOrder = ['high' => 1, 'medium' => 2, 'low' => 3];
        usort($recommendations, function($a, $b) use ($priorityOrder) {
            return $priorityOrder[$a['priority']] <=> $priorityOrder[$b['priority']];
        });

        return $recommendations;
    }

    /**
     * Generate PDF from HTML
     */
    private function generatePDF(string $html, Assessment $assessment, string $locale): \Illuminate\Http\Response
    {
        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'orientation' => 'P',
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 20,
            'margin_bottom' => 15,
            'default_font' => $locale === 'ar' ? 'almarai' : 'arial',
            'default_font_size' => 10,
            'tempDir' => storage_path('app/temp'),
            'autoScriptToLang' => true,
            'autoLangToFont' => true,
        ]);

        // Set RTL direction for Arabic
        if ($locale === 'ar') {
            $mpdf->SetDirectionality('rtl');
        }

        $mpdf->WriteHTML($html);

        $filename = $this->generateFilename($assessment, $locale);

        return response($mpdf->Output('', 'S'), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Content-Length' => strlen($mpdf->Output('', 'S')),
        ]);
    }
    private function generateFilename(Assessment $assessment, string $locale): string
    {
        $toolName = str_replace([' ', '/', '\\', ':', '*', '?', '"', '<', '>', '|'], '_',
            $locale === 'ar' ? $assessment->tool->name_ar : $assessment->tool->name_en
        );
        $date = now()->format('Y-m-d');
        $assessmentId = $assessment->id;

        $prefix = $locale === 'ar' ? 'تقرير_تقييم' : 'Assessment_Report';

        return "{$prefix}_{$toolName}_{$assessmentId}_{$date}.pdf";
    }
    public function previewReport(Assessment $assessment, Request $request)
    {
        $assessment->load([
            'tool',
            'responses.criterion.category.domain',
            'responses.criterion.actions'
        ]);

        // Get all the data that would be used in the PDF
        $results = $this->getAssessmentResults($assessment);
        $actions = $this->getRelevantActions($assessment);
        $settings = $this->getReportSettings($request);
        $certification = $this->getCertificationLevel($results['overall_percentage']);
        $recommendations = $this->generateRecommendations($results);

        return response()->json([
            'success' => true,
            'data' => [
                'results' => $results,
                'actions' => $actions,
                'settings' => $settings,
                'certification' => $certification,
                'recommendations' => $recommendations,
                'actions_summary' => [
                    'total_actions' => count($actions),
                    'improvement_actions' => count(array_filter($actions, fn($a) => $a['flag'])),
                    'corrective_actions' => count(array_filter($actions, fn($a) => !$a['flag'])),
                    'high_priority' => count(array_filter($actions, fn($a) => $a['priority'] === 'عالية')),
                    'medium_priority' => count(array_filter($actions, fn($a) => $a['priority'] === 'متوسطة')),
                    'low_priority' => count(array_filter($actions, fn($a) => $a['priority'] === 'منخفضة')),
                ]
            ]
        ]);
    }

    /**
     * Get available report templates
     */
    public function getTemplates()
    {
        return response()->json([
            'success' => true,
            'data' => [
                [
                    'id' => 'comprehensive',
                    'name' => 'Comprehensive Report',
                    'name_ar' => 'تقرير شامل',
                    'description' => 'Complete assessment report with actions and recommendations',
                    'description_ar' => 'تقرير تقييم كامل مع الإجراءات والتوصيات',
                    'pages' => '10-15',
                    'includes' => ['client_info', 'results', 'charts', 'actions', 'recommendations', 'action_plan']
                ],
                [
                    'id' => 'summary',
                    'name' => 'Executive Summary',
                    'name_ar' => 'ملخص تنفيذي',
                    'description' => 'Brief overview with key findings and priority actions',
                    'description_ar' => 'نظرة عامة موجزة مع النتائج الرئيسية والإجراءات ذات الأولوية',
                    'pages' => '5-7',
                    'includes' => ['client_info', 'overall_score', 'priority_actions', 'key_recommendations']
                ],
                [
                    'id' => 'actions_only',
                    'name' => 'Action Plan Report',
                    'name_ar' => 'تقرير خطة العمل',
                    'description' => 'Focused report on required actions and implementation plan',
                    'description_ar' => 'تقرير مركز على الإجراءات المطلوبة وخطة التنفيذ',
                    'pages' => '6-8',
                    'includes' => ['client_info', 'actions', 'implementation_timeline', 'priorities']
                ]
            ]
        ]);
    }
}
