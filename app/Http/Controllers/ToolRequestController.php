<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreToolRequestRequest;
use App\Models\Tool;
use App\Models\ToolRequest;
use App\Models\User;
use Filament\Notifications\Notification;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ToolRequestController extends Controller
{
    public function create(Tool $tool): Response
    {
        return Inertia::render('ToolRequestForm', [
            'tool' => [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image,
            ],
            'user' => auth()->user() ? [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'organization' => auth()->user()->getCompanyName(),
            ] : null,
        ]);
    }

    public function store(StoreToolRequestRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $toolRequest = ToolRequest::create($data);

        $admins = User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['admin', 'super_admin']);
        })->get();

        Notification::make()
            ->title('New Tool Request')
            ->body($toolRequest->name.' requested access to '.$toolRequest->tool->name_en)
            ->sendToDatabase($admins);

        return redirect()->back()->with('success', 'Request submitted successfully');
    }
}
