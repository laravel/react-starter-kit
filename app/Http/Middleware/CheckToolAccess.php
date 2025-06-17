<?php

namespace App\Http\Middleware;

use App\Models\Tool;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckToolAccess
{
    /**
     * Handle an incoming request to check tool-specific access
     */
    public function handle(Request $request, Closure $next, int $toolId = null)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Get tool ID from route parameter if not provided
        if (!$toolId) {
            $toolId = $request->route('tool')?->id ?? $request->route('tool');
        }

        if (!$toolId) {
            return redirect()->route('tools.discover')
                ->with('error', 'Tool not specified.');
        }

        // Check if user has access to this specific tool
        if (!$user->hasAccessToTool($toolId)) {
            $tool = Tool::find($toolId);
            $toolName = $tool ? $tool->name_en : 'this tool';

            return redirect()->route('tools.subscribe', $toolId)
                ->with('info', "Subscribe to {$toolName} to get started with assessments!");
        }

        return $next($request);
    }
}
