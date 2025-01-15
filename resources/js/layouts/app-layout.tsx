import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
// If you want to use the sidebar inset, uncomment the following line and replace <main> with <SidebarInset>
//import { SidebarInset } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';

export default function App({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <AppShell>
            <AppSidebar />
            <main>
                <AppHeader breadcrumbs={breadcrumbs} />
                {children}
            </main>
        </AppShell>
    );
}
