<?php

namespace App\Services;

use App\Models\Assessment;
use App\Models\Tool;
use Mpdf\Mpdf;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;

class AssessmentReportService
{
    /**
     * Generate PDF report for any assessment tool
     */
    public function generateUniversalReport(Assessment $assessment, array $settings = []): string
    {
        // Default settings
        $defaultSettings = [
            'language' => 'arabic',
            'template' => 'comprehensive',
            'include_charts' => true,
            'include_recommendations' => true,
            'watermark' => false,
            'orientation' => 'portrait',
            'format' => 'A4'
        ];

        $settings = array_merge($defaultSettings, $settings);
        $isArabic = $settings['language'] === 'arabic';

        // Load assessment with all relationships
        $assessment->load([
            'tool.domains.categories.criteria',
            'responses.criterion.category.domain',
            'results'
        ]);

        // Calculate results if not already done
        if ($assessment->results->isEmpty()) {
            $assessment->calculateResults();
            $assessment->refresh();
        }

        // Get structured results
        $results = $this->getStructuredResults($assessment);

        // Determine certification based on tool configuration
        $certification = $this->determineCertification($results['overall_percentage'], $assessment->tool);

        // Generate recommendations if enabled
        $recommendations = $settings['include_recommendations']
            ? $this->generateSmartRecommendations($results, $assessment->tool, $isArabic)
            : [];

        // Prepare template data
        $templateData = [
            'assessment' => $assessment,
            'results' => $results,
            'certification' => $certification,
            'recommendations' => $recommendations,
            'settings' => $settings,
            'isArabic' => $isArabic,
            'generatedAt' => now(),
        ];

        // Generate HTML
        $html = $this->generateHTML($templateData, $settings);

        // Create PDF
        return $this->createPDF($html, $settings);
    }

    /**
     * Get structured results that work with any tool configuration
     */
    private function getStructuredResults(Assessment $assessment): array
    {
        $tool = $assessment->tool;
        $results = $assessment->getResults();

        // Calculate domain-specific metrics
        $domainMetrics = [];
        foreach ($results['domain_results'] as $domainResult) {
            $domain = $tool->domains->find($domainResult['domain_id']);

            $domainMetrics[] = [
                'domain_id' => $domainResult['domain_id'],
                'domain_name_en' => $domain->getName('en'),
                'domain_name_ar' => $domain->getName('ar'),
                'score_percentage' => $domainResult['score_percentage'],
                'total_criteria' => $domainResult['total_criteria'],
                'applicable_criteria' => $domainResult['applicable_criteria'],
                'yes_count' => $domainResult['yes_count'],
                'no_count' => $domainResult['no_count'],
                'na_count' => $domainResult['na_count'],
                'weighted_score' => $domainResult['weighted_score'],
                'categories' => $this->getCategoryBreakdown($domain, $results['category_results'][$domainResult['domain_id']] ?? [])
            ];
        }

        return [
            'assessment_info' => [
                'id' => $assessment->id,
                'assessor_name' => $assessment->getAssessorName(),
                'assessor_email' => $assessment->getAssessorEmail(),
                'organization' => $assessment->organization,
                'status' => $assessment->status,
                'created_at' => $assessment->created_at,
                'completed_at' => $assessment->completed_at,
                'is_guest' => $assessment->isGuestAssessment(),
            ],
            'tool_info' => [
                'id' => $tool->id,
                'name_en' => $tool->getName('en'),
                'name_ar' => $tool->getName('ar'),
                'description_en' => $tool->getDescription('en'),
                'description_ar' => $tool->getDescription('ar'),
                'total_domains' => $tool->domains->count(),
                'total_criteria' => $tool->getCriteriaCount(),
            ],
            'overall_percentage' => $results['overall_percentage'],
            'total_criteria' => $results['total_criteria'],
            'applicable_criteria' => $results['applicable_criteria'],
            'yes_count' => $results['yes_count'],
            'no_count' => $results['no_count'],
            'na_count' => $results['na_count'],
            'domain_results' => $domainMetrics,
            'summary_stats' => $this->calculateSummaryStats($results, $tool),
        ];
    }

