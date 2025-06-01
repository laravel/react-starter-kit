<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Mpdf\Mpdf;
use Exception;

class FreeUserPDFController extends Controller
{
    /**
     * Download basic PDF report for free users
     */
    public function downloadFreeUserReport(Assessment $assessment)
    {
        $user = Auth::user();

        // Check if user can access this assessment
        if ($assessment->user_id !== $user->id) {
            abort(403, 'You do not have permission to access this assessment.');
        }

        // Check if user is free (not premium)
        if ($user->isPremium()) {
            return redirect()->route('assessments.report.download', $assessment->id);
        }

        Log::info('Free user PDF download requested', [
            'assessment_id' => $assessment->id,
            'user_id' => $user->id
        ]);

        try {
            // Load assessment with necessary relationships
            $assessment->load([
                'tool',
                'responses' => function($query) {
                    $query->with([
                        'criterion' => function($q) {
                            $q->with([
                                'category' => function($q2) {
                                    $q2->with('domain');
                                }
                            ]);
                        }
                    ]);
                }
            ]);

            // Get assessment results
            $results = $this->getAssessmentResults($assessment);

            // Generate PDF using mPDF
            $pdf = $this->generateFreeUserPDF($assessment, $results, $user);

            // Create filename
            $filename = $this->generateFilename($assessment);

            Log::info('Free user PDF generated successfully', [
                'assessment_id' => $assessment->id,
                'filename' => $filename
            ]);

            // FORCE DOWNLOAD - Set proper headers
            return Response::make($pdf, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                'Content-Length' => strlen($pdf),
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0',
            ]);

        } catch (Exception $e) {
            Log::error('Free user PDF generation failed', [
                'assessment_id' => $assessment->id,
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors([
                'pdf' => 'Failed to generate PDF report. Please try again.'
            ]);
        }
    }

    /**
     * Get assessment results data - FIXED to include all domains
     */
    private function getAssessmentResults(Assessment $assessment): array
    {
        try {
            $results = $assessment->getResults();

            return [
                'overall_percentage' => $results['overall_percentage'] ?? 0,
                'total_criteria' => $results['total_criteria'] ?? 0,
                'applicable_criteria' => $results['applicable_criteria'] ?? 0,
                'yes_count' => $results['yes_count'] ?? 0,
                'no_count' => $results['no_count'] ?? 0,
                'na_count' => $results['na_count'] ?? 0,
                'domain_results' => $results['domain_results'] ?? [],
                'completion_date' => $assessment->completed_at,
            ];
        } catch (Exception $e) {
            Log::error('Failed to get assessment results for PDF', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage()
            ]);

            // Fallback calculation if getResults fails
            $responses = $assessment->responses;
            $yesCount = $responses->where('response', 'yes')->count();
            $noCount = $responses->where('response', 'no')->count();
            $naCount = $responses->where('response', 'na')->count();
            $total = $yesCount + $noCount + $naCount;
            $applicable = $yesCount + $noCount;

            return [
                'overall_percentage' => $applicable > 0 ? round(($yesCount / $applicable) * 100, 2) : 0,
                'total_criteria' => $total,
                'applicable_criteria' => $applicable,
                'yes_count' => $yesCount,
                'no_count' => $noCount,
                'na_count' => $naCount,
                'domain_results' => [],
                'completion_date' => $assessment->completed_at,
            ];
        }
    }

    /**
     * Generate PDF using mPDF with Arial font
     */
    private function generateFreeUserPDF(Assessment $assessment, array $results, $user): string
    {
        try {
            // Initialize mPDF with better configuration
            $mpdf = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'P',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 20,
                'margin_bottom' => 15,
                'default_font' => 'arial',
                'default_font_size' => 10,
                'tempDir' => storage_path('app/temp')
            ]);

            // Get HTML content
            $html = $this->generateCompactHTML($assessment, $results, $user);

            // Write HTML to PDF
            $mpdf->WriteHTML($html);

