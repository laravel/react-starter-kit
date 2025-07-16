// resources/js/pages/Blog/Show.tsx

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BlogComment, BlogPost } from '@/types/blog';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, MessageSquare } from 'lucide-react';

interface Props {
    post: BlogPost;
    comments: BlogComment[];
    isLiked: boolean;
    canComment: boolean;
}

export default function BlogShow({ post, comments, isLiked, canComment }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Blog', href: '/blog' },
        { title: post.title, href: `/blog/${post.slug}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={post.title} description={post.excerpt} />

            <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="mb-8">
                    <Link href="/blog">
                        <Button variant="ghost" className="gap-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                            <ArrowLeft className="h-4 w-4" />
                            Back to All Posts
                        </Button>
                    </Link>
                </div>

                <article>
                    {/* --- Article Header --- */}
                    <header className="mb-8 border-b pb-8 dark:border-gray-700">
                        {post.category && (
                            <p className="mb-2 text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                                {post.category.name}
                            </p>
                        )}
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-3">
                                <img src={post.author.avatar_url} alt={post.author.name} className="h-10 w-10 rounded-full" />
                                <div>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{post.author.name}</span>
                                </div>
                            </div>
                            <span className="hidden md:inline">·</span>
                            <time dateTime={post.created_at} className="text-sm">
                                Published on {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                            {post.read_time && <span className="hidden md:inline">·</span>}
                            {post.read_time && <span className="text-sm">{post.read_time} min read</span>}
                        </div>
                    </header>

                    {/* --- Main Content (Requires @tailwindcss/typography) --- */}
                    <div
                        className="prose prose-lg max-w-prose mx-auto my-12 dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* --- Tags, Author Bio, and Comments --- */}
                    <div className="max-w-prose mx-auto">
                        {/* Tags Section */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="my-12 border-t pt-8 dark:border-gray-700">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">Tags:</span>
                                    {post.tags.map((tag) => (
                                        <Link key={tag} href={`/blog?tags[]=${tag}`} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Author Bio Box */}
                        <div className="my-12 flex flex-col items-center gap-6 rounded-lg bg-gray-50 p-6 text-center shadow-sm dark:bg-gray-800/50 sm:flex-row sm:text-left">
                            <img src={post.author.avatar_url} alt={post.author.name} className="h-20 w-20 rounded-full sm:h-24 sm:w-24" />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">About the author</p>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{post.author.name}</h4>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{post.author.bio}</p>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="my-12 border-t pt-8 dark:border-gray-700">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                                <MessageSquare className="inline-block h-6 w-6 mr-2 -mt-1" />
                                Comments ({comments.length})
                            </h2>

                            {/* Comment Form - (You would need to implement the form submission logic) */}
                            {canComment && (
                                <div className="mb-10">
                                    {/* Your comment form component or HTML would go here */}
                                    <textarea
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        rows={4}
                                        placeholder="Write a comment..."
                                    ></textarea>
                                    <Button className="mt-2">Post Comment</Button>
                                </div>
                            )}

                            {/* Comments List */}
                            <div className="flex flex-col gap-8">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="flex items-start gap-4">
                                            <img src={comment.author.avatar_url} alt={comment.author.name} className="h-10 w-10 rounded-full" />
                                            <div className="flex-1">
                                                <div className="flex items-baseline justify-between">
                                                    <p className="font-semibold text-gray-900 dark:text-white">{comment.author.name}</p>
                                                    <time className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(comment.created_at).toLocaleDateString()}
                                                    </time>
                                                </div>
                                                <p className="mt-1 rounded-lg bg-gray-50 p-3 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No comments yet. Be the first to share your thoughts!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </AppLayout>
    );
}
