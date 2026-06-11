<?php

require getenv('LARAVEL_INSTALLER_AUTOLOADER') ?: __DIR__.'/vendor/autoload.php';

use Laravel\Chisel\Chisel;
use Laravel\Chisel\Question;
use Laravel\Prompts\Support\Logger;
use Symfony\Component\Process\Process;

use function Laravel\Prompts\task;

function chiselRun(array $command, string $label): void
{
    $process = task(
        label: $label,
        keepSummary: true,
        callback: function (Logger $logger) use ($command) {
            $process = new Process($command);
            $process->run(function ($type, $line) use ($logger) {
                $logger->line($line);
            });

            if ($process->isSuccessful()) {
                $logger->success(implode(' ', $command));

                return $process;
            }

            $logger->error(implode(' ', $command));
            $logger->error('Error output: '.trim($process->getErrorOutput()));
            $logger->error('Chisel: Your project may be in a partially-modified state — review the output above before continuing.');

            return $process;
        },
    );

    if (! $process->isSuccessful()) {
        exit($process->getExitCode());
    }
}

/**
 * Framework-specific filenames are supplied by the sibling chisel-paths.php
 * that ships with each Inertia kit (React/Svelte/Vue). After build both files
 * land in the project root.
 *
 * @var array{
 *     login: string,
 *     register: string,
 *     welcome: string,
 *     profile: string,
 *     security: string,
 *     verify_email: string,
 *     two_factor_challenge: string,
 *     confirm_password: string,
 *     auth_types: string,
 *     two_factor_files: list<string>,
 *     two_factor_otp_package: ?string,
 *     passkey_files: list<string>,
 *  } $paths
 */
$paths = require __DIR__.'/chisel-paths.php';

