import BlogLayout from '@/layouts/blog-layout';
import { Post, Comment } from '@/types/post';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { PostMedia } from '@/components/post/post-media';
import { CommentForm } from '@/components/post/comment-form';
import { CommentList } from '@/components/post/comment-list';

interface Props {
    post: Post;
    comments: Comment[];
}

export default function PostShow({ post, comments: initial }: Props) {
    const [comments, setComments] = useState<Comment[]>(initial);

    const refresh = () => {
        router.reload({ only: ['comments'] });
    };

    return (
        <BlogLayout title={post.title}>
            <Head title={post.title} />
            <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-extrabold text-blue-900">{post.title}</h1>
                    {post.published_at && (
                        <p className="text-sm text-gray-500">
                            {new Date(post.published_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    )}
                </div>

                <PostMedia post={post} />

                <div
                    className="prose max-w-none prose-blue prose-lg lg:prose-xl prose-img:rounded-xl prose-a:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <section className="pt-12">
                    <h2 className="text-2xl font-semibold text-blue-900 mb-4">Leave a comment</h2>
                    <CommentForm postSlug={post.slug} />
                </section>

                <section className="pt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
                    <CommentList comments={comments} />
                </section>
            </article>
        </BlogLayout>
    );
}