    /**
     * Get category breakdown for a domain
     */
    private function getCategoryBreakdown($domain, array $categoryResults): array
    {
        $breakdown = [];

        foreach ($categoryResults as $categoryResult) {
            $category = $domain->categories->find($categoryResult['category_id']);
            if ($category) {
                $breakdown[] = [
                    'category_id' => $categoryResult['category_id'],
                    'category_name_en' => $category->getName('en'),
                    'category_name_ar' => $category->getName('ar'),
                    'score_percentage' => $categoryResult['score_percentage'],
                    'applicable_criteria' => $categoryResult['applicable_criteria'],
                    'yes_count' => $categoryResult['yes_count'],
                    'no_count' => $categoryResult['no_count'],
                    'na_count' => $categoryResult['na_count'],
                ];
            }
        }

        return $breakdown;
    }

    /**
     * Calculate summary statistics
     */
    private function calculateSummaryStats(array $results, Tool $tool): array
    {
        $totalResponses = $results['yes_count'] + $results['no_count'] + $results['na_count'];
        $completionRate = $totalResponses > 0 ? ($results['applicable_criteria'] / $totalResponses) * 100 : 0;
        $successRate = $results['applicable_criteria'] > 0 ? ($results['yes_count'] / $results['applicable_criteria']) * 100 : 0;

        // Find strongest and weakest domains
        $domainScores = collect($results['domain_results'])->sortByDesc('score_percentage');
        $strongestDomain = $domainScores->first();
        $weakestDomain = $domainScores->last();

        return [
            'completion_rate' => round($completionRate, 1),
            'success_rate' => round($successRate, 1),
            'response_distribution' => [
                'yes_percentage' => $totalResponses > 0 ? round(($results['yes_count'] / $totalResponses) * 100, 1) : 0,
                'no_percentage' => $totalResponses > 0 ? round(($results['no_count'] / $totalResponses) * 100, 1) : 0,
                'na_percentage' => $totalResponses > 0 ? round(($results['na_count'] / $totalResponses) * 100, 1) : 0,
            ],
            'strongest_domain' => [
                'name' => $strongestDomain['domain_name'],
                'score' => $strongestDomain['score_percentage']
            ],
            'weakest_domain' => [
                'name' => $weakestDomain['domain_name'],
                'score' => $weakestDomain['score_percentage']
            ],
            'domains_above_80' => $domainScores->filter(fn($d) => $d['score_percentage'] >= 80)->count(),
            'domains_below_60' => $domainScores->filter(fn($d) => $d['score_percentage'] < 60)->count(),
        ];
    }

    /**
     * Determine certification level based on tool-specific thresholds
     */
    private function determineCertification(float $overallScore, Tool $tool): array
    {
        // This could be enhanced to read from tool configuration
        // For now, using standard thresholds
        if ($overallScore >= 90) {
            return [
                'level' => 'full',
                'text_en' => 'Full Certification',
                'text_ar' => 'اعتماد كامل',
                'color' => '#22c55e',
                'bg_color' => '#dcfce7',
                'icon' => 'check-circle'
            ];
        } elseif ($overallScore >= 80) {
            return [
                'level' => 'conditional',
                'text_en' => 'Conditional Certification',
                'text_ar' => 'اعتماد مشروط',
                'color' => '#f59e0b',
                'bg_color' => '#fef3c7',
                'icon' => 'alert-triangle'
            ];
        } elseif ($overallScore >= 70) {
            return [
                'level' => 'improvement_needed',
                'text_en' => 'Improvement Needed',
                'text_ar' => 'يحتاج تحسين',
                'color' => '#f97316',
                'bg_color' => '#fed7aa',
                'icon' => 'alert-circle'
            ];
        } else {
            return [
                'level' => 'insufficient',
                'text_en' => 'Insufficient',
                'text_ar' => 'غير كافي',
                'color' => '#ef4444',
                'bg_color' => '#fee2e2',
                'icon' => 'x-circle'
            ];
        }
    }

