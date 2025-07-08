<?php
// app/Filament/Resources/BlogCommentResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogCommentResource\Pages;
use App\Models\BlogComment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class BlogCommentResource extends Resource
{
    protected static ?string $model = BlogComment::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Blog Management';

    protected static ?int $navigationSort = 2;

    public static function getNavigationLabel(): string
    {
        return __('filament.resources.blog_comment.navigation_label');
    }

    public static function getModelLabel(): string
    {
        return __('filament.resources.blog_comment.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament.resources.blog_comment.plural_label');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make(__('filament.form.comment_details'))
                    ->schema([
                        Forms\Components\Select::make('blog_post_id')
                            ->label(__('filament.resources.blog_post.label'))
                            ->relationship('blogPost', 'title')
                            ->required()
                            ->searchable(),

                        Forms\Components\Select::make('user_id')
                            ->label(__('filament.fields.user'))
                            ->relationship('user', 'name')
                            ->searchable(),

                        Forms\Components\TextInput::make('author_name')
                            ->label(__('filament.fields.author_name'))
                            ->maxLength(255),

                        Forms\Components\TextInput::make('author_email')
                            ->label(__('filament.fields.author_email'))
                            ->email()
                            ->maxLength(255),

                        Forms\Components\Textarea::make('content')
                            ->required()
                            ->rows(4),

                        Forms\Components\Select::make('status')
                            ->label(__('filament.fields.status'))
                            ->options([
                                'pending' => __('filament.status.pending'),
                                'approved' => __('filament.status.approved'),
                                'rejected' => __('filament.status.rejected'),
                            ])
                            ->default('pending')
                            ->required(),

                        Forms\Components\Select::make('parent_id')
                            ->label(__('filament.fields.reply_to'))
                            ->relationship('parent', 'content')
                            ->getOptionLabelFromRecordUsing(fn (BlogComment $record): string =>
                            Str::limit($record->content, 50)
                            )
                            ->searchable(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('blogPost.title')
                    ->label(__('filament.resources.blog_post.label'))
                    ->sortable()
                    ->searchable()
                    ->limit(30),

                Tables\Columns\TextColumn::make('author_display_name')
                    ->label('Author')
                    ->getStateUsing(fn (BlogComment $record): string => $record->getAuthorDisplayName())
                    ->searchable(['author_name', 'user.name']),

                Tables\Columns\TextColumn::make('content')
                    ->limit(50)
                    ->searchable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'approved',
                        'danger' => 'rejected',
                    ]),

                Tables\Columns\IconColumn::make('is_reply')
                    ->label(__('filament.fields.reply'))
                    ->getStateUsing(fn (BlogComment $record): bool => $record->isReply())
                    ->boolean(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label(__('filament.fields.status'))
                    ->options([
                        'pending' => __('filament.status.pending'),
                        'approved' => __('filament.status.approved'),
                        'rejected' => __('filament.status.rejected'),
                    ]),

                Tables\Filters\SelectFilter::make('blog_post')
                    ->label(__('filament.resources.blog_post.label'))
                    ->relationship('blogPost', 'title'),

                Tables\Filters\Filter::make('is_reply')
                    ->label(__('filament.filters.replies_only'))
                    ->query(fn (Builder $query): Builder => $query->whereNotNull('parent_id')),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),

                Tables\Actions\Action::make('approve')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->action(function (BlogComment $record) {
                        $record->update(['status' => 'approved']);
                    })
                    ->visible(fn (BlogComment $record): bool => $record->status !== 'approved'),

                Tables\Actions\Action::make('reject')
                    ->icon('heroicon-o-x-mark')
                    ->color('danger')
                    ->action(function (BlogComment $record) {
                        $record->update(['status' => 'rejected']);
                    })
                    ->visible(fn (BlogComment $record): bool => $record->status !== 'rejected'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),

                    Tables\Actions\BulkAction::make('approve')
                        ->label(__('filament.actions.approve_selected'))
                        ->icon('heroicon-o-check')
                        ->color('success')
                        ->action(function ($records) {
                            $records->each->update(['status' => 'approved']);
                        }),

                    Tables\Actions\BulkAction::make('reject')
                        ->label(__('filament.actions.reject_selected'))
                        ->icon('heroicon-o-x-mark')
                        ->color('danger')
                        ->action(function ($records) {
                            $records->each->update(['status' => 'rejected']);
                        }),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogComments::route('/'),
            'create' => Pages\CreateBlogComment::route('/create'),
            'view' => Pages\ViewBlogComment::route('/{record}'),
            'edit' => Pages\EditBlogComment::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'pending')->count();
    }
}
