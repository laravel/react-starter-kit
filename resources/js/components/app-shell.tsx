import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';

export function AppShell({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('sidebar') !== 'false' : true));

    const handleSidebarChange = (open: boolean) => {
        setIsOpen(open);
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar', String(open));
        }
    };

    return (
        <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={handleSidebarChange}>
            {children}
        </SidebarProvider>
    );
}
