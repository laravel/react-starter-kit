<?php

namespace App\Jobs;

use App\Models\Pass;
use App\Services\ApplePassService;
use App\Services\GooglePassService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class GeneratePassJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Pass $pass
    ) {}

    /**
     * Execute the job.
     */
    public function handle(ApplePassService $applePassService, GooglePassService $googlePassService): void
    {
        if ($this->pass->platform === 'apple') {
            $applePassService->generate($this->pass);
        } elseif ($this->pass->platform === 'google') {
            $googlePassService->generate($this->pass);
        }
    }
}
