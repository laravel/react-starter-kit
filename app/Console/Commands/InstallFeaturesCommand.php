<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Chisel\Chisel;
use Laravel\Chisel\Question;
use Laravel\Chisel\Script;
use RuntimeException;

use function Laravel\Prompts\multiselect;
use function Laravel\Prompts\spin;

class InstallFeaturesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install:features
        {--answers= : JSON string of answers to skip interactive prompts}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Choose which starter kit features to keep';

    public function handle(): int
    {
        if ($this->shouldDeferInstallerHooks()) {
            return self::SUCCESS;
        }

        if (! file_exists(base_path('chisel.php'))) {
            return self::SUCCESS;
        }

        /** @var Script $script */
        $script = require base_path('chisel.php');

        $providedAnswers = $this->option('answers') === null
            ? []
            : json_decode((string) $this->option('answers'), true, 512, JSON_THROW_ON_ERROR);

        $answers = $script
            ->collectAnswers()
            ->onQuestion(fn (Question $question) => match ($question->type) {
                'multiselect' => multiselect(
                    label: $question->label,
                    options: $question->options,
                    default: $question->default ?? [],
                    required: $question->required,
                    hint: $question->hint,
                ),
                default => throw new RuntimeException("Unsupported question type [{$question->type}]."),
            })
            ->interactive($this->input->isInteractive())
            ->withAnswers($providedAnswers);

        $this->installNodeDependencies();

        $script->chisel($answers);

        $this->buildAssets();

        return self::SUCCESS;
    }

    protected function shouldDeferInstallerHooks(): bool
    {
        if ($this->option('answers') !== null) {
            return false;
        }

        return filter_var(
            $_ENV['LARAVEL_INSTALLER_DEFER_HOOKS']
                ?? $_SERVER['LARAVEL_INSTALLER_DEFER_HOOKS']
                ?? getenv('LARAVEL_INSTALLER_DEFER_HOOKS'),
            FILTER_VALIDATE_BOOL,
        );
    }

    protected function installNodeDependencies(): void
    {
        $npm = Chisel::in(base_path())->npm();
        $packageManager = $npm->packageManager();

        spin(
            fn () => $npm->install(),
            "Installing dependencies with {$packageManager->value}...",
        );
    }

    protected function buildAssets(): void
    {
        $npm = Chisel::in(base_path())->npm();

        spin(
            fn () => $npm->run('build'),
            'Building assets...',
        );
    }
}
