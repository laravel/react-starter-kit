// resources/js/components/blog/blog-list.tsx

import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@inertiajs/react';
import { Calendar, Eye, Heart, MessageCircle } from 'lucide-react';

interface BlogListProps {
    posts: BlogPost[];
    className?: string;
}

export function BlogList({ posts, className }: BlogListProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className || ''}`}>
            {posts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
                    {post.featured_image && (
                        <div className="relative overflow-hidden rounded-t-lg">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    )}

                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                                    {post.author.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{post.author.name}</span>
                            <span>•</span>
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.published_at)}</span>
                        </div>

                        <Link href={`/blog/${post.slug}`}>
                            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white">
                                {post.title}
                            </h3>
                        </Link>
                    </CardHeader>

                    <CardContent className="pb-4">
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                            {post.excerpt}
                        </p>

                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 3).map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{post.tags.length - 3}
                                    </Badge>
                                )}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="pt-0">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{post.views_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="h-3 w-3" />
                                    <span>{post.likes_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="h-3 w-3" />
                                    <span>{post.comments_count}</span>
                                </div>
                            </div>

                            <Link href={`/blog/${post.slug}`}>
                                <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400">
                                    Read More
                                </Button>
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
