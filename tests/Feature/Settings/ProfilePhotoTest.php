<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProfilePhotoTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_photo_can_be_uploaded()
    {
        $user = User::factory()->create();

        Storage::fake('public');

        $response = $this
            ->actingAs($user)
            ->patch('/settings/profile', [
                'name' => $user->name,
                'email' => $user->email,
                'photo' => $file = UploadedFile::fake()->image('photo.jpg'),
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/settings/profile');

        $user->refresh();

        $this->assertNotNull($user->profile_photo_path);
        $this->assertTrue(Storage::disk('public')->exists($user->profile_photo_path));
    }

    public function test_profile_photo_can_be_removed()
    {
        $user = User::factory()->create();

        Storage::fake('public'); 

        $response = $this->actingAs($user)->patch('/settings/profile', [
            'name' => $user->name,
            'email' => $user->email,
            'photo' => $file = UploadedFile::fake()->image('photo.jpg'),
        ]);
        
        $response->assertSessionHasNoErrors()
                 ->assertRedirect('/settings/profile');

        $user->refresh();

        $this->assertNotNull($user->profile_photo_path);
        $this->assertTrue(Storage::disk('public')->exists($user->profile_photo_path));

        $oldPath = $user->profile_photo_path;
        
        $response = $this->actingAs($user)->delete('/settings/profile-photo');

        $response->assertSessionHasNoErrors()
                 ->assertRedirect('/settings/profile');

        $user->refresh();
        
        $this->assertNull($user->profile_photo_path);
        $this->assertFalse(Storage::disk('public')->exists($oldPath));
    }
    
    public function test_profile_photo_can_be_updated()
    {
        $user = User::factory()->create();

        Storage::fake('public');

        $this->actingAs($user)->patch('/settings/profile', [
            'name' => $user->name,
            'email' => $user->email,
            'photo' => UploadedFile::fake()->image('initial.jpg'),
        ]);
        
        $user->refresh();
        $oldPath = $user->profile_photo_path;
        
        $response = $this->actingAs($user)->patch('/settings/profile', [
            'name' => $user->name,
            'email' => $user->email,
            'photo' => UploadedFile::fake()->image('updated.jpg'),
        ]);
        
        $response->assertSessionHasNoErrors()
                 ->assertRedirect('/settings/profile');
                 
        $user->refresh();
        
        $this->assertNotNull($user->profile_photo_path);
        $this->assertNotEquals($oldPath, $user->profile_photo_path);
        $this->assertTrue(Storage::disk('public')->exists($user->profile_photo_path));
        $this->assertFalse(Storage::disk('public')->exists($oldPath));
    }
}