<?php

namespace App\Jobs;

use App\Services\PassImageService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessPassImageJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $originalPath,
        public string $slot,
        public string $platform,
        public int $userId,
        public ?string $resizeMode = null,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(PassImageService $passImageService): void
    {
        $passImageService->processFromPath(
            $this->originalPath,
            $this->slot,
            $this->platform,
            $this->resizeMode,
            $this->userId,
        );
    }
}
