<?php

namespace Tests\Feature;

use App\Models\Pass;
use App\Models\PassTemplate;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PassPreviewPlatformTest extends TestCase
{
    use RefreshDatabase;

    public function test_pass_edit_page_includes_platforms_for_preview_toggle(): void
    {
        $user = User::factory()->create();
        $pass = Pass::factory()->create([
            'user_id' => $user->id,
            'platforms' => ['apple', 'google'],
        ]);

        $this->actingAs($user)
            ->get(route('passes.edit', $pass))
            ->assertInertia(fn (Assert $page) => $page
                ->component('passes/edit')
                ->where('pass.platforms', ['apple', 'google'])
            );
    }

    public function test_template_edit_page_includes_platforms_for_preview_toggle(): void
    {
        $user = User::factory()->create();
        $template = PassTemplate::factory()->create([
            'user_id' => $user->id,
            'platforms' => ['apple', 'google'],
        ]);

        $this->actingAs($user)
            ->get(route('templates.edit', $template))
            ->assertInertia(fn (Assert $page) => $page
                ->component('templates/edit')
                ->where('template.platforms', ['apple', 'google'])
            );
    }
}
