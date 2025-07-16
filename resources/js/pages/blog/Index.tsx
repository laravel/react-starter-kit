// resources/js/pages/Blog/Index.tsx

import { BlogList } from '@/components/blog/blog-list';
import { BlogSearch } from '@/components/blog/blog-search';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BlogPost } from '@/types/blog';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: '/blog',
    },
];

interface Props {
    posts: {
        data: BlogPost[];
        links: any[]; // Laravel Pagination links
        meta: any;
    };
    availableTags: string[];
    filters: {
        search?: string;
        tags?: string[];
    };
}

export default function BlogIndex({ posts, availableTags, filters }: Props) {
    const featuredPost = posts.data.length > 0 ? posts.data[0] : null;
    const recentPosts = posts.data.slice(1, 5); // Example: for a "Recent Posts" list in the sidebar

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog" />

            <div className="flex h-full flex-1 flex-col gap-10 p-4 md:p-6 lg:p-8">
                {/* --- Enhanced Hero --- */}
                {featuredPost && (
                    <div className="relative grid overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xl md:grid-cols-2">
                        {/* Left Side: Info */}
                        <div className="relative z-10 flex flex-col justify-center p-8 md:p-12">
                            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-400">
                                Featured Article
                            </p>
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight drop-shadow-md md:text-5xl">
                                {featuredPost.title}
                            </h1>
                            <p className="mb-8 max-w-2xl text-lg text-gray-300">{featuredPost.excerpt}</p>
                            <Link href={`/blog/${featuredPost.slug}`}>
                                <Button size="lg" className="group bg-blue-600 text-white hover:bg-blue-500">
                                    Read Article
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>

                        {/* Right Side: Image */}
                        <div className="relative hidden h-full min-h-[300px] md:block">
                            <img
                                src={featuredPost.image_url}
                                alt={featuredPost.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* Gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
                        </div>
                    </div>
                )}

                {/* --- Main Content & Sidebar Layout --- */}
                <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
                    {/* Main Content */}
                    <main className="lg:col-span-8">
                        {posts.data.length > 0 ? (
                            <>
                                <BlogList posts={posts.data} />

                                {/* --- Enhanced Pagination --- */}
                                {posts.links && posts.links.length > 3 && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="flex items-center gap-2">
                                            {posts.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-md px-4 text-sm font-medium transition-colors
                                                        ${
                                                        link.active
                                                            ? 'bg-primary text-primary-foreground shadow-md'
                                                            : link.url
                                                                ? 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                                : 'cursor-not-allowed text-gray-400 dark:text-gray-600'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    as="button"
                                                    disabled={!link.url}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="rounded-lg bg-gray-50 py-24 text-center dark:bg-gray-800/50">
                                <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                                    No posts found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Try adjusting your search or filter criteria.
                                </p>
                            </div>
                        )}
                    </main>

                    {/* --- Sidebar --- */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 flex flex-col gap-8">
                            <BlogSearch
                                initialQuery={filters.search}
                                initialTags={filters.tags || []}
                                availableTags={availableTags}
                            />

                            {recentPosts.length > 0 && (
                                <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                                        Recent Posts
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {recentPosts.map((post) => (
                                            <Link
                                                key={post.slug}
                                                href={`/blog/${post.slug}`}
                                                className="group flex items-center gap-4"
                                            >
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold leading-snug text-gray-800 group-hover:text-blue-600 dark:text-gray-200">
                                                        {post.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}
