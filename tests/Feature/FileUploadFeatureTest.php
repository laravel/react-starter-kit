<?php

namespace Tests\Feature;

use App\Models\FileUpload;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FileUploadFeatureTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
    }

    /** @test */
    public function unauthenticated_users_cannot_access_file_routes()
    {
        // Try to access file upload page
        $this->get(route('content.index'))->assertRedirect('/login');

        // Try to upload a file
        $this->post(route('content.upload'), [
            'file' => UploadedFile::fake()->create('document.pdf', 100),
        ])->assertRedirect('/login');

        // Try to download a file
        $fileUpload = FileUpload::factory()->create();
        $this->get(route('content.download', $fileUpload->id))->assertRedirect('/login');

        // Try to delete a file
        $this->delete(route('content.destroy', $fileUpload->id))->assertRedirect('/login');
    }

    /** @test */
    public function authenticated_user_can_upload_a_file()
    {
        $user = User::factory()->create();

        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->actingAs($user)
            ->post(route('content.upload'), [
                'file' => $file,
            ]);

        $response->assertRedirect(route('content.index'));
        $response->assertSessionHas('success');

        // Assert database has record
        $this->assertDatabaseHas('file_uploads', [
            'user_id' => $user->id,
            'original_filename' => 'document.pdf',
            'mime_type' => 'application/pdf',
        ]);

        // Assert file exists in storage
        $fileUpload = FileUpload::first();
        $this->assertTrue(Storage::disk('local')->exists($fileUpload->path));
    }

    /** @test */
    public function user_can_download_their_own_file()
    {
        $user = User::factory()->create();

        // Create fake file and store it
        $file = UploadedFile::fake()->create('document.pdf', 100);
        $storedFile = Storage::putFileAs('uploads', $file, 'test-document.pdf');

        // Create file upload record
        $fileUpload = FileUpload::factory()->create([
            'user_id' => $user->id,
            'filename' => 'test-document.pdf',
            'original_filename' => 'document.pdf',
            'path' => $storedFile,
            'mime_type' => 'application/pdf',
        ]);

        $response = $this->actingAs($user)
            ->get(route('content.download', $fileUpload->id));

        $response->assertStatus(200)
            ->assertHeader('Content-Disposition', 'attachment; filename=document.pdf');
    }

    /** @test */
    public function user_cannot_download_another_users_file()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        // Create file for user1
        $file = UploadedFile::fake()->create('document.pdf', 100);
        $storedFile = Storage::putFileAs('uploads', $file, 'test-document.pdf');

        $fileUpload = FileUpload::factory()->create([
            'user_id' => $user1->id,
            'filename' => 'test-document.pdf',
            'original_filename' => 'document.pdf',
            'path' => $storedFile,
            'mime_type' => 'application/pdf',
        ]);

        // User2 attempts to download User1's file
        $response = $this->actingAs($user2)
            ->get(route('content.download', $fileUpload->id));

        $response->assertStatus(403);
    }

    /** @test */
    public function user_can_delete_their_own_file()
    {
        $user = User::factory()->create();

        // Create and store file
        $file = UploadedFile::fake()->create('document.pdf', 100);
        $storedFile = Storage::putFileAs('uploads', $file, 'test-document.pdf');

        $fileUpload = FileUpload::factory()->create([
            'user_id' => $user->id,
            'filename' => 'test-document.pdf',
            'original_filename' => 'document.pdf',
            'path' => $storedFile,
        ]);

        $response = $this->actingAs($user)
            ->delete(route('content.destroy', $fileUpload->id));

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Assert database record is deleted
        $this->assertDatabaseMissing('file_uploads', ['id' => $fileUpload->id]);

        // Assert file is deleted from storage
        $this->assertFalse(Storage::exists($storedFile));
    }

    /** @test */
    public function user_cannot_delete_another_users_file()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        // Create file for user1
        $file = UploadedFile::fake()->create('document.pdf', 100);
        $storedFile = Storage::putFileAs('uploads', $file, 'test-document.pdf');

        $fileUpload = FileUpload::factory()->create([
            'user_id' => $user1->id,
            'filename' => 'test-document.pdf',
            'original_filename' => 'document.pdf',
            'path' => $storedFile,
        ]);

        // User2 attempts to delete User1's file
        $response = $this->actingAs($user2)
            ->delete(route('content.destroy', $fileUpload->id));

        $response->assertRedirect();
        $response->assertSessionHas('error');

        // Assert database record still exists
        $this->assertDatabaseHas('file_uploads', ['id' => $fileUpload->id]);
    }

    /** @test */
    public function it_validates_file_upload_requirements()
    {
        $user = User::factory()->create();

        // Test without a file
        $response = $this->actingAs($user)
            ->post(route('content.upload'), []);

        $response->assertSessionHasErrors('file');

        // Test with too large file
        $hugeFile = UploadedFile::fake()->create('huge.pdf', 250000); // 250MB

        $response = $this->actingAs($user)
            ->post(route('content.upload'), [
                'file' => $hugeFile,
            ]);

        $response->assertSessionHasErrors('file');
    }

    /** @test */
    public function it_handles_missing_files_gracefully()
    {
        $user = User::factory()->create();

        // Create file record but don't actually store the file
        $fileUpload = FileUpload::factory()->create([
            'user_id' => $user->id,
            'path' => 'uploads/nonexistent-file.pdf',
        ]);

        $response = $this->actingAs($user)
            ->get(route('content.download', $fileUpload->id));

        $response->assertStatus(404);
    }

    /** @test */
    public function it_updates_file_status_correctly()
    {
        $user = User::factory()->create();

        // Create fake file and store it
        $file = UploadedFile::fake()->create('document.pdf', 100);
        $storedFile = Storage::putFileAs('uploads', $file, 'test-document.pdf');

        $fileUpload = FileUpload::factory()->create([
            'user_id' => $user->id,
            'filename' => 'test-document.pdf',
            'original_filename' => 'document.pdf',
            'path' => $storedFile,
            'status' => 'uploaded',
        ]);

        $response = $this->actingAs($user)
            ->patch(route('content.update-status', $fileUpload->id), [
                'status' => 'processing',
            ]);

        $response->assertRedirect();
        $this->assertEquals('processing', $fileUpload->fresh()->status);
    }
}
