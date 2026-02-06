import type { ButtonProps } from '@mantine/core';
import { Button, Tooltip } from '@mantine/core';
import React from 'react';
import { cn } from '@/lib/utils';

type Props<T extends React.ElementType> = {
    component?: T;
    icon?: React.ReactNode | null;
    iconOnly?: boolean;
    tooltip?: string;
    isActive?: boolean;
} & ButtonProps &
    React.ComponentPropsWithoutRef<T>;

export default function HeaderMenuButton<T extends React.ElementType>({
    className,
    tooltip,
    isActive,
    icon,
    styles,
    iconOnly,
    children,
    ...props
}: Props<T>) {
    const buttonContent = (
        // @ts-expect-error - Mantine types are incorrect
        <Button
            size="sm"
            color="gray"
            variant="subtle"
            leftSection={icon}
            justify={iconOnly ? 'center' : 'start'}
            className={cn(
                'w-full text-foreground transition-none',
                className,
                iconOnly && 'p-2!',
            )}
            styles={{
                ...(styles || {}),
                root: {
                    color: 'var(--foreground)',
                    ...(isActive && { backgroundColor: 'var(--muted)' }),
                    ...(props.styles?.root || {}),
                },
                ...(iconOnly && {
                    // @ts-expect-error - types are incorrect
                    section: { marginRight: 0, ...(styles?.section || {}) },
                }),
            }}
            {...props}
        >
            {!iconOnly && children}
        </Button>
    );

    return (
        <div
            className={cn(
                'flex h-full flex-col items-center justify-center',
                isActive && 'border-b border-b-foreground',
            )}
        >
            {tooltip ? (
                <Tooltip
                    withArrow
                    arrowSize={6}
                    offset={10}
                    label={<span className="text-xs">{tooltip}</span>}
                >
                    {buttonContent}
                </Tooltip>
            ) : (
                buttonContent
            )}
        </div>
    );
}
