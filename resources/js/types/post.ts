export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail?: string | null;
    image_gallery?: string[] | null;
    audio?: string | null;
    video?: string | null;
    youtube_url?: string | null;
    published_at?: string | null;
    status: 'draft' | 'published';
}

export interface Comment {
    id: number;
    post_id: number;
    author_name: string;
    content: string;
    created_at: string;
    approved: boolean;
}
