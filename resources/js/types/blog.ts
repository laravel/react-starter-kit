// resources/js/types/blog.ts

export interface BlogPost {
    id: number;
    title: string;
    title_ar?: string;
    slug: string;
    excerpt: string;
    excerpt_ar?: string;
    content: string;
    content_ar?: string;
    featured_image?: string;
    status: 'draft' | 'published' | 'archived';
    tags?: string[];
    meta_data?: Record<string, any>;
    published_at: string;
    views_count: number;
    likes_count: number;
    comments_count: number;
    created_at: string;
    updated_at: string;
    author: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
}

export interface BlogComment {
    id: number;
    blog_post_id: number;
    user_id?: number;
    parent_id?: number;
    author_name?: string;
    author_email?: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    meta_data?: Record<string, any>;
    likes_count: number;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
    replies?: BlogComment[];
}

export interface BlogPostLike {
    id: number;
    blog_post_id: number;
    user_id?: number;
    session_id?: string;
    ip_address?: string;
    created_at: string;
    updated_at: string;
}
