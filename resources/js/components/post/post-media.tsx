import { Post } from '@/types/post';

export function PostMedia({ post }: { post: Post }) {
    return (
        <div className="space-y-4">
            {post.thumbnail && (
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="rounded-lg shadow"
                />
            )}
            {post.image_gallery && post.image_gallery.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {post.image_gallery.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`image-${idx}`}
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
                    />
                </div>
            )}
        </div>
    );
}
