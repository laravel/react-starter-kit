import { Comment } from '@/types/post';

export function CommentList({ comments }: { comments: Comment[] }) {
    return (
        <div className="space-y-4">
            {comments.map((c) => (
                <div key={c.id} className="rounded shadow p-4 bg-white">
                    <p className="font-semibold">{c.author_name}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(c.created_at).toLocaleString()}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap">{c.content}</p>
                </div>
            ))}
        </div>
    );
}
