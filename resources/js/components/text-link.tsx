import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn('underline decoration-neutral-400 underline-offset-2 duration-300 ease-out hover:decoration-neutral-700', className)}
            {...props}
        >
            {children}
        </Link>
    );
}
