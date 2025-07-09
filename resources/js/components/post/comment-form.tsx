import { useState } from 'react';
import { router } from '@inertiajs/react';

export function CommentForm({ postSlug }: { postSlug: string }) {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const submit = () => {
        setLoading(true);
        router.post(
            `/posts/${postSlug}/comments`,
            { author_name: author, content },
            {
                preserveScroll: true,
                onFinish: () => {
                    setAuthor('');
                    setContent('');
                    setLoading(false);
                    setSubmitted(true);
                },
            }
        );
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}
            className="space-y-2"
        >
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="w-full rounded border p-2"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Comment"
                className="w-full rounded border p-2"
                rows={4}
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                {loading ? 'Posting...' : 'Post Comment'}
            </button>
            {submitted && (
                <p className="text-sm text-gray-600">Your comment will appear once approved.</p>
            )}
        </form>
    );
}
