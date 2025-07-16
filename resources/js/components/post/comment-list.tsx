import { Comment } from '@/types/post';

interface CommentListProps {
    comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
    return (
        <div className="space-y-4">
            {comments.map((c) => (
                <div key={c.id} className="rounded-lg shadow p-4 bg-white dark:bg-gray-800 border dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white">{c.user_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(c.created_at).toLocaleString()}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{c.content}</p>
                </div>
            ))}
            {comments.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Be the first to leave a comment!</p>
            )}
        </div>
    );
}