            // Return PDF as string
            return $mpdf->Output('', 'S');

        } catch (Exception $e) {
            Log::error('mPDF generation failed', [
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    /**
     * Generate COMPACT PROFESSIONAL HTML content for free user report
     */
    private function generateCompactHTML(Assessment $assessment, array $results, $user): string
    {
        $overallScore = $results['overall_percentage'];
        $assessmentStatus = $this->getAssessmentStatus($overallScore);
        $scoreColor = $this->getScoreColor($overallScore);
        $domainResults = $results['domain_results'] ?? [];

        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @page {
                    margin: 15mm;
                    @top-center {
                        content: "Assessment Report - ' . htmlspecialchars($assessment->tool->name_en) . ' | Page " counter(page);
                        font-size: 8px;
                        color: #666;
                        padding-bottom: 5mm;
                        border-bottom: 0.5px solid #ddd;
                    }
                }

                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #2d3748;
                    line-height: 1.4;
                    font-size: 10px;
                }

                .header {
                    background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
                    color: white;
                    padding: 15px;
                    text-align: center;
                    margin-bottom: 15px;
                    border-radius: 5px;
                }

                .header h1 {
                    margin: 0 0 5px 0;
                    font-size: 18px;
                    font-weight: bold;
                }

                .header .subtitle {
                    font-size: 12px;
                    opacity: 0.9;
                    margin: 0;
                }

                .meta-info {
                    background: #f8fafc;
                    padding: 8px;
                    border-radius: 4px;
                    margin-bottom: 15px;
                    font-size: 8px;
                    text-align: center;
                    border: 1px solid #e2e8f0;
                }

                .two-column {
                    display: table;
                    width: 100%;
                    margin-bottom: 15px;
                }

                .column {
                    display: table-cell;
                    vertical-align: top;
                    padding: 0 5px;
                }

                .column.left {
                    width: 60%;
                }

                .column.right {
                    width: 40%;
                }

                .section {
                    margin-bottom: 12px;
                    page-break-inside: avoid;
                }

                .section-title {
                    background: #003fab;
                    color: white;
                    padding: 6px 10px;
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0 0 1px 0;
                    border-radius: 3px 3px 0 0;
                }

                .section-content {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-top: none;
                    padding: 10px;
                    border-radius: 0 0 3px 3px;
                }

                .info-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 9px;
                }

                .info-table tr {
                    border-bottom: 1px solid #f1f5f9;
                }

                .info-table td {
                    padding: 4px 6px;
                    vertical-align: top;
                }

                .info-table .label {
                    font-weight: bold;
                    width: 35%;
                    background: #f8fafc;
                    color: #4a5568;
                }

                .score-container {
                    text-align: center;
                    background: #f8fafc;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    border: 1px solid #e2e8f0;
                }

                 .score-circle {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: ' . $scoreColor . ';
                    color: white;
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;
                    margin: 0 auto 8px auto;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                }

                .score-circle .percentage {
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 1;
                    margin: 0;
                    display: block;
                }

                .score-circle .label {
                    font-size: 7px;
                    opacity: 0.9;
                    text-transform: uppercase;
                    margin: 0;
                    line-height: 1;
                    display: block;
                }

                .status-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-weight: bold;
                    font-size: 9px;
                    margin-top: 5px;
                    background: ' . $assessmentStatus['bg_color'] . ';
                    color: ' . $assessmentStatus['text_color'] . ';
                    border: 1px solid ' . $assessmentStatus['text_color'] . ';
                }

                .stats-row {
                    display: table;
                    width: 100%;
                    margin-top: 10px;
                }

                .stat-item {
                    display: table-cell;
                    text-align: center;
                    padding: 8px 4px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    font-size: 9px;
                }

                .stat-number {
                    display: block;
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 2px;
                }

                .stat-label {
                    font-size: 8px;
                    color: #718096;
                    text-transform: uppercase;
                }

                .yes-stat { color: #38a169; }
                .no-stat { color: #e53e3e; }
                .na-stat { color: #718096; }
                .total-stat { color: #3182ce; }

                .domain-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                    margin: 10px 0;
                }

                .domain-item {
                    background: white;
                    padding: 8px;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    border-left: 3px solid #4299e1;
                    font-size: 9px;
                }

                .domain-name {
                    font-weight: bold;
                    color: #2d3748;
                    margin-bottom: 4px;
                    font-size: 10px;
                }

                .domain-score {
                    float: right;
                    font-weight: bold;
                    padding: 2px 6px;
                    border-radius: 8px;
                    color: white;
                    font-size: 9px;
                    min-width: 30px;
                    text-align: center;
                }

                .domain-stats {
                    display: table;
                    width: 100%;
                    margin-top: 5px;
                    font-size: 8px;
                }

                .domain-stat {
                    display: table-cell;
                    text-align: center;
                    padding: 3px 2px;
                }

                .domain-stat-num {
                    display: block;
                    font-weight: bold;
                    font-size: 11px;
                }

                .domain-stat-lbl {
                    font-size: 7px;
                    color: #718096;
                    text-transform: uppercase;
                }

                .summary-section {
                    background: #ebf8ff;
                    border-left: 4px solid #3182ce;
                    padding: 10px;
                    margin: 12px 0;
                    border-radius: 0 4px 4px 0;
                    font-size: 9px;
                }

                .summary-section h4 {
                    margin: 0 0 8px 0;
                    color: #2c5282;
                    font-size: 11px;
                }

                .recommendation-section {
                    background: #fffbeb;
                    border-left: 4px solid #d69e2e;
                    padding: 10px;
                    margin: 12px 0;
                    border-radius: 0 4px 4px 0;
                    font-size: 9px;
                }

                .recommendation-section h4 {
                    margin: 0 0 6px 0;
                    color: #744210;
                    font-size: 10px;
                }

                .recommendation-section ul {
                    margin: 0;
                    padding-left: 15px;
                    color: #744210;
                }

                .recommendation-section li {
                    margin-bottom: 4px;
                    font-size: 8px;
                    line-height: 1.3;
                }

                .upgrade-box {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 12px;
                    border-radius: 6px;
                    text-align: center;
                    margin: 15px 0;
                    font-size: 9px;
                }

                .upgrade-box h3 {
                    margin: 0 0 6px 0;
                    font-size: 12px;
                }

                .footer {
                    text-align: center;
                    margin-top: 15px;
                    padding: 8px;
                    background: #f8fafc;
                    border-radius: 4px;
                    color: #718096;
                    font-size: 8px;
                    border: 1px solid #e2e8f0;
                }

                .priority-domains {
                    background: #fed7d7;
                    border: 1px solid #fc8181;
                    padding: 8px;
                    border-radius: 4px;
                    margin: 8px 0;
                    font-size: 8px;
                }

                .priority-domains h5 {
                    margin: 0 0 4px 0;
                    color: #742a2a;
                    font-size: 9px;
                }

                .priority-list {
                    color: #742a2a;
                    font-weight: bold;
                    margin: 0;
                }

                .page-break {
                    page-break-before: always;
                }
            </style>
        </head>
        <body>
            <div class="meta-info">
                <strong>ASSESSMENT HUB - PROFESSIONAL EVALUATION REPORT</strong><br>
                Generated: ' . now()->format('M j, Y g:i A') . ' | Report ID: #' . $assessment->id . '
            </div>

            <div class="header">
                <h1>ASSESSMENT REPORT</h1>
                <p class="subtitle">' . htmlspecialchars($assessment->tool->name_en) . ' - Free Plan Analysis</p>
            </div>

            <div class="two-column">
                <div class="column left">
                    <div class="section">
                        <div class="section-title">📋 Assessment Information</div>
                        <div class="section-content">
                            <table class="info-table">
                                <tr>
                                    <td class="label">Assessor</td>
                                    <td>' . htmlspecialchars($assessment->name) . '</td>
                                </tr>
                                <tr>
                                    <td class="label">Email</td>
                                    <td>' . htmlspecialchars($assessment->email) . '</td>
                                </tr>';

        if ($assessment->organization) {
            $html .= '
                                <tr>
                                    <td class="label">Organization</td>
                                    <td>' . htmlspecialchars($assessment->organization) . '</td>
                                </tr>';
        }

        $html .= '
                                <tr>
                                    <td class="label">Assessment Tool</td>
                                    <td>' . htmlspecialchars($assessment->tool->name_en) . '</td>
                                </tr>
                                <tr>
                                    <td class="label">Completed Date</td>
                                    <td>' . ($assessment->completed_at ? $assessment->completed_at->format('M j, Y g:i A') : 'In Progress') . '</td>
                                </tr>
                                <tr>
                                    <td class="label">Assessment ID</td>
                                    <td>#' . $assessment->id . '</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="column right">
                    <div class="score-container">
                        <div class="score-circle">
                            <div class="percentage">' . round($overallScore) . '%</div>
                            <div class="label">Overall Score</div>
                        </div>
                        <div class="status-badge">
                            ' . $assessmentStatus['label'] . '
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">📊 Results Summary</div>
                <div class="section-content">
                    <div class="stats-row">
                        <div class="stat-item">
                            <span class="stat-number yes-stat">' . $results['yes_count'] . '</span>
                            <span class="stat-label">Yes</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number no-stat">' . $results['no_count'] . '</span>
                            <span class="stat-label">No</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number na-stat">' . $results['na_count'] . '</span>
                            <span class="stat-label">N/A</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number total-stat">' . $results['total_criteria'] . '</span>
                            <span class="stat-label">Total</span>
                        </div>
                    </div>
                </div>
            </div>';

        // Add Domain Results in compact grid
        if (!empty($domainResults)) {
            $html .= '
            <div class="section">
                <div class="section-title">🎯 Domain Performance</div>
                <div class="section-content">
                    <div class="domain-grid">';

            foreach ($domainResults as $domain) {
                $domainScore = $domain['score_percentage'];
                $domainScoreColor = $this->getScoreColor($domainScore);

                $html .= '
                        <div class="domain-item">
                            <div class="domain-name">
                                ' . htmlspecialchars($domain['domain_name']) . '
                                <span class="domain-score" style="background: ' . $domainScoreColor . ';">
                                    ' . round($domainScore) . '%
                                </span>
                            </div>
                            <div class="domain-stats">
                                <div class="domain-stat">
                                    <span class="domain-stat-num yes-stat">' . $domain['yes_count'] . '</span>
                                    <span class="domain-stat-lbl">Yes</span>
                                </div>
                                <div class="domain-stat">
                                    <span class="domain-stat-num no-stat">' . $domain['no_count'] . '</span>
                                    <span class="domain-stat-lbl">No</span>
                                </div>
                                <div class="domain-stat">
                                    <span class="domain-stat-num na-stat">' . $domain['na_count'] . '</span>
                                    <span class="domain-stat-lbl">N/A</span>
                                </div>
                                <div class="domain-stat">
                                    <span class="domain-stat-num total-stat">' . $domain['total_criteria'] . '</span>
                                    <span class="domain-stat-lbl">Total</span>
                                </div>
                            </div>
                        </div>';
            }

            $html .= '
                    </div>
                </div>
            </div>';
        }

        $html .= '
            <div class="section">
                <div class="section-title">📝 Assessment Summary & Recommendations</div>
                <div class="section-content">
                    <div class="summary-section">
                        <h4>Assessment Status: ' . $assessmentStatus['label'] . '</h4>
                        <p>' . $assessmentStatus['description'] . '</p>
                    </div>

                    ' . $this->getCompactRecommendations($overallScore, $domainResults) . '
                </div>
            </div>

            <div class="upgrade-box">
                <h3>🚀 UNLOCK COMPREHENSIVE ANALYSIS</h3>
                <p>Upgrade to Premium for detailed category breakdowns, advanced analytics, AI-powered recommendations, action plans, and unlimited assessments.</p>
            </div>

            <div class="footer">
                <p><strong>Basic assessment report for Free Plan users.</strong> For detailed analysis and comprehensive recommendations, upgrade to Premium.</p>
                <p>Report generated by Assessment Hub on ' . now()->format('M j, Y g:i A') . '</p>
                <p><strong>Assessment Hub</strong> - Professional Evaluation Solutions | www.assessmenthub.com</p>
            </div>
        </body>
        </html>';

        return $html;
    }

    /**
     * Get compact recommendations
     */
    private function getCompactRecommendations(float $overallScore, array $domainResults): string
    {
        $recommendations = '';

        if ($overallScore >= 80) {
            $recommendations = '
            <div class="recommendation-section">
                <h4>🏆 Excellence Maintenance Strategy:</h4>
                <ul>
                    <li>Establish regular performance monitoring cycles</li>
                    <li>Document and standardize best practices</li>
                    <li>Implement continuous improvement initiatives</li>
                    <li>Develop benchmarking relationships with industry leaders</li>
                </ul>
            </div>';
        } elseif ($overallScore >= 70) {
            $recommendations = '
            <div class="recommendation-section">
                <h4>📈 Performance Enhancement Plan:</h4>
                <ul>
                    <li>Conduct detailed analysis of areas scoring below 80%</li>
                    <li>Implement structured review cycles and monitoring systems</li>
                    <li>Invest in targeted staff training and development programs</li>
                    <li>Develop standardized operating procedures for key processes</li>
                </ul>
            </div>';
        } elseif ($overallScore >= 60) {
            $recommendations = '
            <div class="recommendation-section">
                <h4>⚡ Priority Improvement Initiative:</h4>
                <ul>
                    <li>Conduct comprehensive assessment of low-performing domains</li>
                    <li>Develop detailed improvement action plans with timelines</li>
                    <li>Allocate dedicated resources for critical capability building</li>
                    <li>Consider external training or consulting for specialized areas</li>
                </ul>
            </div>';
        } else {
            $recommendations = '
            <div class="recommendation-section">
                <h4>🚨 Urgent Transformation Program:</h4>
                <ul>
                    <li>Initiate immediate comprehensive review of all processes</li>
                    <li>Prioritize critical gaps that pose operational risks</li>
                    <li>Engage external consulting for systematic transformation</li>
                    <li>Develop detailed timeline-based improvement roadmap</li>
                    <li>Implement daily/weekly progress reviews</li>
                </ul>
            </div>';
        }

        // Add priority domains if available
        if (!empty($domainResults)) {
            $lowPerformingDomains = array_filter($domainResults, function($domain) {
                return $domain['score_percentage'] < 70;
            });

            if (!empty($lowPerformingDomains)) {
                $domainNames = array_column($lowPerformingDomains, 'domain_name');
                $domainList = implode(', ', $domainNames);

                $recommendations .= '
                <div class="priority-domains">
                    <h5>🎯 Priority Domains Requiring Attention:</h5>
                    <p class="priority-list">The following domains scored below 70%: ' . $domainList . '</p>
                    <p>Consider developing domain-specific improvement plans with targeted actions and timelines.</p>
                </div>';
            }
        }

        return $recommendations;
    }

    /**
     * Get assessment status based on score
     */
    private function getAssessmentStatus(float $score): array
    {
        if ($score >= 80) {
            return [
                'label' => '✅ EXCELLENT',
                'description' => 'Outstanding results! Your organization demonstrates excellent capabilities across all assessed areas.',
                'bg_color' => '#dcfce7',
                'text_color' => '#166534',
            ];
        } elseif ($score >= 70) {
            return [
                'label' => '✅ GOOD',
                'description' => 'Solid results with good foundations. Strong capabilities with some enhancement opportunities.',
                'bg_color' => '#dbeafe',
                'text_color' => '#1e40af',
            ];
        } elseif ($score >= 60) {
            return [
                'label' => '⚠️ ACCEPTABLE',
                'description' => 'Acceptable baseline with opportunities for improvement. Focus on enhancing key areas.',
                'bg_color' => '#fef3c7',
                'text_color' => '#92400e',
            ];
        } elseif ($score >= 40) {
            return [
                'label' => '⚠️ NEEDS IMPROVEMENT',
                'description' => 'Performance below optimal levels. Immediate attention required in multiple areas.',
                'bg_color' => '#fed7d7',
                'text_color' => '#c53030',
            ];
        } else {
            return [
                'label' => '❌ CRITICAL',
                'description' => 'Significant performance gaps identified. Urgent comprehensive review required.',
                'bg_color' => '#fecaca',
                'text_color' => '#991b1b',
            ];
        }
    }

    /**
     * Get score color based on percentage
     */
    private function getScoreColor(float $score): string
    {
        if ($score >= 80) return '#10b981'; // emerald
        if ($score >= 70) return '#3b82f6'; // blue
        if ($score >= 60) return '#f59e0b'; // amber
        if ($score >= 40) return '#f97316'; // orange
        return '#ef4444'; // red
    }

    /**
     * Generate filename for the PDF
     */
    private function generateFilename(Assessment $assessment): string
    {
        $toolName = str_replace([' ', '/', '\\', ':', '*', '?', '"', '<', '>', '|'], '_', $assessment->tool->name_en);
        $date = now()->format('Y-m-d');
        $assessmentId = $assessment->id;

        return "Assessment_Report_{$toolName}_{$assessmentId}_{$date}.pdf";
    }
}
