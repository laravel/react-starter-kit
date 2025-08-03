import { BlogList } from '@/components/blog/blog-list'
import { BlogSearch } from '@/components/blog/blog-search'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { BlogPost } from '@/types/blog'
import { Head, Link } from '@inertiajs/react'
import { ArrowRight, BookOpen, CalendarDays, Rss } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: route('blog.index'),
    },
]

interface Props {
    posts: {
        data: BlogPost[]
        links: any[]
        meta: any
    }
    availableTags: string[]
    filters: {
        search?: string
        tags?: string[]
    }
}

export default function BlogIndex({ posts, availableTags, filters }: Props) {
    const featuredPost = posts.data.length > 0 ? posts.data[0] : null
    const otherPosts = posts.data.slice(1)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog" />

            <div className="flex h-full flex-1 flex-col gap-10 p-4 md:p-6 lg:p-8">
                {/* --- Enhanced Hero for the very first featured post --- */}
                {featuredPost && (
                    <div className="group relative grid min-h-[400px] overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xl md:grid-cols-2">
                        <div className="relative z-10 flex flex-col justify-center p-8 md:p-12">
                            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-400">Featured Article</p>
                            <h1 className="mb-4 font-black tracking-tight drop-shadow-md text-4xl md:text-5xl">
                                {featuredPost.title}
                            </h1>
                            <p className="mb-8 max-w-2xl text-lg text-gray-300">{featuredPost.excerpt}</p>
                            <Link href={route('blog.show', featuredPost.slug)}>
                                <Button size="lg" className="group bg-blue-600 text-white hover:bg-blue-500">
                                    Read Article
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                        <div className="relative hidden h-full md:block">
                            <img
                                src={featuredPost.image_url}
                                alt={featuredPost.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
                    {/* Main Content */}
                    <main className="lg:col-span-8">
                        {otherPosts.length > 0 ? (
                            <>
                                <BlogList posts={otherPosts} />
                                {/* --- Enhanced Pagination --- */}
                                {posts.links && posts.links.length > 3 && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="flex items-center gap-2">
                                            {posts.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-md px-4 text-sm font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-primary text-primary-foreground shadow-md'
                                                            : link.url
                                                                ? 'bg-card text-card-foreground hover:bg-accent'
                                                                : 'cursor-not-allowed text-muted-foreground'
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
                            !featuredPost && ( // Only show if there are no posts at all
                                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-24 text-center dark:border-gray-700">
                                    <Rss className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">No posts found</h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                                </div>
                            )
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
                            {otherPosts.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Posts</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4">
                                        {otherPosts.slice(0, 4).map((post) => (
                                            <Link
                                                key={post.slug}
                                                href={route('blog.show', post.slug)}
                                                className="group flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                            >
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold leading-snug text-gray-800 group-hover:text-blue-600 dark:text-gray-200">
                                                        {post.title}
                                                    </p>
                                                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <CalendarDays className="h-3 w-3" />
                                                        <span>
                                                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </AppLayout>
    )
}
