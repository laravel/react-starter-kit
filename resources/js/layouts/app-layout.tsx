import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type IBreadcrumbItem } from '@/types';

interface IAppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: IBreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: IAppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);
