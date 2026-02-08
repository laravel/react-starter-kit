<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pass;
use App\Models\PassTemplate;
use App\Services\PassLimitService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PassApiController extends Controller
{
    public function __construct(
        private PassLimitService $passLimitService
    ) {}

    /**
     * List user's passes.
     */
    public function index(Request $request): JsonResponse
    {
        $passes = $request->user()->passes()
            ->with('template')
            ->latest()
            ->paginate(50);

        return response()->json($passes);
    }

    /**
     * Create a new pass from template with custom data.
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        // Check if user can create more passes
        if (!$this->passLimitService->canCreatePass($user)) {
            return response()->json([
                'error' => 'Pass limit reached',
                'message' => 'You have reached your pass creation limit. Please upgrade your plan.',
                'current_plan' => $this->passLimitService->getCurrentPlan($user),
                'pass_count' => $user->passes()->count(),
                'pass_limit' => config('passkit.plans.' . $this->passLimitService->getCurrentPlan($user) . '.pass_limit'),
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'template_id' => ['required', 'exists:pass_templates,id'],
            'member_id' => ['nullable', 'string', 'max:255'],
            'platform' => ['required', Rule::in(['apple', 'google'])],
            'custom_fields' => ['nullable', 'array'],
            'custom_fields.*' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        // Get template and verify ownership
        $template = PassTemplate::findOrFail($validated['template_id']);
        
        if ($template->user_id !== $user->id) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You do not own this template.',
            ], 403);
        }

        // Merge template data with custom fields
        $passData = $template->template_data;
        
        // Replace placeholders in template with custom fields
        if (isset($validated['custom_fields'])) {
            $passData = $this->replacePlaceholders($passData, $validated['custom_fields']);
        }

        // Create the pass
        $pass = $user->passes()->create([
            'pass_template_id' => $template->id,
            'platform' => $validated['platform'],
            'pass_type' => $template->pass_type,
            'serial_number' => \Illuminate\Support\Str::uuid()->toString(),
            'status' => 'active',
            'pass_data' => $passData,
            'barcode_data' => $template->default_barcode_data ?? [
                'format' => 'PKBarcodeFormatQR',
                'message' => $validated['member_id'] ?? null,
                'altText' => null,
            ],
            'images' => $template->default_images ?? [],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pass created successfully',
            'pass' => $pass->load('template'),
            'download_urls' => [
                'apple' => $validated['platform'] === 'apple' ? route('passes.download.apple', $pass) : null,
                'google' => $validated['platform'] === 'google' ? route('passes.download.google', $pass) : null,
            ],
        ], 201);
    }

    /**
     * Get pass details.
     */
    public function show(Request $request, Pass $pass): JsonResponse
    {
        if ($pass->user_id !== $request->user()->id) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You do not own this pass.',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'pass' => $pass->load('template'),
            'download_urls' => [
                'apple' => $pass->platform === 'apple' ? route('passes.download.apple', $pass) : null,
                'google' => $pass->platform === 'google' ? route('passes.download.google', $pass) : null,
            ],
        ]);
    }

    /**
     * Replace placeholders in template data with custom field values.
     */
    private function replacePlaceholders(array $data, array $customFields): array
    {
        $json = json_encode($data);
        
        foreach ($customFields as $key => $value) {
            $json = str_replace("{{" . $key . "}}", $value, $json);
        }
        
        return json_decode($json, true);
    }
}
