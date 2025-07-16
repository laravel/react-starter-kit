import { Post } from '@/types/post';

interface PostMediaProps {
    post: Post;
}

export function PostMedia({ post }: PostMediaProps) {
    return (
        <div className="space-y-4">
            {post.thumbnail_url && (
                <img
                    src={post.thumbnail_url}
                    alt={post.title} // Use post title for better alt text
                    className="rounded-lg shadow w-full object-cover"
                />
            )}
            {post.image_gallery_urls && post.image_gallery_urls.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {post.image_gallery_urls.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Gallery image ${idx + 1}`}
                            className="rounded-lg shadow"
                        />
                    ))}
                </div>
            )}
            {post.audio && (
                <audio controls className="w-full">
                    <source src={post.audio} />
                </audio>
            )}
            {post.video && (
                <video controls className="w-full rounded-lg shadow">
                    <source src={post.video} />
                </video>
            )}
            {post.youtube_url && (
                <div className="aspect-video">
                    <iframe
                        src={post.youtube_url}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                        title="YouTube video player" // Added for accessibility
                    />
                </div>
            )}
        </div>
    );
}
