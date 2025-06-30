<?php

/**
 * File Location: app/Http/Controllers/PDFController.php
 *
 * This controller handles all PDF generation requests in your Laravel application.
 * It acts as the bridge between your web routes and the PDF generation service.
 */

namespace App\Http\Controllers;

use App\Services\GartnerPDFService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class PDFController extends Controller
{
    private GartnerPDFService $pdfService;

    /**
     * Constructor: Create the PDF service instance
     * Think of this like setting up your workspace before you start cooking
     */
    public function __construct()
    {
        $this->pdfService = new GartnerPDFService();
    }

    /**
     * Generate and download the Gartner PDF replica
     * Route: GET /pdf/gartner/download
     *
     * This method creates the PDF and immediately sends it to the user as a download.
     * Perfect for "Generate Report" buttons in your application.
     */
    public function downloadGartnerPDF(Request $request): Response
    {
        try {
            // You can customize the data based on request parameters
            // For example, if you want different statistics based on user input:
            if ($request->has('custom_data')) {
                $customData = $request->input('custom_data');
                $this->pdfService->setData($customData);
            }

            // Generate the PDF and return it as a download
            $response = $this->pdfService->generatePDF();

            // Add additional headers if needed
            $response->headers->set('Cache-Control', 'no-cache, no-store, must-revalidate');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', '0');

            return $response;

        } catch (\Exception $e) {
            // Handle errors gracefully - show user-friendly message
            return response()->json([
                'error' => 'Failed to generate PDF',
                'message' => 'Please try again or contact support if the problem persists.'
            ], 500);
        }
    }

    /**
     * Save PDF to storage and return the file path
     * Route: POST /pdf/gartner/save
     *
     * This method saves the PDF to your Laravel storage system.
     * Useful when you want to email PDFs later or keep them for records.
     */
    public function saveGartnerPDF(Request $request)
    {
        try {
            // Optional: validate request data
            $validated = $request->validate([
                'filename' => 'sometimes|string|max:255',
                'data' => 'sometimes|array'
            ]);

            // Apply custom data if provided
            if (isset($validated['data'])) {
                $this->pdfService->setData($validated['data']);
            }

            // Generate filename if not provided
            $filename = $validated['filename'] ?? 'gartner_playbook_' . now()->format('Y-m-d_H-i-s') . '.pdf';

            // Save the PDF and get the storage path
            $filePath = $this->pdfService->savePDF($filename);

            // Return success response with file information
            return response()->json([
                'success' => true,
                'message' => 'PDF generated and saved successfully',
                'file_path' => $filePath,
                'download_url' => Storage::url($filePath),
                'filename' => $filename
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to save PDF',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Preview the PDF content in the browser
     * Route: GET /pdf/gartner/preview
     *
     * This shows the HTML version in the browser so you can see exactly
     * how the PDF will look before generating it. Great for testing and debugging.
     */
    public function previewGartnerPDF(Request $request)
    {
        try {
            // Apply any custom data
            if ($request->has('data')) {
                $this->pdfService->setData($request->input('data'));
            }

            // Get the HTML content that would be converted to PDF
            $htmlContent = $this->pdfService->generatePreview();

            // Return the HTML directly to the browser
            return response($htmlContent)
                ->header('Content-Type', 'text/html');

        } catch (\Exception $e) {
            return response()->view('errors.500', [
                'message' => 'Failed to generate preview: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * API endpoint to get PDF as base64 encoded string
     * Route: GET /api/pdf/gartner
     *
     * This is useful when you need to embed the PDF in other applications
     * or send it via API to frontend applications.
     */
    public function getGartnerPDFAPI(Request $request)
    {
        try {
            // Validate API request
            $validated = $request->validate([
                'format' => 'sometimes|in:download,base64,url',
                'data' => 'sometimes|array'
            ]);

            $format = $validated['format'] ?? 'base64';

            // Apply custom data if provided
            if (isset($validated['data'])) {
                $this->pdfService->setData($validated['data']);
            }

            switch ($format) {
                case 'download':
                    return $this->pdfService->generatePDF();

                case 'url':
                    $filename = 'gartner_api_' . now()->timestamp . '.pdf';
                    $filePath = $this->pdfService->savePDF($filename);
                    return response()->json([
                        'url' => Storage::url($filePath),
                        'filename' => $filename
                    ]);

                case 'base64':
                default:
                    // Generate PDF content and encode as base64
                    $pdfContent = $this->pdfService->generatePDF()->getContent();
                    $base64PDF = base64_encode($pdfContent);

                    return response()->json([
                        'pdf_base64' => $base64PDF,
                        'mime_type' => 'application/pdf',
                        'filename' => 'gartner_cmo_playbook.pdf'
                    ]);
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'PDF generation failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk generate PDFs with different data sets
     * Route: POST /pdf/gartner/bulk
     *
     * This allows you to generate multiple PDFs at once with different data.
     * Useful for creating personalized reports for different departments or clients.
     */
    public function bulkGenerateGartnerPDFs(Request $request)
    {
        try {
            $validated = $request->validate([
                'datasets' => 'required|array|min:1|max:10', // Limit to prevent server overload
                'datasets.*.name' => 'required|string',
                'datasets.*.data' => 'required|array'
            ]);

            $results = [];

            foreach ($validated['datasets'] as $dataset) {
                try {
                    // Create a new service instance for each dataset
                    $service = new GartnerPDFService();
                    $service->setData($dataset['data']);

                    // Generate filename based on dataset name
                    $filename = 'gartner_' . \Str::slug($dataset['name']) . '_' . now()->timestamp . '.pdf';

                    // Save the PDF
                    $filePath = $service->savePDF($filename);

                    $results[] = [
                        'name' => $dataset['name'],
                        'success' => true,
                        'file_path' => $filePath,
                        'download_url' => Storage::url($filePath)
                    ];

                } catch (\Exception $e) {
                    $results[] = [
                        'name' => $dataset['name'],
                        'success' => false,
                        'error' => $e->getMessage()
                    ];
                }
            }

            return response()->json([
                'message' => 'Bulk PDF generation completed',
                'results' => $results,
                'successful' => count(array_filter($results, fn($r) => $r['success'])),
                'failed' => count(array_filter($results, fn($r) => !$r['success']))
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Bulk generation failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Debug preview with visible page boundaries
     * Route: GET /pdf/gartner/debug
     *
     * This shows the HTML with visual indicators for page boundaries,
     * helping you verify that content fits properly before generating PDF.
     */
    public function debugGartnerPDF(Request $request)
    {
        try {
            // Apply any custom data
            if ($request->has('data')) {
                $this->pdfService->setData($request->input('data'));
            }

            // Get the debug HTML with visual page boundaries
            $htmlContent = $this->pdfService->generateDebugPreview();

            // Return the HTML directly to the browser
            return response($htmlContent)
                ->header('Content-Type', 'text/html');

        } catch (\Exception $e) {
            return response()->view('errors.500', [
                'message' => 'Failed to generate debug preview: ' . $e->getMessage()
            ], 500);
        }
    }
}
