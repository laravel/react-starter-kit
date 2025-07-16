import BlogLayout from '@/layouts/blog-layout';
import { Post } from '@/types/post';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, Tag, User, ArrowRight, Eye } from 'lucide-react';

interface Props {
    posts: Post[];
}

export default function PostIndex({ posts }: Props) {
    const [featured, ...others] = posts;

    return (
        <BlogLayout title="Blog">
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
                {/* Header */}
                <header className="bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-5 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                            Latest Articles
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Explore Our Blog
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                            Read stories, insights, and team updates
                        </p>
                    </div>
                </header>

                {/* Featured Post */}
                {featured && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        <Link href={route('posts.show', featured.slug)} className="block group">
                            <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                                {featured.thumbnail ? (
                                    <img
                                        src={featured.thumbnail_url}
                                        alt={featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 text-lg">
                                        <Eye className="w-6 h-6 mr-2" /> No Preview
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 p-8 flex flex-col justify-end">
                                    <span className="text-sm text-blue-200 mb-2 inline-flex items-center gap-1">
                                        <Tag className="w-4 h-4" /> {featured.tags?.[0] || 'General'}
                                    </span>
                                    <h2 className="text-white text-3xl font-bold leading-tight mb-2 group-hover:text-blue-300">
                                        {featured.title}
                                    </h2>
                                    <div className="text-gray-300 text-sm flex gap-4">
                                        <span className="inline-flex items-center gap-1">
                                            <User className="w-4 h-4" /> {featured.author || 'Admin'}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <Calendar className="w-4 h-4" /> {new Date(featured.published_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Posts Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    {others.length > 0 ? (
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {others.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={route('posts.show', post.slug)}
                                    className="group block hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
                                >
                                    <article className="flex flex-col h-full">
                                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                                            {post.thumbnail ? (
                                                <img
                                                    src={post.thumbnail_url}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Eye className="w-6 h-6 mr-2" /> Preview
                                                </div>
                                            )}
                                            {post.published_at && (
                                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-gray-600 dark:text-gray-200 shadow">
                                                    <Calendar className="w-4 h-4 inline-block mr-1" />
                                                    {new Date(post.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="text-xs text-blue-600 dark:text-blue-300 font-medium mb-1">
                                                {post.slug?.[0] || 'General'}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                                {post.slug || 'Click to read more...'}
                                            </p>
                                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm">
                                                <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
                                                    Read Article <ArrowRight className="w-4 h-4" />
                                                </span>
                                                <span className="text-gray-400 dark:text-gray-300 flex items-center gap-1">
                                                    <Clock className="w-4 h-4" /> 2 min read
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (

                        <div className="text-center py-32">
                            <div className="inline-block bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 border border-gray-200 dark:border-gray-700">
                                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-6">
                                    <Eye className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">No Articles Yet</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mx-auto">
                                    New content is coming soon. Stay tuned!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </BlogLayout>
    );
}
