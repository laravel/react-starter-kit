<?php

namespace App\Http\Controllers;

use App\Models\LegalCase;
use App\Models\CaseImportantDate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CaseImportantDateController extends Controller
{
    public function index(LegalCase $legalCase)
    {
        $importantDates = $legalCase->importantDates()
            ->with('creator')
            ->orderBy('end_date')
            ->get();

        $nextImportantDate = $legalCase->importantDates()
            ->where('is_expired', false)
            ->whereDate('end_date', '>=', now()->toDateString())
            ->orderBy('end_date')
            ->first();

        return Inertia::render('LegalCases/ImportantDates', [
            'legalCase' => $legalCase,
            'importantDates' => $importantDates->map(function ($date) {
                return [
                    'id' => $date->id,
                    'title' => $date->title,
                    'description' => $date->description,
                    'start_date' => $date->start_date?->toDateString(),
                    'end_date' => $date->end_date?->toDateString(),
                    'is_expired' => (bool) $date->is_expired,
                    'created_by' => $date->creator ? [
                        'id' => $date->creator->id,
                        'name' => $date->creator->name,
                    ] : null,
                ];
            }),
            'nextImportantDate' => $nextImportantDate,
        ]);
    }

    public function store(Request $request, LegalCase $legalCase)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $importantDate = $legalCase->importantDates()->create([
            ...$validated,
            'created_by' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Fecha importante creada exitosamente');
    }

    public function update(Request $request, LegalCase $legalCase, CaseImportantDate $importantDate)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_expired' => 'required|boolean',
        ]);

        $importantDate->update($validated);

        return redirect()->back()->with('success', 'Fecha importante actualizada exitosamente');
    }

    public function destroy(LegalCase $legalCase, CaseImportantDate $importantDate)
    {
        $importantDate->delete();

        return redirect()->back()->with('success', 'Fecha importante eliminada exitosamente');
    }

    public function setExpired(Request $request, LegalCase $legalCase, CaseImportantDate $importantDate)
    {
        $request->validate([
            'is_expired' => 'required|boolean',
        ]);
        $importantDate->is_expired = $request->input('is_expired');
        $importantDate->save();
        return redirect()->back()->with('success', 'Estado de vencimiento actualizado');
    }
} 