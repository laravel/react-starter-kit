// resources/js/pages/Blog/Index.tsx

import { BlogList } from '@/components/blog/blog-list';
import { BlogSearch } from '@/components/blog/blog-search';
import AppLayout from '@/layouts/app-layout';
import { BlogPost } from '@/types/blog';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: '/blog',
    },
];

interface Props {
    posts: {
        data: BlogPost[];
        links: any[];
        meta: any;
    };
    availableTags: string[];
    filters: {
        search?: string;
        tags?: string[];
    };
}

export default function BlogIndex({ posts, availableTags, filters }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        AFAQCM Blog
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Insights, tips, and updates from our assessment and quality management platform
                    </p>
                </div>

                {/* Search Component */}
                <BlogSearch
                    initialQuery={filters.search}
                    initialTags={filters.tags || []}
                    availableTags={availableTags}
                    className="mb-6"
                />

                {/* Posts Content */}
                {posts.data.length > 0 ? (
                    <>
                        <BlogList posts={posts.data} />

                        {/* Pagination */}
                        {posts.links && posts.links.length > 3 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex items-center gap-2">
                                    {posts.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 rounded-md text-sm transition-colors ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : link.url
                                                        ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                            No blog posts found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {filters.search || (filters.tags && filters.tags.length > 0)
                                ? 'Try adjusting your search criteria.'
                                : 'Check back soon for new content!'}
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
