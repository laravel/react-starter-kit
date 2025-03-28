import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Button, ButtonProps, Tooltip } from '@mantine/core';

type Props<T extends React.ElementType> = {
    component?: T;
    icon?: React.ReactNode | null;
    iconOnly?: boolean;
    tooltip?: string;
    isActive?: boolean;
} & ButtonProps &
    React.ComponentPropsWithoutRef<T>;

const Wrapper = ({
    tooltip,
    isActive,
    iconOnly,
    children,
}: React.PropsWithChildren<{ tooltip?: string; isActive?: boolean; iconOnly?: boolean }>) => (
    <>
        <div className={cn('flex items-stretch', isActive && '')}>
            {tooltip && iconOnly ? (
                <Tooltip
                    className="self-stretch"
                    withArrow
                    position="right"
                    arrowSize={6}
                    offset={10}
                    label={<span className="text-xs">{tooltip}</span>}
                >
                    {children}
                </Tooltip>
            ) : (
                children
            )}
        </div>
    </>
);
export default function SidebarMenuButton<T extends React.ElementType>({
    className,
    isActive,
    icon,
    iconOnly,
    tooltip,
    styles,
    children,
    ...props
}: Props<T>) {
    return (
        <>
            <Wrapper tooltip={tooltip} isActive={isActive} iconOnly={iconOnly}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                {/* @ts-ignore - Mantine types are incorrect */}
                <Button
                    component={Link}
                    size="md"
                    color="gray"
                    variant="subtle"
                    leftSection={icon}
                    justify={iconOnly ? 'center' : 'start'}
                    className={cn('text-foreground h-8! w-full flex-1 transition-none', className, iconOnly && 'p-2!')}
                    styles={{
                        ...(styles || {}),
                        root: {
                            color: 'var(--foreground)',
                            ...(isActive && { backgroundColor: 'var(--muted)' }),
                            ...(props.styles?.root || {}),
                        },
                        // @ts-expect-error - types are incorrect
                        ...(iconOnly && { section: { marginRight: 0, ...(styles?.section || {}) } }),
                    }}
                    {...props}
                >
                    {!iconOnly && children}
                </Button>
            </Wrapper>
        </>
    );
}
