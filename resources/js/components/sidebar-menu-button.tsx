import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Button, ButtonProps } from '@mantine/core';

type Props<T extends React.ElementType> = {
    component?: T;
    icon?: React.ReactNode | null;
    iconOnly?: boolean;
    isActive?: boolean;
} & ButtonProps &
    React.ComponentPropsWithoutRef<T>;

export default function SidebarMenuButton<T extends React.ElementType>({
    className,
    isActive,
    icon,
    styles,
    iconOnly,
    children,
    ...props
}: Props<T>) {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Mantine types are incorrect
        <Button
            component={Link}
            size="md"
            color="gray"
            variant="subtle"
            leftSection={icon}
            justify={iconOnly ? 'center' : 'start'}
            className={cn('text-foreground h-8! w-full transition-none', className, iconOnly && 'p-2!')}
            styles={{
                ...(styles || {}),
                root: {
                    color: 'var(--foreground)',
                    ...(isActive && { backgroundColor: 'var(--muted)' }),
                    ...(props.styles?.root || {}),
                },
                // @ts-ignore - types are incorrect
                ...(iconOnly && { section: { marginRight: 0, ...(styles?.section || {}) } }),
            }}
            {...props}
        >
            {!iconOnly && children}
        </Button>
    );
}
