// resources/js/pages/Blog/Index.tsx

import { BlogList } from '@/components/blog/blog-list';
import { BlogSearch } from '@/components/blog/blog-search';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BlogPost } from '@/types/blog';
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

            <div className="flex h-full flex-1 flex-col gap-10 p-4">
                {/* Hero */}
                <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                    <PlaceholderPattern className="absolute inset-0 h-full w-full text-white/20" />
                    <div className="relative z-10 px-6 py-16 text-center md:px-12">
                        <h1 className="mb-4 text-4xl font-extrabold drop-shadow-md md:text-6xl">AFAQCM Blog</h1>
                        <p className="mx-auto max-w-3xl text-lg md:text-xl">
                            Insights, tips, and updates from our assessment and quality management platform
                        </p>
                    </div>
                </div>

                {/* Search Component */}
                <BlogSearch initialQuery={filters.search} initialTags={filters.tags || []} availableTags={availableTags} className="mb-6" />

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
                                            className={`rounded-md px-3 py-2 text-sm transition-colors ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : link.url
                                                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                      : 'cursor-not-allowed text-gray-400 dark:text-gray-600'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-lg bg-gray-50 py-12 text-center dark:bg-gray-800/50">
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No blog posts found</h3>
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
