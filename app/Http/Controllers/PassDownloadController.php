<?php

namespace App\Http\Controllers;

use App\Models\Pass;
use App\Services\ApplePassService;
use App\Services\GooglePassService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PassDownloadController extends Controller
{
    /**
     * Download Apple Wallet pass (.pkpass file).
     */
    public function downloadApple(Request $request, Pass $pass, ApplePassService $applePassService)
    {
        $this->authorize('view', $pass);

        if ($pass->platform !== 'apple') {
            return back()->withErrors(['error' => 'This pass is not an Apple Wallet pass.']);
        }

        try {
            // Generate or regenerate the pass
            $pkpassPath = $applePassService->generate($pass);

            $disk = Storage::disk(config('passkit.storage.passes_disk'));

            if (!$disk->exists($pkpassPath)) {
                return back()->withErrors(['error' => 'Pass file not found.']);
            }

            return $disk->download($pkpassPath, "pass_{$pass->serial_number}.pkpass", [
                'Content-Type' => 'application/vnd.apple.pkpass',
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to generate pass: ' . $e->getMessage()]);
        }
    }

    /**
     * Generate Google Wallet save link.
     */
    public function generateGoogleLink(Request $request, Pass $pass, GooglePassService $googlePassService)
    {
        $this->authorize('view', $pass);

        if ($pass->platform !== 'google') {
            return back()->withErrors(['error' => 'This pass is not a Google Wallet pass.']);
        }

        try {
            $saveUrl = $googlePassService->generate($pass);

            return back()->with('googleSaveUrl', $saveUrl);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to generate Google Wallet link: ' . $e->getMessage()]);
        }
    }
}
