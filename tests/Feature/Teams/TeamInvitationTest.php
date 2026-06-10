<?php

namespace Tests\Feature\Teams;

use App\Enums\TeamRole;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\User;
use App\Notifications\Teams\TeamInvitation as TeamInvitationNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class TeamInvitationTest extends TestCase
{
    use RefreshDatabase;

    public function test_team_invitations_can_be_created()
    {
        Notification::fake();

        $owner = User::factory()->create();
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $response = $this
            ->actingAs($owner)
            ->post(route('teams.invitations.store', $team), [
                'email' => 'invited@example.com',
                'role' => TeamRole::Member->value,
            ]);

        $response->assertRedirect(route('teams.edit', $team));

        $this->assertDatabaseHas('team_invitations', [
            'team_id' => $team->id,
            'email' => 'invited@example.com',
            'role' => TeamRole::Member->value,
        ]);
    }

    public function test_invitation_email_for_existing_users_uses_login_route()
    {
        $owner = User::factory()->create();
        $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->create([
            'team_id' => $team->id,
            'email' => $invitedUser->email,
            'invited_by' => $owner->id,
        ]);

        $mail = (new TeamInvitationNotification($invitation))->toMail($invitedUser);

        $this->assertSame(route('login', ['invitation' => $invitation->code]), $mail->actionUrl);
        $this->assertStringContainsString('dashboard', implode(' ', $mail->introLines));
    }

    public function test_invitation_email_for_unknown_users_uses_login_route()
    {
        $owner = User::factory()->create();
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->create([
            'team_id' => $team->id,
            'email' => 'unknown@example.com',
            'invited_by' => $owner->id,
        ]);

        $mail = (new TeamInvitationNotification($invitation))->toMail((object) []);

        $this->assertSame(route('login', ['invitation' => $invitation->code]), $mail->actionUrl);
        $this->assertStringContainsString('log in', strtolower(implode(' ', $mail->introLines)));
    }

    public function test_team_invitations_can_be_created_by_admins()
    {
        Notification::fake();

        $owner = User::factory()->create();
        $admin = User::factory()->create();
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);
        $team->members()->attach($admin, ['role' => TeamRole::Admin->value]);

        $response = $this
            ->actingAs($admin)
            ->post(route('teams.invitations.store', $team), [
                'email' => 'invited@example.com',
                'role' => TeamRole::Member->value,
            ]);

        $response->assertRedirect(route('teams.edit', $team));
    }

    public function test_existing_team_members_cannot_be_invited()
    {
        Notification::fake();

        $owner = User::factory()->create();
        $member = User::factory()->create(['email' => 'member@example.com']);
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);
        $team->members()->attach($member, ['role' => TeamRole::Member->value]);

        $response = $this
            ->actingAs($owner)
            ->post(route('teams.invitations.store', $team), [
                'email' => 'member@example.com',
                'role' => TeamRole::Member->value,
            ]);

        $response->assertSessionHasErrors('email');
    }

    public function test_duplicate_invitations_cannot_be_created()
    {
        Notification::fake();

        $owner = User::factory()->create();
        $team = Team::factory()->create();
        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        TeamInvitation::factory()->create([
            'team_id' => $team->id,
            'email' => 'invited@example.com',
            'invited_by' => $owner->id,
        ]);

        $response = $this
            ->actingAs($owner)
            ->post(route('teams.invitations.store', $team), [
                'email' => 'invited@example.com',
                'role' => TeamRole::Member->value,
            ]);

        $response->assertSessionHasErrors('email');
    }

    public function test_team_invitations_cannot_be_created_by_members()
    {
        $owner = User::factory()->create();
        $member = User::factory()->create();
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);
        $team->members()->attach($member, ['role' => TeamRole::Member->value]);

        $response = $this
            ->actingAs($member)
            ->post(route('teams.invitations.store', $team), [
                'email' => 'invited@example.com',
                'role' => TeamRole::Member->value,
            ]);

        $response->assertForbidden();
    }

    public function test_team_invitations_can_be_cancelled_by_owners()
    {
        $owner = User::factory()->create();
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->create([
            'team_id' => $team->id,
            'invited_by' => $owner->id,
        ]);

        $response = $this
            ->actingAs($owner)
            ->delete(route('teams.invitations.destroy', [$team, $invitation]));

        $response->assertRedirect(route('teams.edit', $team));

        $this->assertDatabaseMissing('team_invitations', [
            'id' => $invitation->id,
        ]);
    }

    public function test_team_invitations_can_be_accepted()
    {
        $owner = User::factory()->create();
        $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->create([
            'team_id' => $team->id,
            'email' => 'invited@example.com',
            'role' => TeamRole::Member,
            'invited_by' => $owner->id,
        ]);

        $response = $this
            ->actingAs($invitedUser)
            ->get(route('invitations.accept', $invitation));

        $response->assertRedirect(route('dashboard'));
        $response->assertInertiaFlash('toast', ['type' => 'success', 'message' => 'Invitation accepted.']);

        $this->assertTrue($invitedUser->fresh()->belongsToTeam($team));
        $this->assertNotNull($invitation->fresh()->accepted_at);
    }

    public function test_team_invitations_can_be_declined_by_the_invited_user()
    {
        $owner = User::factory()->create();
        $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->create([
            'team_id' => $team->id,
            'email' => 'invited@example.com',
            'invited_by' => $owner->id,
        ]);

        $response = $this
            ->actingAs($invitedUser)
            ->delete(route('invitations.decline', $invitation));

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseMissing('team_invitations', [
            'id' => $invitation->id,
        ]);
    }

    public function test_team_invitations_cannot_be_declined_by_uninvited_user()
    {
        $owner = User::factory()->create();
        $uninvitedUser = User::factory()->create(['email' => 'uninvited@example.com']);
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->create([
            'team_id' => $team->id,
            'email' => 'invited@example.com',
            'invited_by' => $owner->id,
        ]);

        $response = $this
            ->actingAs($uninvitedUser)
            ->delete(route('invitations.decline', $invitation));

        $response->assertSessionHasErrors('invitation');

        $this->assertDatabaseHas('team_invitations', [
            'id' => $invitation->id,
        ]);
    }

    public function test_accepted_team_invitations_cannot_be_declined()
    {
        $owner = User::factory()->create();
        $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->accepted()->create([
            'team_id' => $team->id,
            'email' => 'invited@example.com',
            'invited_by' => $owner->id,
        ]);

        $response = $this
            ->actingAs($invitedUser)
            ->delete(route('invitations.decline', $invitation));

        $response->assertSessionHasErrors('invitation');

        $this->assertDatabaseHas('team_invitations', [
            'id' => $invitation->id,
        ]);
    }

    public function test_team_invitations_cannot_be_accepted_by_uninvited_user()
    {
        $owner = User::factory()->create();
        $uninvitedUser = User::factory()->create(['email' => 'uninvited@example.com']);
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->create([
            'team_id' => $team->id,
            'email' => 'invited@example.com',
            'invited_by' => $owner->id,
        ]);

        $response = $this
            ->actingAs($uninvitedUser)
            ->get(route('invitations.accept', $invitation));

        $response->assertSessionHasErrors('invitation');

        $this->assertFalse($uninvitedUser->fresh()->belongsToTeam($team));
    }

    public function test_expired_invitations_cannot_be_accepted()
    {
        $owner = User::factory()->create();
        $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
        $team = Team::factory()->create();

        $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

        $invitation = TeamInvitation::factory()->expired()->create([
            'team_id' => $team->id,
            'email' => 'invited@example.com',
            'invited_by' => $owner->id,
        ]);

        $response = $this
            ->actingAs($invitedUser)
            ->get(route('invitations.accept', $invitation));

        $response->assertSessionHasErrors('invitation');

        $this->assertFalse($invitedUser->fresh()->belongsToTeam($team));
    }
}
