<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PassImageUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_pass_image_and_receive_variants(): void
    {
        Storage::fake('public');
        config([
            'passkit.storage.images_disk' => 'public',
            'passkit.storage.images_path' => 'pass-images',
            'passkit.images.sizes' => [
                'apple' => [
                    'icon' => [
                        '1x' => ['width' => 29, 'height' => 29],
                    ],
                ],
            ],
        ]);

        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('icon.png', 200, 200)->size(200);

        $response = $this->actingAs($user)->postJson(route('passes.images.store'), [
            'image' => $file,
            'slot' => 'icon',
            'platform' => 'apple',
            'resize_mode' => 'contain',
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
            'original' => ['path', 'url', 'width', 'height', 'mime'],
            'variants' => [
                ['platform', 'slot', 'scale', 'path', 'url', 'width', 'height', 'quality_warning'],
            ],
        ]);

        $originalPath = $response->json('original.path');
        $variantPath = $response->json('variants.0.path');

        $this->assertNotEmpty($originalPath);
        $this->assertNotEmpty($variantPath);
        Storage::disk('public')->assertExists($originalPath);
        Storage::disk('public')->assertExists($variantPath);
    }

    public function test_upload_rejects_invalid_slot_and_platform(): void
    {
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('icon.png', 100, 100)->size(100);

        $response = $this->actingAs($user)->postJson(route('passes.images.store'), [
            'image' => $file,
            'slot' => 'invalid-slot',
            'platform' => 'invalid-platform',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['slot', 'platform']);
    }

    public function test_upload_rejects_invalid_image_file(): void
    {
        $user = User::factory()->create();
        $file = UploadedFile::fake()->create('file.txt', 10, 'text/plain');

        $response = $this->actingAs($user)->postJson(route('passes.images.store'), [
            'image' => $file,
            'slot' => 'icon',
            'platform' => 'apple',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['image']);
    }

    public function test_upload_marks_quality_warning_for_undersized_image(): void
    {
        Storage::fake('public');
        config([
            'passkit.storage.images_disk' => 'public',
            'passkit.storage.images_path' => 'pass-images',
            'passkit.images.quality_warning_ratio' => 1.0,
            'passkit.images.sizes' => [
                'apple' => [
                    'icon' => [
                        '1x' => ['width' => 29, 'height' => 29],
                    ],
                ],
            ],
        ]);

        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('icon.png', 10, 10)->size(50);

        $response = $this->actingAs($user)->postJson(route('passes.images.store'), [
            'image' => $file,
            'slot' => 'icon',
            'platform' => 'apple',
        ]);

        $response->assertOk();
        $this->assertTrue((bool) $response->json('variants.0.quality_warning'));
    }
}
