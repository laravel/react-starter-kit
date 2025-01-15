import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { type BreadcrumbItem } from '@/types';
import { SidebarInset } from '@/components/ui/sidebar';

export default function App({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <AppShell>
            <AppSidebar />
            <SidebarInset>
                <AppHeader breadcrumbs={breadcrumbs} />
                {children}
            </SidebarInset>
        </AppShell>
    );
}