    /**
     * Generate smart recommendations based on results
     */
    private function generateSmartRecommendations(array $results, Tool $tool, bool $isArabic): array
    {
        $recommendations = [];

        // Priority recommendations based on domain scores
        foreach ($results['domain_results'] as $domain) {
            if ($domain['score_percentage'] < 70) {
                $priority = $domain['score_percentage'] < 50 ? 'critical' : 'high';

                $recommendations[] = [
                    'domain' => $isArabic ? $domain['domain_name_ar'] : $domain['domain_name_en'],
                    'priority' => $priority,
                    'score' => $domain['score_percentage'],
                    'type' => 'domain_improvement',
                    'title' => $isArabic
                        ? "تطوير {$domain['domain_name_ar']}"
                        : "Improve {$domain['domain_name_en']}",
                    'description' => $this->getRecommendationText($domain, $isArabic),
                    'actions' => $this->getActionItems($domain, $isArabic),
                    'timeline' => $this->getRecommendedTimeline($domain['score_percentage']),
                ];
            }
        }

        // Add strategic recommendations
        if ($results['overall_percentage'] < 80) {
            $recommendations[] = [
                'type' => 'strategic',
                'priority' => 'medium',
                'title' => $isArabic ? 'وضع خطة تحسين شاملة' : 'Develop Comprehensive Improvement Plan',
                'description' => $isArabic
                    ? 'ننصح بوضع خطة تحسين متكاملة تشمل جميع المجالات التي تحتاج تطوير'
                    : 'We recommend developing an integrated improvement plan covering all areas needing development',
                'timeline' => '3-6 months'
            ];
        }

        // Add success reinforcement recommendations
        $strongDomains = collect($results['domain_results'])->filter(fn($d) => $d['score_percentage'] >= 85);
        if ($strongDomains->isNotEmpty()) {
            $recommendations[] = [
                'type' => 'reinforcement',
                'priority' => 'low',
                'title' => $isArabic ? 'الحفاظ على نقاط القوة' : 'Maintain Strengths',
                'description' => $isArabic
                    ? 'المحافظة على الأداء المتميز في المجالات القوية ومشاركة أفضل الممارسات'
                    : 'Maintain excellent performance in strong areas and share best practices',
                'timeline' => 'Ongoing'
            ];
        }

        return $recommendations;
    }

    /**
     * Get recommendation text for a domain
     */
    private function getRecommendationText(array $domain, bool $isArabic): string
    {
        $score = $domain['score_percentage'];
        $domainName = $isArabic ? $domain['domain_name_ar'] : $domain['domain_name_en'];

        if ($score < 50) {
            return $isArabic
                ? "يتطلب {$domainName} إعادة هيكلة شاملة وتطوير أساسي. النتيجة الحالية {$score}% تشير إلى ضرورة اتخاذ إجراءات عاجلة."
                : "{$domainName} requires comprehensive restructuring and fundamental development. Current score of {$score}% indicates urgent action needed.";
        } elseif ($score < 70) {
            return $isArabic
                ? "يحتاج {$domainName} إلى تحسينات متوسطة وتطوير العمليات. النتيجة الحالية {$score}% قابلة للتحسن بجهود مركزة."
                : "{$domainName} needs moderate improvements and process development. Current score of {$score}% can be improved with focused efforts.";
        } else {
            return $isArabic
                ? "يمكن تطوير {$domainName} أكثر من خلال تحسينات طفيفة. النتيجة الحالية {$score}% جيدة ولكن قابلة للتحسن."
                : "{$domainName} can be further developed through minor improvements. Current score of {$score}% is good but can be enhanced.";
        }
    }

    /**
     * Get specific action items for domain improvement
     */
    private function getActionItems(array $domain, bool $isArabic): array
    {
        $score = $domain['score_percentage'];

        if ($score < 50) {
            return $isArabic ? [
                'إجراء تقييم شامل للوضع الحالي',
                'وضع خطة إعادة هيكلة مفصلة',
                'تخصيص موارد كافية للتطوير',
                'تدريب الفريق على المهارات الأساسية',
                'وضع نظام مراقبة ومتابعة دقيق'
            ] : [
                'Conduct comprehensive current state assessment',
                'Develop detailed restructuring plan',
                'Allocate sufficient resources for development',
                'Train team on fundamental skills',
                'Implement precise monitoring and follow-up system'
            ];
        } elseif ($score < 70) {
            return $isArabic ? [
                'تحليل الفجوات الحالية',
                'تطوير العمليات والإجراءات',
                'تحسين التدريب والتطوير',
                'تعزيز آليات المتابعة'
            ] : [
                'Analyze current gaps',
                'Develop processes and procedures',
                'Improve training and development',
                'Enhance follow-up mechanisms'
            ];
        } else {
            return $isArabic ? [
                'مراجعة العمليات الحالية',
                'تطبيق أفضل الممارسات',
                'التحسين المستمر'
            ] : [
                'Review current processes',
                'Apply best practices',
                'Continuous improvement'
            ];
        }
    }

    /**
     * Get recommended timeline based on score
     */
    private function getRecommendedTimeline(float $score): string
    {
        if ($score < 50) return '6-12 months';
        if ($score < 70) return '3-6 months';
        return '1-3 months';
    }

