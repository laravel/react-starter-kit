import type { LucideProps } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

import type { User } from './auth';
import type { BreadcrumbItem } from './navigation';

export interface AppShellProps {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
}

export interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export interface UserMenuContentProps {
    user: User;
}
