import { LucideIcon } from 'lucide-react';

export interface IAuth {
    user: IUser;
}

export interface IBreadcrumbItem {
    title: string;
    href: string;
}

export interface INavGroup {
    title: string;
    items: INavItem[];
}

export interface INavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface ISharedData {
    name: string;
    quote: { message: string; author: string };
    auth: IAuth;
    [key: string]: unknown;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
