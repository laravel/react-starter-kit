import BlogLayout from '@/layouts/blog-layout';
import { Post, Comment } from '@/types/post';
import { Head, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

// Import the separated components
import { PostMedia } from '@/components/post/post-media';
import { CommentList } from '@/components/post/comment-list';
import { CommentForm } from '@/components/post/comment-form';

interface PageProps {
    post: Post;
    comments: Comment[];
}

export default function PostShow({ post, comments: initialComments }: PageProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);

    // This hook syncs the local state with server props.
    // When `router.reload` fetches new comments, `initialComments` changes,
    // and this hook updates the `comments` state, re-rendering the list.
    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    // This function is passed to the form.
    // It's the "refresh button" that the form presses on success.
    const refreshComments = () => {
        router.reload({ only: ['comments'], preserveScroll: true });
    };

    return (
        <BlogLayout title={post.title}>
            <Head title={post.title} />

            <article className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-14">
                {/* Post Header */}
                <header className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">{post.title}</h1>
                    {post.published_at && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Published on {new Date(post.published_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        </p>
                    )}
                </header>

                {/* Media Component */}
                <PostMedia post={post} />

                {/* Content */}
                <div
                    className="prose max-w-none prose-blue prose-lg lg:prose-xl dark:prose-invert prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-md prose-a:text-blue-600 dark:prose-a:text-blue-400"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Leave a Comment Section */}
                <section className="pt-10 border-t border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Leave a Comment</h2>
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                        {/* Pass the refresh function to the form */}
                        <CommentForm postSlug={post.slug} onSuccess={refreshComments} />
                    </div>
                </section>

                {/* Comments Section */}
                <section className="pt-12">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Comments ({comments.length})
                    </h3>
                    <div className="space-y-4">
                        <CommentList comments={comments} />
                    </div>
                </section>
            </article>
        </BlogLayout>
    );
}
