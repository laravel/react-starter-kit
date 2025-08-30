import { cn } from '@/lib/utils';
import * as React from 'react';

interface AppContentProps {
    children: React.ReactNode;
    className?: string;
}

export function AppContent({ children, className, ...props }: AppContentProps) {
    return (
        <div className={cn('mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4', className)} {...props}>
            {children}
        </div>
    );
}
