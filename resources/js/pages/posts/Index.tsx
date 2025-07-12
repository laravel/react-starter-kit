import BlogLayout from '@/layouts/blog-layout';
import { Post } from '@/types/post';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react';

interface Props {
    posts: Post[];
}

export default function PostIndex({ posts }: Props) {
    return (
        <BlogLayout title="Blog">
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-gradient-to-b from-blue-50 via-white to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                                Latest Articles
                            </span>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                                Explore Our Blog
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
                                Read our latest stories, insights, and updates from the team
                            </p>
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    {posts.length > 0 ? (
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={route('posts.show', post.slug)}
                                    className="group block transition-transform duration-300 hover:scale-[1.02]"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <article className="flex flex-col h-full bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                        <div className="relative aspect-video bg-gray-100">
                                            {post.thumbnail ? (
                                                <img
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-medium">
                                                    <Eye className="w-6 h-6 mr-2" />
                                                    Preview
                                                </div>
                                            )}

                                            {post.published_at && (
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-gray-600 shadow">
                                                    <Calendar className="w-4 h-4 inline-block mr-1" />
                                                    {new Date(post.published_at).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2 transition-colors duration-200">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {post.slug || 'Click to read more and discover amazing insights...'}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-blue-600 group-hover:text-blue-700">
                                                <span className="flex items-center gap-1 font-medium">
                                                    Read Article
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </span>

                                                <span className="text-gray-400 flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    2 min read
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <div className="inline-block bg-white shadow-lg rounded-2xl p-10 border border-gray-200">
                                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                    <Eye className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Articles Yet</h3>
                                <p className="text-gray-600 text-sm max-w-sm mx-auto">
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
