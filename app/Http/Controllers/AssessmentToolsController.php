<?php
// app/Http/Controllers/AssessmentToolsController.php
namespace App\Http\Controllers;

use App\Models\Tool;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentToolsController extends Controller
{
    /**
     * Display the assessment tools page
     */
    public function index(Request $request): Response
    {
        $locale = app()->getLocale();

        $tools = Tool::where('status', 'active')
            ->orderBy('name_en')
            ->get()

            ->map(function ($tool) {
                return [
                    'id' => $tool->id,
                    'name_en' => $tool->name_en,
                    'name_ar' => $tool->name_ar,
                    'description_en' => $tool->description_en,
                    'description_ar' => $tool->description_ar,
                    'image' => $tool->image ? asset('storage/' . $tool->image) : null,
                    'status' => $tool->status,
                ];
            });


        return Inertia::render('assessment-tools', [
            'tools' => $tools,
            'locale' => $locale,
        ]);
    }

    /**
     * Start an assessment with a specific tool
     */
    public function start(Request $request, Tool $tool): Response
    {
        // Ensure the tool is active
        if ($tool->status !== 'active') {
            abort(404, 'Assessment tool not found or inactive.');
        }

        $locale = app()->getLocale();

        // Get domains for this tool with their categories and criteria
        $domains = $tool->domains()
            ->where('status', 'active')
            ->with([
                'categories' => function ($query) {
                    $query->where('status', 'active')
                        ->orderBy('order')
                        ->with([
                            'criteria' => function ($query) {
                                $query->where('status', 'active')
                                    ->orderBy('order');
                            }
                        ]);
                }
            ])
            ->orderBy('order')
            ->get();

        // Transform the data for the frontend
        $assessmentData = [
            'tool' => [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image ? asset('storage/' . $tool->image) : null,
            ],
            'domains' => $domains->map(function ($domain) {
                return [
                    'id' => $domain->id,
                    'name_en' => $domain->name_en,
                    'name_ar' => $domain->name_ar,
                    'description_en' => $domain->description_en,
                    'description_ar' => $domain->description_ar,
                    'order' => $domain->order,
                    'categories' => $domain->categories->map(function ($category) {
                        return [
                            'id' => $category->id,
                            'name_en' => $category->name_en,
                            'name_ar' => $category->name_ar,
                            'description_en' => $category->description_en,
                            'description_ar' => $category->description_ar,
                            'order' => $category->order,
                            'criteria' => $category->criteria->map(function ($criterion) {
                                return [
                                    'id' => $criterion->id,
                                    'name_en' => $criterion->name_en,
                                    'name_ar' => $criterion->name_ar,
                                    'description_en' => $criterion->description_en,
                                    'description_ar' => $criterion->description_ar,
                                    'order' => $criterion->order,
                                ];
                            }),
                        ];
                    }),
                ];
            }),
        ];

        return Inertia::render('assessment/start', [
            'assessmentData' => $assessmentData,
            'locale' => $locale,
        ]);
    }
}
