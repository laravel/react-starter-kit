import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface CommentFormProps {
    postSlug: string;
    onSuccess: () => void; // Callback function to trigger a refresh
}

export function CommentForm({ postSlug, onSuccess }: CommentFormProps) {
    // useForm is the recommended hook for handling forms in Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        user_name: '',
        content: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('posts.comments.store', postSlug), {
            preserveScroll: true,
            // On a successful submission...
            onSuccess: () => {
                reset(); // Clear the form fields
                onSuccess(); // Call the parent function to refresh the comment list
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    value={data.user_name}
                    onChange={(e) => setData('user_name', e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                {errors.user_name && <p className="text-sm text-red-500 mt-1">{errors.user_name}</p>}
            </div>
            <div>
                <textarea
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    required
                />
                {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
            </div>
            <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50"
            >
                {processing ? 'Posting...' : 'Post Comment'}
            </button>
        </form>
    );
}
