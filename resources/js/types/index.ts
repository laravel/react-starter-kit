import { LucideIcon } from 'lucide-react';

export type Auth = {
    user: User;
}

export type BreadcrumbItem = {
    title: string;
    href: string;
}

export type NavGroup = {
    title: string;
    items: NavItem[];
}

export type NavItem = {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export type SharedData = {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
