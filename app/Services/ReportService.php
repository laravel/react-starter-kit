<?php

namespace App\Services;

use App\Models\Assessment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
use Exception;

class ReportService
{
    /**
     * Generate PDF report for assessment
     */
    public function generatePDF(Assessment $assessment, string $reportType = 'basic')
    {
        Log::info('Generating PDF', [
            'assessment_id' => $assessment->id,
            'report_type' => $reportType
        ]);

        try {
            // Get assessment results
            $results = $this->getAssessmentResults($assessment);

            // Prepare data for PDF template
            $data = [
                'assessment' => $assessment,
                'results' => $results,
                'reportType' => $reportType,
                'generatedAt' => now(),
                'locale' => app()->getLocale(),
            ];

            // Select template based on report type
            $template = $this->getTemplate($reportType);

            // Generate PDF
            $pdf = Pdf::loadView($template, $data);

            // Set PDF options
            $pdf->setPaper('A4', 'portrait');
            $pdf->setOptions([
                'dpi' => 150,
                'defaultFont' => 'sans-serif',
                'isRemoteEnabled' => true,
                'isPhpEnabled' => true,
            ]);

            return $pdf;

        } catch (Exception $e) {
            Log::error('PDF generation failed', [
                'assessment_id' => $assessment->id,
                'report_type' => $reportType,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    /**
     * Get assessment results data
     */
    private function getAssessmentResults(Assessment $assessment): array
    {
        // Load necessary relationships if not already loaded
        if (!$assessment->relationLoaded('results')) {
            $assessment->load('results.domain', 'results.category');
        }

        $results = $assessment->results;
        $domainResults = $results->where('category_id', null);
        $categoryResults = $results->where('category_id', '!=', null);

        // Calculate overall statistics
        $totalCriteria = $domainResults->sum('total_criteria');
        $applicableCriteria = $domainResults->sum('applicable_criteria');
        $yesCount = $domainResults->sum('yes_count');
        $noCount = $domainResults->sum('no_count');
        $naCount = $domainResults->sum('na_count');
        $overallPercentage = $applicableCriteria > 0 ? ($yesCount / $applicableCriteria) * 100 : 0;

        // Format domain results
        $domainData = $domainResults->map(function ($result) {
            return [
                'domain_id' => $result->domain_id,
                'domain_name' => $result->domain->name_en ?? 'Unknown Domain',
                'domain_name_ar' => $result->domain->name_ar ?? 'مجال غير معروف',
                'score_percentage' => $result->score_percentage,
                'total_criteria' => $result->total_criteria,
                'applicable_criteria' => $result->applicable_criteria,
                'yes_count' => $result->yes_count,
                'no_count' => $result->no_count,
                'na_count' => $result->na_count,
                'status' => $this->getScoreStatus($result->score_percentage),
            ];
        });

        // Format category results
        $categoryData = $categoryResults->groupBy('domain_id')->map(function ($categories, $domainId) {
            return $categories->map(function ($result) {
                return [
                    'category_id' => $result->category_id,
                    'category_name' => $result->category->name_en ?? 'Unknown Category',
                    'category_name_ar' => $result->category->name_ar ?? 'فئة غير معروفة',
                    'score_percentage' => $result->score_percentage,
                    'total_criteria' => $result->total_criteria,
                    'applicable_criteria' => $result->applicable_criteria,
                    'yes_count' => $result->yes_count,
                    'no_count' => $result->no_count,
                    'na_count' => $result->na_count,
                    'status' => $this->getScoreStatus($result->score_percentage),
                ];
            });
        });

        return [
            'overall_percentage' => round($overallPercentage, 2),
            'total_criteria' => $totalCriteria,
            'applicable_criteria' => $applicableCriteria,
            'yes_count' => $yesCount,
            'no_count' => $noCount,
            'na_count' => $naCount,
            'domain_results' => $domainData,
            'category_results' => $categoryData,
            'completion_date' => $assessment->completed_at,
            'status_summary' => $this->getOverallStatus($overallPercentage),
        ];
    }

    /**
     * Get template path based on report type
     */
    private function getTemplate(string $reportType): string
    {
        return match ($reportType) {
            'comprehensive' => 'reports.comprehensive',
            'basic' => 'reports.basic',
            'guest_basic' => 'reports.guest-basic',
            'executive' => 'reports.executive',
            default => 'reports.basic',
        };
    }

    /**
     * Get score status based on percentage
     */
    private function getScoreStatus(float $percentage): array
    {
        if ($percentage >= 80) {
            return [
                'level' => 'excellent',
                'label_en' => 'Excellent',
                'label_ar' => 'ممتاز',
                'color' => '#10B981', // green
                'description_en' => 'Outstanding performance',
                'description_ar' => 'أداء متميز'
            ];
        } elseif ($percentage >= 60) {
            return [
                'level' => 'good',
                'label_en' => 'Good',
                'label_ar' => 'جيد',
                'color' => '#3B82F6', // blue
                'description_en' => 'Above average performance',
                'description_ar' => 'أداء فوق المتوسط'
            ];
        } elseif ($percentage >= 40) {
            return [
                'level' => 'fair',
                'label_en' => 'Fair',
                'label_ar' => 'مقبول',
                'color' => '#F59E0B', // amber
                'description_en' => 'Average performance',
                'description_ar' => 'أداء متوسط'
            ];
        } else {
            return [
                'level' => 'needs_improvement',
                'label_en' => 'Needs Improvement',
                'label_ar' => 'يحتاج تحسين',
                'color' => '#EF4444', // red
                'description_en' => 'Below average performance',
                'description_ar' => 'أداء دون المتوسط'
            ];
        }
    }

    /**
     * Get overall status summary
     */
    private function getOverallStatus(float $percentage): array
    {
        $status = $this->getScoreStatus($percentage);

        // Add recommendations based on score
        if ($percentage >= 80) {
            $status['recommendations_en'] = [
                'Maintain current excellent standards',
                'Continue monitoring and improvement processes',
                'Share best practices with other departments',
                'Focus on innovation and advanced optimization'
            ];
            $status['recommendations_ar'] = [
                'حافظ على المعايير الممتازة الحالية',
                'واصل عمليات المراقبة والتحسين',
                'شارك أفضل الممارسات مع الأقسام الأخرى',
                'ركز على الابتكار والتحسين المتقدم'
            ];
        } elseif ($percentage >= 60) {
            $status['recommendations_en'] = [
                'Identify specific areas for improvement',
                'Develop targeted action plans',
                'Implement regular monitoring systems',
                'Invest in training and development'
            ];
            $status['recommendations_ar'] = [
                'حدد المجالات المحددة للتحسين',
                'طور خطط عمل مستهدفة',
                'نفذ أنظمة مراقبة منتظمة',
                'استثمر في التدريب والتطوير'
            ];
        } else {
            $status['recommendations_en'] = [
                'Conduct comprehensive review of current processes',
                'Prioritize critical improvement areas',
                'Implement immediate corrective actions',
                'Establish regular assessment cycles'
            ];
            $status['recommendations_ar'] = [
                'أجر مراجعة شاملة للعمليات الحالية',
                'أعط الأولوية لمجالات التحسين الحرجة',
                'نفذ إجراءات تصحيحية فورية',
                'أنشئ دورات تقييم منتظمة'
            ];
        }

        return $status;
    }

    /**
     * Get chart data for PDF
     */
    public function getChartData(Assessment $assessment): array
    {
        $results = $this->getAssessmentResults($assessment);

        return [
            'overall_score' => $results['overall_percentage'],
            'domain_scores' => $results['domain_results']->pluck('score_percentage', 'domain_name'),
            'response_breakdown' => [
                'Yes' => $results['yes_count'],
                'No' => $results['no_count'],
                'N/A' => $results['na_count'],
            ],
            'colors' => [
                'yes' => '#10B981',
                'no' => '#EF4444',
                'na' => '#6B7280',
                'excellent' => '#10B981',
                'good' => '#3B82F6',
                'fair' => '#F59E0B',
                'poor' => '#EF4444',
            ]
        ];
    }
}
