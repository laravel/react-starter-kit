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

    console.log(post);
    const refresh = () => {
        router.reload({ only: ['comments'] });
    };

    return (
        <BlogLayout title={post.title}>
            <Head title={post.title} />

            <article className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-14">
                {/* Post Header */}
                <header className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{post.title}</h1>
                    {post.published_at && (
                        <p className="text-sm text-gray-500">
                            {new Date(post.published_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    )}
                </header>

                {/* Media */}
                <PostMedia post={post} />

                {/* Content */}
                <div
                    className="prose max-w-none prose-blue prose-lg lg:prose-xl prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-md prose-a:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Leave a Comment */}
                <section className="pt-10 border-t border-gray-200">
                    <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">Leave a Comment</h2>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                        <CommentForm postSlug={post.slug} />
                    </div>
                </section>

                {/* Comments */}
                <section className="pt-12">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
                    <div className="space-y-4">
                        <CommentList comments={comments} />
                    </div>
                </section>
            </article>
        </BlogLayout>
    );
}
