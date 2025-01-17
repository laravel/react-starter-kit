import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';

export default function App({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <AppShell>
            <AppSidebar />
            <SidebarInset>
                <AppHeader breadcrumbs={breadcrumbs} />
                <div className="px-4 border-t border-sidebar-border/50 h-full">
                    {children}
                </div>
            </SidebarInset>
        </AppShell>
    );
}