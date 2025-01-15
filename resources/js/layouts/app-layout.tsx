import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { type BreadcrumbItem } from '@/types';

// For the sidebar inset variant, uncomment the import line below and replace <main> with <SidebarInset>
// If you are not using the sidebar inset, remove these comments and keep the default layout.
//import { SidebarInset } from '@/components/ui/sidebar';

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