return Chisel::script(__DIR__)
    ->questions([
        Question::multiselect(
            name: 'auth_features',
            label: 'Which authentication features would you like to enable?',
            options: [
                'email-verification' => 'Email verification',
                'registration' => 'Registration',
                '2fa' => 'Two-factor authentication',
                'passkeys' => 'Passkeys',
                'password-confirmation' => 'Password confirmation',
            ],
            default: ['email-verification', 'registration', '2fa', 'passkeys', 'password-confirmation'],
            hint: 'Use space to select, enter to confirm.',
        ),
    ])
    ->selected(
        'auth_features',
        'registration',
        then: function (Chisel $c) use ($paths) {
            $c->files(
                'config/fortify.php',
                'app/Providers/FortifyServiceProvider.php',
                $paths['login'],
                $paths['welcome'],
            )->removeSectionMarkers('registration');
        },
        else: function (Chisel $c) use ($paths) {
            $c->file('config/fortify.php')->removeSection('registration');

            $c->files(
                'app/Providers/FortifyServiceProvider.php',
                $paths['login'],
                $paths['welcome'],
            )->removeSection('registration');

            $c->files(
                'app/Actions/Fortify/CreateNewUser.php',
                'app/Http/Responses/RegisterResponse.php',
                $paths['register'],
                'tests/Feature/Auth/RegistrationTest.php',
            )->delete();
        },
    )
    ->selected(
        'auth_features',
        'email-verification',
        then: function (Chisel $c) use ($paths) {
            $c->files(
                'config/fortify.php',
                $paths['profile'],
                'app/Providers/FortifyServiceProvider.php',
            )->removeSectionMarkers('email-verification');
        },
        else: function (Chisel $c) use ($paths) {
            $c->php('app/Models/User.php')
                ->removeImport('Illuminate\Contracts\Auth\MustVerifyEmail')
                ->removeInterface('MustVerifyEmail');

            $c->files(
                'config/fortify.php',
                'app/Providers/FortifyServiceProvider.php',
                $paths['profile'],
            )->removeSection('email-verification');

            $c->files(
                'app/Http/Responses/VerifyEmailResponse.php',
                $paths['verify_email'],
                'tests/Feature/Auth/EmailVerificationTest.php',
                'tests/Feature/Auth/VerificationNotificationTest.php',
            )->delete();
        },
    )
    ->selected(
        'auth_features',
        '2fa',
        then: function (Chisel $c) use ($paths) {
            $c->files(
                'app/Models/User.php',
                'database/factories/UserFactory.php',
                $paths['security'],
                $paths['auth_types'],
                'config/fortify.php',
                'app/Providers/FortifyServiceProvider.php',
                'app/Http/Controllers/Settings/SecurityController.php',
            )->removeSectionMarkers('2fa');
        },
        else: function (Chisel $c) use ($paths) {
            $c->php('app/Models/User.php')
                ->removeImport('Laravel\Fortify\TwoFactorAuthenticatable')
                ->removeTrait('TwoFactorAuthenticatable');

            $c->files(
                'app/Models/User.php',
                'database/factories/UserFactory.php',
                'config/fortify.php',
                'app/Providers/FortifyServiceProvider.php',
                'app/Http/Controllers/Settings/SecurityController.php',
                $paths['security'],
                $paths['auth_types'],
            )->removeSection('2fa');

            if ($paths['two_factor_otp_package'] !== null) {
                $c->npm()->remove($paths['two_factor_otp_package']);
            }

            $c->files(...[
                $paths['two_factor_challenge'],
                ...$paths['two_factor_files'],
                'database/migrations/2025_08_14_170933_add_two_factor_columns_to_users_table.php',
                'tests/Feature/Auth/TwoFactorChallengeTest.php',
            ])->delete();
        },
    )
    ->selected(
        'auth_features',
        'passkeys',
        then: function (Chisel $c) use ($paths) {
            $c->files(
                'config/fortify.php',
                'app/Providers/FortifyServiceProvider.php',
                'app/Http/Controllers/Settings/SecurityController.php',
                'routes/settings.php',
                'tests/Feature/Auth/AuthenticationTest.php',
                'tests/Feature/Settings/SecurityTest.php',
                $paths['security'],
                $paths['login'],
                $paths['confirm_password'],
            )->removeSectionMarkers('passkeys');
        },
        else: function (Chisel $c) use ($paths) {
            $c->php('app/Models/User.php')
                ->removeImport('Laravel\Fortify\PasskeyAuthenticatable')
                ->removeImport('Laravel\Fortify\Contracts\PasskeyUser')
                ->removeTrait('PasskeyAuthenticatable')
                ->removeInterface('PasskeyUser');

            $c->files(
                'config/fortify.php',
                'app/Providers/FortifyServiceProvider.php',
                'app/Http/Controllers/Settings/SecurityController.php',
                'routes/settings.php',
                'tests/Feature/Auth/AuthenticationTest.php',
                'tests/Feature/Settings/SecurityTest.php',
                $paths['security'],
                $paths['login'],
                $paths['confirm_password'],
            )->removeSection('passkeys');

            $c->npm()->remove('@laravel/passkeys');

            $c->files(...[
                ...$paths['passkey_files'],
                'app/Http/Responses/PasskeyLoginResponse.php',
                'database/migrations/2024_01_01_000000_create_passkeys_table.php',
            ])->delete();
        },
    )
    ->selectedAny(
        'auth_features',
        ['2fa', 'passkeys'],
        then: function (Chisel $c) use ($paths) {
            $c->file($paths['security'])
                ->removeSectionMarkers('2fa-or-passkeys');
        },
        else: function (Chisel $c) use ($paths) {
            $c->file($paths['security'])
                ->removeSection('2fa-or-passkeys');
        },
    )
    ->selected(
        'auth_features',
        'password-confirmation',
        then: function (Chisel $c) {
            $c->files(
                'app/Providers/FortifyServiceProvider.php',
                'routes/settings.php',
                'tests/Feature/Settings/SecurityTest.php',
            )->removeSectionMarkers('password-confirmation');
        },
        else: function (Chisel $c) use ($paths) {
            $c->file('config/fortify.php')
                ->replace("'confirmPassword' => true,", "'confirmPassword' => false,");

            $c->files(
                'app/Providers/FortifyServiceProvider.php',
                'routes/settings.php',
                'tests/Feature/Settings/SecurityTest.php',
            )->removeSection('password-confirmation');

            $c->files(
                $paths['confirm_password'],
                'tests/Feature/Auth/PasswordConfirmationTest.php',
            )->delete();
        },
    )
    ->apply(function (Chisel $c): void {
        $c->file('eslint.config.js')->replace(
            "// alphabetize: { order: 'asc', caseInsensitive: true },",
            "alphabetize: { order: 'asc', caseInsensitive: true },",
        );

        chiselRun(['composer', 'lint'], 'Composer Lint');
        chiselRun(['php', 'artisan', 'wayfinder:generate', '--with-form', '--no-interaction'], 'Generate Wayfinder Resources');

        $c->npm()->run('lint');
        $c->npm()->run('format');

        $c->file('composer.json')
            ->removeLinesContaining('"@php artisan install:features --ansi"');

        $c->files(
            'app/Console/Commands/InstallFeaturesCommand.php',
            'chisel.php',
            'chisel-paths.php',
        )->delete();
    });
