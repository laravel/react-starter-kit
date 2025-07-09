import BlogLayout from '@/layouts/blog-layout';
import { Post } from '@/types/post';
import { Link } from '@inertiajs/react';

interface Props {
    posts: Post[];
}

export default function PostIndex({ posts }: Props) {
    return (
        <BlogLayout title="Blog">
            <div className="max-w-5xl mx-auto grid gap-8">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={route('posts.show', post.slug)}
                        className="bg-white/70 backdrop-blur-lg border border-blue-200 rounded-3xl shadow-2xl hover:shadow-blue-300 transition overflow-hidden"
                    >
                        {post.thumbnail && (
                            <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover" />
                        )}
                        <div className="p-6 space-y-2">
                            <h2 className="text-2xl font-bold text-blue-900">{post.title}</h2>
                            {post.published_at && (
                                <p className="text-sm text-blue-600">
                                    {new Date(post.published_at).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </BlogLayout>
    );
}
