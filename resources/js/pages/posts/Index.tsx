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
                {/* Clean Header */}
                <div className="bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                Latest Articles
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                                Our Blog
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Discover insights, stories, and ideas from our team
                            </p>
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    {posts.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={route('posts.show', post.slug)}
                                    className="group block"
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
                                        {/* Image Container */}
                                        <div className="relative aspect-video overflow-hidden">
                                            {post.thumbnail ? (
                                                <img
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                    <div className="text-gray-400 text-lg font-medium flex items-center gap-2">
                                                        <Eye className="w-5 h-5" />
                                                        Preview
                                                    </div>
                                                </div>
                                            )}

                                            {/* Date Badge */}
                                            {post.published_at && (
                                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
                                                    <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.published_at).toLocaleDateString(undefined, {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col h-full">
                                            <div className="flex-1">
                                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                                    {post.title}
                                                </h2>

                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                                    {post.slug || 'Click to read more and discover amazing insights...'}
                                                </p>
                                            </div>

                                            {/* Read More */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors duration-200 font-medium text-sm">
                                                    <span>Read Article</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                                </div>

                                                {post.published_at && (
                                                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                        <Clock className="w-3 h-3" />
                                                        <span>2 min read</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="bg-gray-50 rounded-3xl p-12 max-w-md mx-auto border border-gray-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Eye className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Posts Yet</h3>
                                <p className="text-gray-600">
                                    Check back soon for our latest articles and insights.
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
