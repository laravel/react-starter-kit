import type { ReactNode } from 'react';

import type { BreadcrumbItem } from './navigation';

export interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export interface AuthLayoutProps {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export interface SettingsLayoutProps {
    children: ReactNode;
}

export interface LoginPageProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export interface TwoFactorPageProps {
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
}
