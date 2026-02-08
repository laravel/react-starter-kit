<?php

namespace App\Http\Controllers;

use App\Http\Requests\PassTemplate\StorePassTemplateRequest;
use App\Http\Requests\PassTemplate\UpdatePassTemplateRequest;
use App\Models\PassTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PassTemplateController extends Controller
{
    /**
     * Display a listing of the user's pass templates.
     */
    public function index(Request $request): Response
    {
        $templates = $request->user()
            ->passTemplates()
            ->withCount('passes')
            ->latest()
            ->paginate(15);

        return Inertia::render('templates/index', [
            'templates' => $templates,
        ]);
    }

    /**
     * Show the form for creating a new pass template.
     */
    public function create(): Response
    {
        return Inertia::render('templates/create');
    }

    /**
     * Store a newly created pass template.
     */
    public function store(StorePassTemplateRequest $request)
    {
        $template = $request->user()->passTemplates()->create($request->validated());

        return to_route('templates.show', $template)->with('success', 'Template created successfully.');
    }

    /**
     * Display the specified pass template.
     */
    public function show(Request $request, PassTemplate $template): Response
    {
        $this->authorize('view', $template);

        $template->loadCount('passes');

        return Inertia::render('templates/show', [
            'template' => $template,
        ]);
    }

    /**
     * Show the form for editing the specified pass template.
     */
    public function edit(Request $request, PassTemplate $template): Response
    {
        $this->authorize('update', $template);

        return Inertia::render('templates/edit', [
            'template' => $template,
        ]);
    }

    /**
     * Update the specified pass template.
     */
    public function update(UpdatePassTemplateRequest $request, PassTemplate $template)
    {
        $this->authorize('update', $template);

        $template->update($request->validated());

        return to_route('templates.show', $template)->with('success', 'Template updated successfully.');
    }

    /**
     * Remove the specified pass template.
     */
    public function destroy(Request $request, PassTemplate $template)
    {
        $this->authorize('delete', $template);

        $template->delete();

        return to_route('templates.index')->with('success', 'Template deleted successfully.');
    }
}
