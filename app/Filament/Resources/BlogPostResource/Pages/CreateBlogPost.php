<?php
// app/Filament/Resources/BlogPostResource/Pages/CreateBlogPost.php

namespace App\Filament\Resources\BlogPostResource\Pages;

use App\Filament\Resources\BlogPostResource;
use Filament\Resources\Pages\CreateRecord;

class CreateBlogPost extends CreateRecord
{
    protected static string $resource = BlogPostResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['author_id'] = auth()->id();

        if ($data['status'] === 'published' && !$data['published_at']) {
            $data['published_at'] = now();
        }

        return $data;
    }
}
