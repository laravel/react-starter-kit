import type { InertiaLinkProps } from '@inertiajs/react';
import type { Icon } from '@tabler/icons-react';

export type BreadcrumbItem = {
    title: string;
    href: string;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: Icon | null;
    isActive?: boolean;
};
