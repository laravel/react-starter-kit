<?php

namespace Tests\Unit;

use App\Models\FileUpload;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FileUploadTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_file_upload_belongs_to_a_user()
    {
        $user = User::factory()->create();
        $fileUpload = FileUpload::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $fileUpload->user);
        $this->assertEquals($user->id, $fileUpload->user->id);
    }

    /** @test */
    public function it_generates_correct_url_attribute()
    {
        $fileUpload = FileUpload::factory()->create();
        $expectedUrl = route('content.download', $fileUpload->id);

        $this->assertEquals($expectedUrl, $fileUpload->url);
    }

    /** @test */
    public function it_has_correct_fillable_attributes()
    {
        $fileUpload = new FileUpload;

        $this->assertContains('user_id', $fileUpload->getFillable());
        $this->assertContains('filename', $fileUpload->getFillable());
        $this->assertContains('original_filename', $fileUpload->getFillable());
        $this->assertContains('path', $fileUpload->getFillable());
        $this->assertContains('mime_type', $fileUpload->getFillable());
        $this->assertContains('size', $fileUpload->getFillable());
        $this->assertContains('status', $fileUpload->getFillable());
    }

    /** @test */
    public function it_appends_url_attribute()
    {
        $fileUpload = FileUpload::factory()->create();
        $fileArray = $fileUpload->toArray();

        $this->assertArrayHasKey('url', $fileArray);
    }
}
