import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { type BreadcrumbItem } from '@/types';

export default function App({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <AppSidebar>
            <AppHeader breadcrumbs={breadcrumbs} />
            {children}
        </AppSidebar>
    );
}
