import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useLanguage } from '@/hooks/use-language';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;
    const { language } = useLanguage();
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    if (variant === 'header') {
        return (
            <div dir={dir} className={`flex min-h-screen w-full flex-col ${dir}`}>
                {children}
            </div>
        );
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <div dir={dir} className={dir}>
                {children}
            </div>
        </SidebarProvider>
    );
}
