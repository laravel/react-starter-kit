import BlogLayout from '@/layouts/blog-layout';
import { Post } from '@/types/post';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, Tag, User, ArrowRight, Eye, Film, ImageIcon, Mic } from 'lucide-react';

// Props definition remains the same
interface Props {
    posts: Post[];
}

/**
 * Generates a truncated excerpt from post content.
 * @param content The HTML content of the post.
 * @param limit The word limit for the excerpt.
 * @returns A plain text string of the excerpt.
 */
const createExcerpt = (content: string, limit: number = 20): string => {
    const text = content.replace(/<[^>]+>/g, ''); // Strip HTML tags
    const words = text.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
};


// Main Component: PostIndex
export default function PostIndex({ posts }: Props) {
    // Separate the first post as featured, and the next two for a special layout
    const [featured, prominent, ...others] = posts;

    return (
        <BlogLayout title="Blog">
            <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
                {/* Modern Header */}
                <header className="relative text-center py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950"></div>
                    {/* Floating shapes for decoration */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 -translate-x-10 -translate-y-10 filter blur-2xl dark:bg-blue-800"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-200 rounded-full opacity-20 translate-x-10 translate-y-10 filter blur-3xl dark:bg-indigo-800"></div>

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">
                            The Knowledge Hub
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Fresh insights, expert tips, and stories from our team.
                        </p>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    {/* Featured Post */}
                    {featured && (
                        <div className="mb-16 md:mb-24">
                            <Link href={route('posts.show', featured.slug)} className="block group">
                                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-blue-200/50 dark:shadow-blue-900/50">
                                        {featured.thumbnail_url ? (
                                            <img
                                                src={featured.thumbnail_url}
                                                alt={featured.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                                                <Eye className="w-8 h-8" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>
                                    <div className="py-4">
                                        <div className="flex items-center gap-4 text-sm mb-3">
                                            {featured.tags?.[0] && (
                                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                    {featured.tags[0]}
                                                </span>
                                            )}
                                            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> {new Date(featured.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {featured.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-base">
                                            {createExcerpt(featured.content, 30)}
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="inline-flex items-center gap-3 font-medium text-gray-800 dark:text-gray-200">
                                                <img src={`https://ui-avatars.com/api/?name=${featured.author || 'A'}&background=random`} alt="author" className="w-8 h-8 rounded-full" />
                                                {featured.author || 'Admin'}
                                            </span>
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2">
                                                Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Grid for other posts */}
                    {posts.length > 1 ? (
                        <div className="grid gap-8 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Render the second post if it exists */}
                            {prominent && <PostCard post={prominent} isProminent />}

                            {/* Render all other posts */}
                            {others.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        // Enhanced "No Articles" state
                        <div className="text-center py-20">
                            <div className="inline-block relative">
                                <Eye className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-2">
                                More Posts Coming Soon
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                                Our team is busy writing. Check back in a bit for new articles!
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </BlogLayout>
    );
}


// Sub-component: PostCard
interface PostCardProps {
    post: Post;
    isProminent?: boolean;
}

function PostCard({ post, isProminent = false }: PostCardProps) {
    // Determine card classes based on prominence
    const cardClasses = isProminent
        ? "lg:col-span-2" // Make the second post span two columns on large screens
        : "";

    return (
        <Link
            href={route('posts.show', post.slug)}
            className={`group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl dark:hover:shadow-blue-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-800 ${cardClasses}`}
        >
            <article className="flex flex-col h-full">
                {/* Card Image */}
                <div className="relative aspect-video">
                    {post.thumbnail_url ? (
                        <img
                            src={post.thumbnail_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    {post.tags?.[0] && (
                        <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-950/80 backdrop-blur-sm text-blue-600 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                            {post.tags[0]}
                        </span>
                    )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {createExcerpt(post.content)}
                    </p>

                    {/* Card Footer */}
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                             <Clock className="w-4 h-4" /> {post.reading_time} min read
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

// Add this style for the line clamp utility if it's not globally defined in your CSS
// This is an alternative to the style jsx you were using before.
// You can place this in your main app.css file.
/*
@layer utilities {
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
*/
