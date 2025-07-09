import AppLayout from '@/layouts/app-layout';
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
        <AppLayout>
            <Head title={post.title} />
            <div className="max-w-3xl mx-auto space-y-6 p-4">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                {post.published_at && (
                    <p className="text-gray-500">
                        {new Date(post.published_at).toLocaleDateString()}
                    </p>
                )}
                <PostMedia post={post} />
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <CommentForm postSlug={post.slug} />
                <CommentList comments={comments} />
            </div>
        </AppLayout>
    );
}
