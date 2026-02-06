import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {
    variant?: 'header' | 'sidebar';
};

export function AppContent({ children, className, ...props }: Props) {
    return (
        <div
            className={cn(
                'mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
