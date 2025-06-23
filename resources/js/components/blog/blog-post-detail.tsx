// resources/js/components/blog/blog-post-detail.tsx

import { BlogPost, BlogComment } from '@/types/blog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Calendar, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { BlogComments } from './blog-comments';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface BlogPostDetailProps {
    post: BlogPost;
    comments: BlogComment[];
    isLiked?: boolean;
    canComment?: boolean;
}

export function BlogPostDetail({ post, comments, isLiked = false, canComment = false }: BlogPostDetailProps) {
    const [liked, setLiked] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(post.likes_count);
    const [loading, setLoading] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleLike = async () => {
        if (loading) return;

        setLoading(true);
        try {
            if (liked) {
                await router.delete(`/blog/${post.slug}/like`, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setLiked(false);
                        setLikesCount(prev => prev - 1);
                    }
                });
            } else {
                await router.post(`/blog/${post.slug}/like`, {}, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setLiked(true);
                        setLikesCount(prev => prev + 1);
                    }
                });
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Failed to share:', error);
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                // You could show a toast notification here
                alert('Link copied to clipboard!');
            } catch (error) {
                console.error('Failed to copy link:', error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <article className="mb-8">
                {/* Featured Image */}
                {post.featured_image && (
                    <div className="relative mb-6 rounded-lg overflow-hidden">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                )}

                {/* Article Header */}
                <Card className="mb-6 bg-white dark:bg-gray-800">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                                    {post.author.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{post.author.name}</span>
                            <span>•</span>
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.published_at)}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                            {post.title}
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                            {post.excerpt}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Stats and Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>{post.views_count} views</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Heart className="h-4 w-4" />
                                    <span>{likesCount} likes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>{post.comments_count} comments</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant={liked ? "default" : "outline"}
                                    size="sm"
                                    onClick={handleLike}
                                    disabled={loading}
                                    className={`gap-2 ${
                                        liked
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                                    {liked ? 'Liked' : 'Like'}
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleShare}
                                    className="gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 border-gray-200 dark:border-gray-700"
                                >
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Article Content */}
                <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="pt-6">
                        <div
                            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </CardContent>
                </Card>
            </article>

            <Separator className="my-8 bg-gray-200 dark:bg-gray-700" />

            {/* Comments Section */}
            <BlogComments
                comments={comments}
                postSlug={post.slug}
                canComment={canComment as boolean}
            />
        </div>
    );
}
