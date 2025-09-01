<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;
use Tests\TestCase;

class TwoFactorAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_two_factor_settings_page_is_displayed()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->withSession(['auth.password_confirmed_at' => time()])
            ->get(route('two-factor.show'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/two-factor')
                ->where('twoFactorEnabled', false)
            );
    }

    public function test_two_factor_settings_page_requires_password_confirmation()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        $user = User::factory()->create();

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);

        $response = $this->actingAs($user)
            ->get(route('two-factor.show'));

        $response->assertRedirect(route('password.confirm'));
    }

    public function test_two_factor_settings_page_does_not_requires_password_confirmation_if_that_feature_is_disabled()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        $user = User::factory()->create();

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => false,
        ]);

        $this->actingAs($user)
            ->get(route('two-factor.show'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/two-factor')
            );
    }

    public function test_two_factor_settings_page_returns_forbidden_when_two_factor_is_disabled()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        config(['fortify.features' => []]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->withSession(['auth.password_confirmed_at' => time()])
            ->get(route('two-factor.show'))
            ->assertForbidden();
    }

    public function test_controller_sets_confirming_data_when_enabling_two_factor_with_confirmation()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => false,
        ]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->withSession(['auth.password_confirmed_at' => time()])
            ->withSession(['two_factor_empty_at' => time() - 10])
            ->post(route('two-factor.enable'));

        $this->get(route('two-factor.show'))
            ->assertOk();

        $this->assertNotNull(session('two_factor_confirming_at'));
    }

    public function test_user_can_view_setting_page_when_confirm_disabled()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => false,
            'confirmPassword' => false,
        ]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('two-factor.show'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/two-factor')
                ->where('requiresConfirmation', false)
            );
    }

    public function test_controller_sets_empty_session_data_when_transitioning_to_disabled_state()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => false,
        ]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('two-factor.show'))
            ->assertSessionHas('two_factor_empty_at');
    }

    public function test_controller_removes_confirming_session_data_when_cleanup_triggered()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => false,
        ]);

        $user = User::factory()->create();

        $user->forceFill([
            'two_factor_secret' => encrypt('test-secret'),
            'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        ])->save();

        $this->actingAs($user)
            ->withSession(['two_factor_confirming_at' => time() - 100])
            ->get(route('two-factor.show'))
            ->assertSessionMissing('two_factor_confirming_at')
            ->assertSessionHas('two_factor_empty_at');
    }

    public function test_two_factor_authentication_disabled_when_confirmation_abandoned_between_requests()
    {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => false,
        ]);

        $user = User::factory()->create();

        $user->forceFill([
            'two_factor_secret' => encrypt('test-secret'),
            'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
            'two_factor_confirmed_at' => null,
        ])->save();

        $this->actingAs($user)
            ->withSession(['two_factor_confirming_at' => time() - 100])
            ->get(route('two-factor.show'));

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
        ]);
    }
}
