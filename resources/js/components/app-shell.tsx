import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { SharedData } from '@/types';
import { Toaster } from 'sonner';
import useToast from '@/hooks/use-toast';

type Props = {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
};

export function AppShell({ children, variant = 'header' }: Props) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;
    useToast();

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">
                <Toaster position="top-right" richColors closeButton={true} />
                {children}
            </div>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>
        <Toaster position="top-right" richColors closeButton={true} />
        {children}
    </SidebarProvider>;
}
