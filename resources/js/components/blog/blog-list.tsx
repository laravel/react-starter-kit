// resources/js/components/blog/blog-list.tsx

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BlogPost } from '@/types/blog';
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
            day: 'numeric',
        });
    };

    return (
        <div className={`grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3 ${className || ''}`}>
            {posts.map((post, index) => (
                <Card
                    key={post.id}
                    className={`group relative bg-white transition-all duration-300 hover:shadow-lg dark:bg-gray-800 ${index === 0 ? 'overflow-hidden md:col-span-2 lg:col-span-3' : ''}`}
                >
                    {post.featured_image && (
                        <div className={`relative overflow-hidden ${index === 0 ? '' : 'rounded-t-lg'}`}>
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className={`${index === 0 ? 'h-72 md:h-96' : 'h-48'} w-full object-cover transition-transform duration-300 group-hover:scale-105`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                    )}

                    {index === 0 ? (
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white md:p-10">
                            <div className="mb-2 flex items-center gap-2 text-sm">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={post.author.avatar} />
                                    <AvatarFallback className="bg-blue-100 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                        {post.author.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{post.author.name}</span>
                                <span>•</span>
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(post.published_at)}</span>
                            </div>
                            <Link href={`/blog/${post.slug}`}>
                                <h3 className="mb-4 line-clamp-2 text-2xl font-semibold md:text-3xl">{post.title}</h3>
                            </Link>
                            <p className="mb-6 line-clamp-3 hidden text-white/90 md:block">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
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
                                    <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                                        Read More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <CardHeader className="pb-3">
                                <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={post.author.avatar} />
                                        <AvatarFallback className="bg-blue-100 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                            {post.author.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{post.author.name}</span>
                                    <span>•</span>
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDate(post.published_at)}</span>
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                        {post.title}
                                    </h3>
                                </Link>
                            </CardHeader>

                            <CardContent className="pb-4">
                                <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">{post.excerpt}</p>

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
                                <div className="flex w-full items-center justify-between">
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
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                                        >
                                            Read More
                                        </Button>
                                    </Link>
                                </div>
                            </CardFooter>
                        </>
                    )}
                </Card>
            ))}
        </div>
    );
}
