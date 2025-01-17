import HeaderNav from '@/components/header-nav';
import { type BreadcrumbItem } from '@/types';

export default function App({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <div className="flex flex-col  min-h-screen w-full">
            <HeaderNav />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl max-w-7xl mx-auto w-full">
                {children}
            </div>
        </div>
    );
}