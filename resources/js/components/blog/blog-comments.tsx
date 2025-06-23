// resources/js/components/blog/blog-comments.tsx

import { BlogComment } from '@/types/blog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { MessageCircle, Reply } from 'lucide-react';

interface BlogCommentsProps {
    comments: BlogComment[];
    postSlug: string;
    canComment: boolean;
}

interface CommentFormData {
    contentt: string;
    parent_id?: number;
}

export function BlogComments({ comments, postSlug, canComment }: BlogCommentsProps) {
    const [replyingTo, setReplyingTo] = useState<number | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<CommentFormData>({
        contentt: '',
        parent_id: undefined,
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/blog/${postSlug}/comments`, {
            onSuccess: () => {
                reset();
                setReplyingTo(null);
            },
        });
    };

    const handleReply = (commentId: number) => {
        setReplyingTo(commentId);
        setData('parent_id', commentId);
    };

    const cancelReply = () => {
        setReplyingTo(null);
        setData('parent_id', undefined);
        setData('contentt', '');
    };

    // Separate top-level comments from replies
    const topLevelComments = comments.filter(comment => !comment.parent_id);

    const getReplies = (commentId: number) => {
        return comments.filter(comment => comment.parent_id === commentId);
    };

    const CommentItem = ({ comment, isReply = false }: { comment: BlogComment; isReply?: boolean }) => (
        <div className={`${isReply ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
            <Card className="mb-4 bg-white dark:bg-gray-800">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.user?.avatar} />
                                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                                    {(comment.author_name?.charAt(0) || comment.user?.name?.charAt(0) || 'A').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-sm text-gray-900 dark:text-white">
                                    {comment.user?.name || comment.author_name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDate(comment.created_at)}
                                </p>
                            </div>
                        </div>

                        {canComment && !isReply && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReply(comment.id)}
                                className="gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                <Reply className="h-3 w-3" />
                                Reply
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {comment.contentt}
                    </p>
                </CardContent>
            </Card>

            {/* Show reply form if this comment is being replied to */}
            {replyingTo === comment.id && (
                <Card className="mb-4 ml-8 bg-gray-50 dark:bg-gray-900">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Textarea
                                placeholder={`Reply to ${comment.user?.name || comment.author_name}...`}
                                value={data.contentt}
                                onChange={(e) => setData('contentt', e.target.value)}
                                rows={3}
                                required
                                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            />
                            {errors.contentt && (
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.contentt}</p>
                            )}
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    {processing ? 'Posting...' : 'Post Reply'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={cancelReply}
                                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Render replies */}
            {!isReply && getReplies(comment.id).map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Comments ({comments.length})
                </h2>
            </div>

            {/* Comment Form */}
            {canComment && replyingTo === null && (
                <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Textarea
                                placeholder="Share your thoughts..."
                                value={data.contentt}
                                onChange={(e) => setData('contentt', e.target.value)}
                                rows={4}
                                required
                                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                            />
                            {errors.contentt && (
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.contentt}</p>
                            )}
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                {processing ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Login prompt for guests */}
            {!canComment && (
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-6 text-center">
                        <p className="text-blue-800 dark:text-blue-200 mb-4">
                            Please log in to join the conversation
                        </p>
                        <div className="flex gap-2 justify-center">
                            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <a href="/login">Login</a>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="border-blue-200 dark:border-blue-700">
                                <a href="/register">Sign Up</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {topLevelComments.length > 0 ? (
                    topLevelComments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                ) : (
                    <Card className="bg-gray-50 dark:bg-gray-900">
                        <CardContent className="pt-6 text-center py-12">
                            <MessageCircle className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">
                                No comments yet. Be the first to share your thoughts!
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
