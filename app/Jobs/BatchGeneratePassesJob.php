<?php

namespace App\Jobs;

use App\Models\PassTemplate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Str;

class BatchGeneratePassesJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public PassTemplate $template,
        public array $passDataList
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->passDataList as $passData) {
            $pass = $this->template->user->passes()->create([
                'pass_template_id' => $this->template->id,
                'platform' => $this->template->platform,
                'pass_type' => $this->template->pass_type,
                'serial_number' => Str::uuid()->toString(),
                'status' => 'active',
                'pass_data' => array_merge($this->template->design_data, $passData['pass_data'] ?? []),
                'barcode_data' => $passData['barcode_data'] ?? null,
                'images' => $this->template->images,
            ]);

            // Dispatch individual generation job
            GeneratePassJob::dispatch($pass);
        }
    }
}
