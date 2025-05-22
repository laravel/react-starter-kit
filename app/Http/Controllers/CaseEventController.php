<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCaseEventRequest;
use App\Models\CaseEvent;
use App\Models\LegalCase;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class CaseEventController extends Controller
{
    /**
     * Mostrar todos los eventos de un expediente.
     */
    public function index(LegalCase $legalCase): Response
    {
        $events = $legalCase->events()->with('user')->orderByDesc('date')->get();
        return Inertia::render('LegalCases/Events', [
            'legalCase' => $legalCase,
            'events' => $events,
        ]);
    }

    /**
     * Registrar un nuevo evento.
     */
    public function store(StoreCaseEventRequest $request, LegalCase $legalCase): RedirectResponse
    {
        $legalCase->events()->create([
            'user_id' => auth()->id(),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'date' => $request->input('date'),
        ]);
        return redirect()->route('legal-cases.show', $legalCase->id)->with('success', 'Evento registrado correctamente.');
    }

    /**
     * Actualizar un evento existente.
     */
    public function update(StoreCaseEventRequest $request, LegalCase $legalCase, CaseEvent $event): RedirectResponse
    {
        $event->update($request->validated());
        return redirect()->route('legal-cases.show', $legalCase->id)->with('success', 'Evento actualizado correctamente.');
    }

    /**
     * Eliminar un evento.
     */
    public function destroy(LegalCase $legalCase, CaseEvent $event): RedirectResponse
    {
        $event->delete();
        return redirect()->route('legal-cases.show', $legalCase->id)->with('success', 'Evento eliminado correctamente.');
    }
}
