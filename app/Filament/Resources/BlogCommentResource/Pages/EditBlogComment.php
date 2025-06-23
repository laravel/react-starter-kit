<?php

namespace App\Filament\Resources\BlogCommentResource\Pages;

use App\Filament\Resources\BlogCommentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBlogComment extends EditRecord
{
    protected static string $resource = BlogCommentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
