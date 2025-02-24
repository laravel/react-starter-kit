import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type IBreadcrumbItem } from '@/types';

interface IAppHeaderLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: IBreadcrumbItem[];
}

export default function AppHeaderLayout({ children, breadcrumbs }: IAppHeaderLayoutProps) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