    /**
     * Generate HTML content using Blade templates
     */
    private function generateHTML(array $data, array $settings): string
    {
        $template = $settings['template'];
        $language = $settings['language'] === 'arabic' ? 'ar' : 'en';

        $viewPath = "reports.{$template}.{$language}";

        // Check if specific template exists, fallback to comprehensive
        if (!View::exists($viewPath)) {
            $viewPath = "reports.comprehensive.{$language}";
        }

        return View::make($viewPath, $data)->render();
    }

    /**
     * Create PDF using mPDF with universal settings
     */
    private function createPDF(string $html, array $settings): string
    {
        $isArabic = $settings['language'] === 'arabic';

        $config = [
            'mode' => 'utf-8',
            'format' => $settings['format'] ?? 'A4',
            'orientation' => $settings['orientation'] ?? 'portrait',
            'default_font_size' => 11,
            'default_font' => $isArabic ? 'almarai' : 'dejavusans',
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 20,
            'margin_bottom' => 20,
            'margin_header' => 10,
            'margin_footer' => 10,
            'autoScriptToLang' => true,
            'autoLangToFont' => true,
            'dir' => $isArabic ? 'rtl' : 'ltr',
            'useSubstitutions' => true,
            'simpleTables' => true,
            'packTableData' => true,
            'useKerning' => true,
            'useOTL' => 0xFF,
            'useCSS' => true,
        ];

        $mpdf = new Mpdf($config);

        // Set document properties
        $mpdf->SetTitle($isArabic ? 'تقرير التقييم' : 'Assessment Report');
        $mpdf->SetAuthor('Assessment System');
        $mpdf->SetCreator('Assessment Report Generator');

        // Add watermark if requested
        if ($settings['watermark']) {
            $mpdf->SetWatermarkText($isArabic ? 'سري' : 'CONFIDENTIAL');
            $mpdf->watermark_font = $isArabic ? 'almarai' : 'dejavusans';
            $mpdf->watermarkTextAlpha = 0.1;
            $mpdf->showWatermarkText = true;
        }

        // Write HTML content
        $mpdf->WriteHTML($html);

        return $mpdf->Output('', 'S'); // Return as string
    }

    /**
     * Save report to storage (optional)
     */
    public function saveReport(Assessment $assessment, string $pdfContent, array $settings): string
    {
        $filename = $this->generateFilename($assessment, $settings);
        $path = "reports/{$assessment->id}/{$filename}";

        Storage::disk('private')->put($path, $pdfContent);

        return $path;
    }

    /**
     * Generate appropriate filename
     */
    private function generateFilename(Assessment $assessment, array $settings): string
    {
        $assessorName = str_replace([' ', '.', '/', '\\'], '_', $assessment->getAssessorName());
        $toolName = str_replace([' ', '.', '/', '\\'], '_', $assessment->tool->getName('en'));
        $date = $assessment->created_at->format('Y-m-d');
        $language = $settings['language'];
        $template = $settings['template'];

        return "assessment_report_{$toolName}_{$assessorName}_{$date}_{$language}_{$template}.pdf";
    }

    /**
     * Get chart data for visualizations
     */
    public function getChartData(Assessment $assessment): array
    {
        $results = $this->getStructuredResults($assessment);

        return [
            'domain_scores' => collect($results['domain_results'])->map(function ($domain) {
                return [
                    'name' => $domain['domain_name_en'],
                    'name_ar' => $domain['domain_name_ar'],
                    'score' => $domain['score_percentage'],
                    'color' => $this->getDomainColor($domain['domain_id'])
                ];
            })->toArray(),

            'response_distribution' => [
                'yes' => $results['yes_count'],
                'no' => $results['no_count'],
                'na' => $results['na_count']
            ],

            'progress_indicators' => [
                'completion_rate' => $results['summary_stats']['completion_rate'],
                'success_rate' => $results['summary_stats']['success_rate'],
                'overall_score' => $results['overall_percentage']
            ]
        ];
    }

    /**
     * Get color for domain visualization
     */
    private function getDomainColor(int $domainIndex): string
    {
        $colors = [
            '#3b82f6', // Blue
            '#ef4444', // Red
            '#f97316', // Orange
            '#22c55e', // Green
            '#8b5cf6', // Purple
            '#06b6d4', // Cyan
            '#f59e0b', // Amber
            '#10b981', // Emerald
            '#6366f1', // Indigo
            '#ec4899', // Pink
        ];

        return $colors[$domainIndex % count($colors)];
    }
}
