<?php

namespace App\Filament\Resources\BlogCommentResource\Pages;

use App\Filament\Resources\BlogCommentResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateBlogComment extends CreateRecord
{
    protected static string $resource = BlogCommentResource::class;
}
