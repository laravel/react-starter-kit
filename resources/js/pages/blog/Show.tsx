// resources/js/pages/Blog/Show.tsx

import { BlogPostDetail } from '@/components/blog/blog-post-detail';
import AppLayout from '@/layouts/app-layout';
import { BlogPost, BlogComment } from '@/types/blog';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    post: BlogPost;
    comments: BlogComment[];
    isLiked: boolean;
    canComment: boolean;
}

export default function BlogShow({ post, comments, isLiked, canComment }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Blog',
            href: '/blog',
        },
        {
            title: post.title,
            href: `/blog/${post.slug}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={post.title}
                description={post.excerpt}
            />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Back Button */}
                <div className="mb-4">
                    <Link href="/blog">
                        <Button variant="ghost" className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>

                {/* Blog Post Content */}
                <BlogPostDetail
                    post={post}
                    comments={comments}
                    isLiked={isLiked}
                    canComment={canComment}
                />
            </div>
        </AppLayout>
    );
}
