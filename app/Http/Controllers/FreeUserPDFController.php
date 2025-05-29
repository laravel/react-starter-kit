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
                'responses.criterion.category.domain',
                'results.domain'
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
     * Generate PDF using mPDF with Arial font (since Calibri requires licensing)
     */
    private function generateFreeUserPDF(Assessment $assessment, array $results, $user): string
    {
        try {
            // Initialize mPDF with Arial font (free alternative to Calibri)
            $mpdf = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'P',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 20,
                'margin_bottom' => 20,
                'default_font' => 'arial',  // Using Arial instead of Calibri
                'default_font_size' => 11,
            ]);

            // Get HTML content
            $html = $this->generateFreeUserHTML($assessment, $results, $user);

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
     * Generate HTML content for free user report
     */
    private function generateFreeUserHTML(Assessment $assessment, array $results, $user): string
    {
        $overallScore = $results['overall_percentage'];
        $assessmentStatus = $this->getAssessmentStatus($overallScore);
        $scoreColor = $this->getScoreColor($overallScore);

        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #333;
                    line-height: 1.6;
                }

                .header {
                    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    margin-bottom: 30px;
                }

                .header h1 {
                    margin: 0;
                    font-size: 24px;
                    font-weight: bold;
                }

                .header p {
                    margin: 10px 0 0 0;
                    font-size: 14px;
                    opacity: 0.9;
                }

                .company-info {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 12px;
                    color: #666;
                }

                .section {
                    margin-bottom: 25px;
                    page-break-inside: avoid;
                }

                .section h2 {
                    color: #2563eb;
                    border-bottom: 2px solid #2563eb;
                    padding-bottom: 8px;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                .info-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }

                .info-table td {
                    padding: 8px;
                    border-bottom: 1px solid #e5e7eb;
                }

                .info-label {
                    font-weight: bold;
                    width: 150px;
                    color: #555;
                }

                .info-value {
                    color: #333;
                }

                .score-section {
                    text-align: center;
                    margin: 30px 0;
                }

                .score-circle {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: ' . $scoreColor . ';
                    color: white;
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 15px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }

                .score-circle .percentage {
                    font-size: 32px;
                    line-height: 1;
                }

                .score-circle .label {
                    font-size: 12px;
                    margin-top: 5px;
                    opacity: 0.9;
                }

                .status-badge {
                    display: inline-block;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 20px;
                    background: ' . $assessmentStatus['bg_color'] . ';
                    color: ' . $assessmentStatus['text_color'] . ';
                    border: 2px solid ' . $assessmentStatus['text_color'] . ';
                }

                .stats-container {
                    background: #f8fafc;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                }

                .stats-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .stats-table td {
                    text-align: center;
                    padding: 15px;
                    width: 25%;
                }

                .stat-number {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 5px;
                    display: block;
                }

                .stat-label {
                    font-size: 12px;
                    color: #666;
                    text-transform: uppercase;
                    font-weight: bold;
                }

                .yes-stat { color: #10b981; }
                .no-stat { color: #ef4444; }
                .na-stat { color: #6b7280; }
                .total-stat { color: #3b82f6; }

                .summary-section {
                    background: #f0f9ff;
                    border-left: 6px solid #2563eb;
                    padding: 20px;
                    margin: 20px 0;
                }

                .summary-section h4 {
                    margin: 0 0 10px 0;
                    color: #1e40af;
                    font-size: 16px;
                    font-weight: bold;
                }

                .summary-section p {
                    margin: 0;
                    font-size: 14px;
                    color: #1e3a8a;
                }

                .recommendation {
                    background: #fefce8;
                    border-left: 6px solid #eab308;
                    padding: 20px;
                    margin: 15px 0;
                }

                .recommendation h4 {
                    margin: 0 0 15px 0;
                    color: #92400e;
                    font-size: 16px;
                    font-weight: bold;
                }

                .recommendation ul {
                    margin: 0;
                    padding-left: 20px;
                    color: #451a03;
                }

                .recommendation li {
                    margin-bottom: 8px;
                    font-size: 13px;
                    line-height: 1.5;
                }

                .upgrade-notice {
                    background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
                    color: white;
                    padding: 25px;
                    border-radius: 12px;
                    text-align: center;
                    margin: 30px 0;
                }

                .upgrade-notice h3 {
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    font-weight: bold;
                }

                .upgrade-notice p {
                    margin: 0;
                    font-size: 14px;
                    opacity: 0.9;
                    line-height: 1.5;
                }

                .footer {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #e5e7eb;
                    color: #6b7280;
                    font-size: 11px;
                }

                .page-break {
                    page-break-before: always;
                }

                .highlight-box {
                    background: #ecfdf5;
                    border: 2px solid #10b981;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    text-align: center;
                }

                .highlight-box h3 {
                    color: #047857;
                    margin: 0 0 10px 0;
                    font-size: 18px;
                }

                .warning-box {
                    background: #fef2f2;
                    border: 2px solid #ef4444;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    text-align: center;
                }

                .warning-box h3 {
                    color: #dc2626;
                    margin: 0 0 10px 0;
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <div class="company-info">
                <strong>ASSESSMENT HUB - PROFESSIONAL EVALUATION REPORT</strong><br>
                Generated on ' . now()->format('F j, Y \a\t g:i A') . '
            </div>

            <div class="header">
                <h1>ASSESSMENT REPORT - FREE PLAN</h1>
                <p>' . $assessment->tool->name_en . '</p>
            </div>

            <div class="section">
                <h2>📋 Assessment Information</h2>
                <table class="info-table">
                    <tr>
                        <td class="info-label">Assessor:</td>
                        <td class="info-value">' . $assessment->name . '</td>
                    </tr>
                    <tr>
                        <td class="info-label">Email:</td>
                        <td class="info-value">' . $assessment->email . '</td>
                    </tr>';

        if ($assessment->organization) {
            $html .= '
                    <tr>
                        <td class="info-label">Organization:</td>
                        <td class="info-value">' . $assessment->organization . '</td>
                    </tr>';
        }

        $html .= '
                    <tr>
                        <td class="info-label">Assessment ID:</td>
                        <td class="info-value">#' . $assessment->id . '</td>
                    </tr>
                    <tr>
                        <td class="info-label">Completed Date:</td>
                        <td class="info-value">' . ($assessment->completed_at ? $assessment->completed_at->format('F j, Y \a\t g:i A') : 'In Progress') . '</td>
                    </tr>
                    <tr>
                        <td class="info-label">Assessment Tool:</td>
                        <td class="info-value">' . $assessment->tool->name_en . '</td>
                    </tr>
                </table>
            </div>

            <div class="section">
                <h2>🎯 Overall Results</h2>
                <div class="score-section">
                    <div class="score-circle">
                        <div class="percentage">' . round($overallScore) . '%</div>
                        <div class="label">OVERALL SCORE</div>
                    </div>
                    <div class="status-badge">
                        ' . $assessmentStatus['label'] . '
                    </div>
                </div>

                <div class="stats-container">
                    <table class="stats-table">
                        <tr>
                            <td>
                                <span class="stat-number yes-stat">' . $results['yes_count'] . '</span>
                                <span class="stat-label">Yes Responses</span>
                            </td>
                            <td>
                                <span class="stat-number no-stat">' . $results['no_count'] . '</span>
                                <span class="stat-label">No Responses</span>
                            </td>
                            <td>
                                <span class="stat-number na-stat">' . $results['na_count'] . '</span>
                                <span class="stat-label">Not Applicable</span>
                            </td>
                            <td>
                                <span class="stat-number total-stat">' . $results['total_criteria'] . '</span>
                                <span class="stat-label">Total Questions</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="section">
                <h2>📊 Assessment Summary</h2>
                <div class="summary-section">
                    <h4>Assessment Status: ' . $assessmentStatus['label'] . '</h4>
                    <p>' . $assessmentStatus['description'] . '</p>
                </div>

                ' . $this->getStatusBox($overallScore) . '

                ' . $this->getRecommendations($overallScore) . '
            </div>

            <div class="upgrade-notice">
                <h3>🚀 UNLOCK FULL ANALYSIS WITH PREMIUM</h3>
                <p>Get detailed domain breakdowns, advanced analytics, comprehensive recommendations, and unlimited assessments with our Premium plan.</p>
            </div>

            <div class="footer">
                <p><strong>This is a basic report generated for Free Plan users.</strong></p>
                <p>For detailed analysis and advanced features, upgrade to Premium.</p>
                <p>Report generated by Assessment Hub on ' . now()->format('F j, Y \a\t g:i A') . '</p>
                <p>Assessment Hub - Professional Evaluation Solutions</p>
            </div>
        </body>
        </html>';

        return $html;
    }

    /**
     * Get assessment results data
     */
    private function getAssessmentResults(Assessment $assessment): array
    {
        $results = $assessment->results;
        $domainResults = $results->where('category_id', null);

        $totalCriteria = $domainResults->sum('total_criteria');
        $applicableCriteria = $domainResults->sum('applicable_criteria');
        $yesCount = $domainResults->sum('yes_count');
        $noCount = $domainResults->sum('no_count');
        $naCount = $domainResults->sum('na_count');
        $overallPercentage = $applicableCriteria > 0 ? ($yesCount / $applicableCriteria) * 100 : 0;

        return [
            'overall_percentage' => round($overallPercentage, 2),
            'total_criteria' => $totalCriteria,
            'applicable_criteria' => $applicableCriteria,
            'yes_count' => $yesCount,
            'no_count' => $noCount,
            'na_count' => $naCount,
            'completion_date' => $assessment->completed_at,
        ];
    }

    /**
     * Get assessment status based on score
     */
    private function getAssessmentStatus(float $score): array
    {
        if ($score >= 80) {
            return [
                'label' => '✅ PASSED - EXCELLENT',
                'description' => 'Outstanding performance. Your organization demonstrates excellent capabilities across all assessed areas.',
                'bg_color' => '#dcfce7',
                'text_color' => '#166534',
            ];
        } elseif ($score >= 70) {
            return [
                'label' => '✅ PASSED - GOOD',
                'description' => 'Good performance with solid foundations. Some areas may benefit from improvement.',
                'bg_color' => '#dbeafe',
                'text_color' => '#1e40af',
            ];
        } elseif ($score >= 60) {
            return [
                'label' => '⚠️ PARTIALLY PASSED',
                'description' => 'Acceptable performance but significant areas need improvement to reach optimal levels.',
                'bg_color' => '#fef3c7',
                'text_color' => '#92400e',
            ];
        } elseif ($score >= 40) {
            return [
                'label' => '⚠️ NEEDS SIGNIFICANT IMPROVEMENT',
                'description' => 'Performance is below acceptable levels. Immediate action required in multiple areas.',
                'bg_color' => '#fed7d7',
                'text_color' => '#c53030',
            ];
        } else {
            return [
                'label' => '❌ FAILED - CRITICAL GAPS',
                'description' => 'Critical performance gaps identified. Comprehensive review and improvement plan required.',
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
        if ($score >= 80) return '#10b981'; // green
        if ($score >= 70) return '#3b82f6'; // blue
        if ($score >= 60) return '#f59e0b'; // amber
        if ($score >= 40) return '#f97316'; // orange
        return '#ef4444'; // red
    }

    /**
     * Get status highlight box
     */
    private function getStatusBox(float $score): string
    {
        if ($score >= 70) {
            return '
            <div class="highlight-box">
                <h3>🎉 CONGRATULATIONS!</h3>
                <p style="color: #047857; font-size: 14px; margin: 0;">
                    Your assessment results indicate strong performance. Keep up the excellent work!
                </p>
            </div>';
        } elseif ($score >= 40) {
            return '
            <div class="warning-box">
                <h3>⚠️ ACTION REQUIRED</h3>
                <p style="color: #dc2626; font-size: 14px; margin: 0;">
                    Your assessment indicates areas that need attention. Review the recommendations below.
                </p>
            </div>';
        } else {
            return '
            <div class="warning-box">
                <h3>🚨 URGENT ATTENTION NEEDED</h3>
                <p style="color: #dc2626; font-size: 14px; margin: 0;">
                    Critical gaps identified. Immediate comprehensive action plan required.
                </p>
            </div>';
        }
    }

    /**
     * Get recommendations based on score
     */
    private function getRecommendations(float $score): string
    {
        $recommendations = '';

        if ($score >= 80) {
            $recommendations = '
            <div class="recommendation">
                <h4>🏆 Recommendations for Excellence Maintenance:</h4>
                <ul>
                    <li>Continue monitoring current processes and maintain high standards</li>
                    <li>Focus on knowledge sharing and best practice documentation</li>
                    <li>Consider mentoring other departments or organizations</li>
                    <li>Implement continuous improvement initiatives</li>
                    <li>Establish benchmarking with industry leaders</li>
                </ul>
            </div>';
        } elseif ($score >= 70) {
            $recommendations = '
            <div class="recommendation">
                <h4>📈 Recommendations for Further Improvement:</h4>
                <ul>
                    <li>Identify specific areas scoring below 80% for targeted improvement</li>
                    <li>Implement regular review cycles and monitoring systems</li>
                    <li>Invest in staff training and development programs</li>
                    <li>Develop standardized operating procedures</li>
                    <li>Create performance measurement frameworks</li>
                </ul>
            </div>';
        } elseif ($score >= 60) {
            $recommendations = '
            <div class="recommendation">
                <h4>⚡ Priority Improvement Areas:</h4>
                <ul>
                    <li>Conduct detailed analysis of low-scoring domains</li>
                    <li>Develop comprehensive improvement action plans</li>
                    <li>Allocate resources for critical capability building</li>
                    <li>Establish regular progress monitoring and reporting</li>
                    <li>Consider external training or consulting support</li>
                    <li>Set specific, measurable improvement targets</li>
                </ul>
            </div>';
        } else {
            $recommendations = '
            <div class="recommendation">
                <h4>🚨 Urgent Action Required:</h4>
                <ul>
                    <li>Immediate comprehensive review of all processes and capabilities</li>
                    <li>Prioritize critical gaps that pose operational risks</li>
                    <li>Consider external consulting or expert guidance</li>
                    <li>Develop timeline-based improvement roadmap</li>
                    <li>Implement weekly progress reviews and reporting</li>
                    <li>Allocate dedicated resources for improvement initiatives</li>
                    <li>Establish crisis management protocols if necessary</li>
                </ul>
            </div>';
        }

        return $recommendations;
    }

    /**
     * Generate filename for the PDF
     */
    private function generateFilename(Assessment $assessment): string
    {
        $toolName = str_replace([' ', '/', '\\', ':', '*', '?', '"', '<', '>', '|'], '_', $assessment->tool->name_en);
        $date = now()->format('Y-m-d');
        $assessmentId = $assessment->id;

        return "Free_Assessment_Report_{$toolName}_{$assessmentId}_{$date}.pdf";
    }
}
