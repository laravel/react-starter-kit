import type { ReactNode } from 'react';

import type { BreadcrumbItem } from './navigation';

export interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export interface SettingsLayoutProps {
    children: ReactNode;
}
