<?php

/**
 * File Location: app/Http/Controllers/AssessmentPDFController.php
 *
 * This controller handles PDF generation for assessment results.
 * It works dynamically with any tool and generates professional PDF reports.
 * Now supports bilingual PDF generation (EN/AR).
 */

namespace App\Http\Controllers;

use App\Services\AssessmentPDFService;
use App\Models\Assessment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\JsonResponse;

class AssessmentPDFController extends Controller
{
    /**
     * Generate and download assessment PDF
     * Route: GET /assessment/{assessment}/pdf/download
     */
    public function downloadAssessmentPDF(Request $request, Assessment $assessment): Response|JsonResponse
    {
        try {
            // Check if user can access this assessment
            $this->authorizeAssessment($assessment);

            // Get language from request, default to 'en'
            $language = $request->get('lang', 'en');

            // Validate language
            if (!in_array($language, ['en', 'ar'])) {
                $language = 'en';
            }

            // Ensure assessment is completed
            if ($assessment->status !== 'completed') {
                return response()->json([
                    'error' => 'Assessment not completed',
                    'message' => 'PDF can only be generated for completed assessments.'
                ], 400);
            }

            // Get assessment results
            $results = $assessment->getResults();

            // Translate domain names based on language
            $results = $this->translateDomainNames($results, $language, $assessment);

            // Get user for company information
            $user = $assessment->user;

            // Create PDF service with language
            $pdfService = new AssessmentPDFService($language);
            $pdfService->setAssessmentData($assessment, $results, $user);

            // Generate and return PDF
            return $pdfService->generatePDF();

        } catch (\Exception $e) {
            Log::error('Failed to generate assessment PDF', [
                'assessment_id' => $assessment->id,
                'language' => $language ?? 'unknown',
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => 'Failed to generate PDF',
                'message' => 'Please try again or contact support if the problem persists.'
            ], 500);
        }
    }

