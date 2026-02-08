export type * from './auth';
export type * from './navigation';
export type * from './pass';
export type * from './ui';

import type { Auth } from './auth';
import type { SubscriptionData } from './pass';

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export type SharedData = {
    name: string;
    auth: Auth;
    subscription: SubscriptionData | null;
    sidebarOpen: boolean;
    [key: string]: unknown;
};
