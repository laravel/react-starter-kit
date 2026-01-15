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

export interface IconProps extends Omit<LucideProps, 'ref'> {
    iconNode: ComponentType<LucideProps>;
}

export interface UserMenuContentProps {
    user: User;
}