    /**
     * Save assessment PDF to storage
     * Route: POST /assessment/{assessment}/pdf/save
     */
    public function saveAssessmentPDF(Request $request, Assessment $assessment)
    {
        try {
            // Check authorization
            $this->authorizeAssessment($assessment);

            // Validate request
            $validated = $request->validate([
                'filename' => 'sometimes|string|max:255',
                'lang' => 'sometimes|in:en,ar'
            ]);

            $language = $validated['lang'] ?? 'en';

            // Ensure assessment is completed
            if ($assessment->status !== 'completed') {
                return response()->json([
                    'error' => 'Assessment not completed',
                    'message' => 'PDF can only be generated for completed assessments.'
                ], 400);
            }

            // Get assessment results
            $results = $assessment->getResults();

            // Translate domain names
            $results = $this->translateDomainNames($results, $language, $assessment);

            $user = $assessment->user;

            // Create PDF service with language
            $pdfService = new AssessmentPDFService($language);
            $pdfService->setAssessmentData($assessment, $results, $user);

            // Generate custom filename if not provided
            $filename = $validated['filename'] ?? null;

            // Save the PDF
            $filePath = $pdfService->savePDF($filename);

            return response()->json([
                'success' => true,
                'message' => 'Assessment PDF generated and saved successfully',
                'file_path' => $filePath,
                'download_url' => Storage::url($filePath),
                'language' => $language,
                'assessment' => [
                    'id' => $assessment->id,
                    'name' => $assessment->name,
                    'tool' => $language === 'ar' ? $assessment->tool->name_ar : $assessment->tool->name_en,
                    'overall_score' => $results['overall_percentage']
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to save assessment PDF', [
                'assessment_id' => $assessment->id,
                'language' => $language ?? 'unknown',
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => 'Failed to save PDF',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Preview assessment PDF in browser
     * Route: GET /assessment/{assessment}/pdf/preview
     */
    public function previewAssessmentPDF(Request $request, Assessment $assessment)
    {
        try {
            // Check authorization
            $this->authorizeAssessment($assessment);

            // Get language from request
            $language = $request->get('lang', 'en');

            if (!in_array($language, ['en', 'ar'])) {
                $language = 'en';
            }

            // Get assessment results - allow preview even if not completed for testing
            $results = $assessment->getResults();

            // Translate domain names
            $results = $this->translateDomainNames($results, $language, $assessment);

            $user = $assessment->user;

            // Create PDF service with language
            $pdfService = new AssessmentPDFService($language);
            $pdfService->setAssessmentData($assessment, $results, $user);

            // Generate HTML preview
            $htmlContent = $pdfService->generatePreview();

            return response($htmlContent)
                ->header('Content-Type', 'text/html');

        } catch (\Exception $e) {
            Log::error('Failed to generate assessment PDF preview', [
                'assessment_id' => $assessment->id,
                'language' => $language ?? 'unknown',
                'error' => $e->getMessage()
            ]);

            return response()->view('errors.500', [
                'message' => 'Failed to generate preview: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get assessment PDF via API
     * Route: GET /api/assessment/{assessment}/pdf
     */
    public function getAssessmentPDFAPI(Request $request, Assessment $assessment)
    {
        try {
            // Check authorization
            $this->authorizeAssessment($assessment);

            // Validate request
            $validated = $request->validate([
                'format' => 'sometimes|in:download,base64,url',
                'include_metadata' => 'sometimes|boolean',
                'lang' => 'sometimes|in:en,ar'
            ]);

            $format = $validated['format'] ?? 'base64';
            $includeMetadata = $validated['include_metadata'] ?? true;
            $language = $validated['lang'] ?? 'en';

            // Ensure assessment is completed for API requests
            if ($assessment->status !== 'completed') {
                return response()->json([
                    'error' => 'Assessment not completed',
                    'message' => 'PDF can only be generated for completed assessments.'
                ], 400);
            }

            // Get assessment results
            $results = $assessment->getResults();

            // Translate domain names
            $results = $this->translateDomainNames($results, $language, $assessment);

            $user = $assessment->user;

            // Create PDF service with language
            $pdfService = new AssessmentPDFService($language);
            $pdfService->setAssessmentData($assessment, $results, $user);

            // Prepare metadata if requested
            $metadata = [];
            if ($includeMetadata) {
                $metadata = [
                    'assessment' => [
                        'id' => $assessment->id,
                        'name' => $assessment->name,
                        'email' => $assessment->email,
                        'organization' => $assessment->organization,
                        'status' => $assessment->status,
                        'completed_at' => $assessment->completed_at,
                        'language' => $language,
                        'tool' => [
                            'id' => $assessment->tool->id,
                            'name' => $language === 'ar' ? $assessment->tool->name_ar : $assessment->tool->name_en,
                        ]
                    ],
                    'results' => [
                        'overall_percentage' => $results['overall_percentage'],
                        'total_domains' => count($results['domain_results']),
                        'total_criteria' => $results['total_criteria'],
                        'completion_rate' => $results['applicable_criteria'] / $results['total_criteria'] * 100
                    ]
                ];
            }

            switch ($format) {
                case 'download':
                    return $pdfService->generatePDF();

                case 'url':
                    $filename = $this->generateAPIFilename($assessment, $language);
                    $filePath = $pdfService->savePDF($filename);

                    $response = [
                        'url' => Storage::url($filePath),
                        'filename' => $filename,
                        'file_path' => $filePath,
                        'language' => $language
                    ];

                    if ($includeMetadata) {
                        $response['metadata'] = $metadata;
                    }

                    return response()->json($response);

                case 'base64':
                default:
                    // Generate PDF content and encode as base64
                    $pdfContent = $pdfService->generatePDF()->getContent();
                    $base64PDF = base64_encode($pdfContent);

                    $response = [
                        'pdf_base64' => $base64PDF,
                        'mime_type' => 'application/pdf',
                        'filename' => $this->generateAPIFilename($assessment, $language),
                        'language' => $language
                    ];

                    if ($includeMetadata) {
                        $response['metadata'] = $metadata;
                    }

                    return response()->json($response);
            }

        } catch (\Exception $e) {
            Log::error('Failed to generate assessment PDF via API', [
                'assessment_id' => $assessment->id,
                'language' => $language ?? 'unknown',
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => 'PDF generation failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk generate PDFs for multiple assessments
     * Route: POST /assessments/pdf/bulk
     */
    public function bulkGenerateAssessmentPDFs(Request $request)
    {
        try {
            $validated = $request->validate([
                'assessment_ids' => 'required|array|min:1|max:10',
                'assessment_ids.*' => 'integer|exists:assessments,id',
                'format' => 'sometimes|in:save,download_zip',
                'lang' => 'sometimes|in:en,ar'
            ]);

            $format = $validated['format'] ?? 'save';
            $language = $validated['lang'] ?? 'en';
            $results = [];
            $files = [];

            foreach ($validated['assessment_ids'] as $assessmentId) {
                try {
                    $assessment = Assessment::findOrFail($assessmentId);

                    // Check authorization for each assessment
                    $this->authorizeAssessment($assessment);

                    // Skip incomplete assessments
                    if ($assessment->status !== 'completed') {
                        $results[] = [
                            'assessment_id' => $assessmentId,
                            'success' => false,
                            'error' => 'Assessment not completed'
                        ];
                        continue;
                    }

                    // Generate PDF for this assessment
                    $assessmentResults = $assessment->getResults();

                    // Translate domain names
                    $assessmentResults = $this->translateDomainNames($assessmentResults, $language, $assessment);

                    $user = $assessment->user;

                    // Create PDF service with language
                    $service = new AssessmentPDFService($language);
                    $service->setAssessmentData($assessment, $assessmentResults, $user);

                    // Generate filename for this assessment
                    $filename = $this->generateBulkFilename($assessment, $language);

                    if ($format === 'save') {
                        // Save to storage
                        $filePath = $service->savePDF($filename);

                        $results[] = [
                            'assessment_id' => $assessmentId,
                            'assessment_name' => $assessment->name,
                            'tool_name' => $language === 'ar' ? $assessment->tool->name_ar : $assessment->tool->name_en,
                            'language' => $language,
                            'success' => true,
                            'file_path' => $filePath,
                            'download_url' => Storage::url($filePath)
                        ];
                    } else {
                        // Prepare for ZIP download
                        $pdfContent = $service->generatePDF()->getContent();
                        $files[$filename] = $pdfContent;

                        $results[] = [
                            'assessment_id' => $assessmentId,
                            'assessment_name' => $assessment->name,
                            'tool_name' => $language === 'ar' ? $assessment->tool->name_ar : $assessment->tool->name_en,
                            'language' => $language,
                            'success' => true,
                            'filename' => $filename
                        ];
                    }

                } catch (\Exception $e) {
                    Log::error('Failed to generate PDF for assessment in bulk', [
                        'assessment_id' => $assessmentId,
                        'language' => $language,
                        'error' => $e->getMessage()
                    ]);

                    $results[] = [
                        'assessment_id' => $assessmentId,
                        'success' => false,
                        'error' => $e->getMessage()
                    ];
                }
            }

            if ($format === 'download_zip' && !empty($files)) {
                // Create ZIP file and return as download
                return $this->createZipDownload($files, $language);
            }

            return response()->json([
                'message' => 'Bulk PDF generation completed',
                'language' => $language,
                'results' => $results,
                'successful' => count(array_filter($results, fn($r) => $r['success'])),
                'failed' => count(array_filter($results, fn($r) => !$r['success']))
            ]);

        } catch (\Exception $e) {
            Log::error('Failed bulk PDF generation', [
                'language' => $language ?? 'unknown',
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => 'Bulk generation failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get assessment results as JSON for custom PDF generation
     * Route: GET /assessment/{assessment}/results/json
     */
    public function getAssessmentResultsJSON(Request $request, Assessment $assessment)
    {
        try {
            // Check authorization
            $this->authorizeAssessment($assessment);

            // Get language from request
            $language = $request->get('lang', 'en');

            if (!in_array($language, ['en', 'ar'])) {
                $language = 'en';
            }

            // Get assessment results
            $results = $assessment->getResults();

            // Translate domain names
            $results = $this->translateDomainNames($results, $language, $assessment);

            $user = $assessment->user;

            return response()->json([
                'assessment' => [
                    'id' => $assessment->id,
                    'name' => $assessment->name,
                    'email' => $assessment->email,
                    'organization' => $assessment->organization,
                    'status' => $assessment->status,
                    'completed_at' => $assessment->completed_at,
                    'language' => $language,
                    'tool' => [
                        'id' => $assessment->tool->id,
                        'name_en' => $assessment->tool->name_en,
                        'name_ar' => $assessment->tool->name_ar,
                        'name' => $language === 'ar' ? $assessment->tool->name_ar : $assessment->tool->name_en,
                    ],
                    'user' => [
                        'company_name' => $user && $user->details ? $user->details->company_name : $assessment->organization
                    ]
                ],
                'results' => $results
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to get assessment results JSON', [
                'assessment_id' => $assessment->id,
                'language' => $language ?? 'unknown',
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => 'Failed to get results',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Translate domain names based on language
     */
    private function translateDomainNames(array $results, string $language, Assessment $assessment): array
    {
        if (!isset($results['domain_results']) || empty($results['domain_results'])) {
            return $results;
        }

        // Get all domains from the tool with their translations
        $domains = $assessment->tool->domains;
        $domainTranslations = [];

        foreach ($domains as $domain) {
            $domainTranslations[$domain->id] = [
                'en' => $domain->name_en,
                'ar' => $domain->name_ar ?? $domain->name_en // Fallback to English if Arabic not available
            ];
        }

        // Update domain names in results
        foreach ($results['domain_results'] as &$domainResult) {
            if (isset($domainResult['domain_id']) && isset($domainTranslations[$domainResult['domain_id']])) {
                $domainResult['domain_name'] = $domainTranslations[$domainResult['domain_id']][$language];
            }
        }

        // Also update category names if they exist
        if (isset($results['category_results'])) {
            $categories = $assessment->tool->domains->flatMap->categories;
            $categoryTranslations = [];

            foreach ($categories as $category) {
                $categoryTranslations[$category->id] = [
                    'en' => $category->name_en,
                    'ar' => $category->name_ar ?? $category->name_en
                ];
            }

            foreach ($results['category_results'] as $domainId => &$categoryResults) {
                foreach ($categoryResults as &$categoryResult) {
                    if (isset($categoryResult['category_id']) && isset($categoryTranslations[$categoryResult['category_id']])) {
                        $categoryResult['category_name'] = $categoryTranslations[$categoryResult['category_id']][$language];
                    }
                }
            }
        }

        return $results;
    }

    /**
     * Check if user can access the assessment
     */
    private function authorizeAssessment(Assessment $assessment): void
    {
        $user = auth()->user();

        if (!$user) {
            abort(401, 'Authentication required');
        }

        // Check if user owns this assessment or has admin access
        if ($assessment->user_id !== $user->id && !$user->hasRole('admin')) {
            abort(403, 'Unauthorized access to this assessment');
        }
    }

    /**
     * Generate filename for API responses
     */
    private function generateAPIFilename(Assessment $assessment, string $language = 'en'): string
    {
        $toolName = $language === 'ar' ? $assessment->tool->name_ar : $assessment->tool->name_en;
        $toolName = preg_replace('/[^A-Za-z0-9_\u0600-\u06FF-]/', '_', $toolName);
        $assessmentName = preg_replace('/[^A-Za-z0-9_\u0600-\u06FF-]/', '_', $assessment->name);
        $date = now()->format('Y-m-d');

        return "{$toolName}_{$assessmentName}_Results_{$date}_{$language}.pdf";
    }

    /**
     * Generate filename for bulk operations
     */
    private function generateBulkFilename(Assessment $assessment, string $language = 'en'): string
    {
        $toolName = $language === 'ar' ? $assessment->tool->name_ar : $assessment->tool->name_en;
        $toolName = preg_replace('/[^A-Za-z0-9_\u0600-\u06FF-]/', '_', $toolName);
        $assessmentId = $assessment->id;
        $date = now()->format('Y-m-d');

        return "{$toolName}_Assessment_{$assessmentId}_{$date}_{$language}.pdf";
    }

    /**
     * Create ZIP file for bulk download
     */
//    private function createZipDownload(array $files, string $language = 'en'): Response
//    {
//        $zip = new \ZipArchive();
//        $zipFileName = 'assessment_reports_' . $language . '_' . now()->format('Y-m-d_H-i-s') . '.zip';
//        $zipPath = storage_path('app/temp/' . $zipFileName);
//
//        // Ensure temp directory exists
//        if (!is_dir(dirname($zipPath))) {
//            mkdir(dirname($zipPath), 0755, true);
//        }
//
//        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
//            foreach ($files as $filename => $content) {
//                $zip->addFromString($filename, $content);
//            }
//            $zip->close();
//
//            return response()->download($zipPath, $zipFileName)->deleteFileAfterSend(true);
//        }
//
//        throw new \Exception('Failed to create ZIP file');
//    }
}
