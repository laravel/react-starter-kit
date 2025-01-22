import { Icon as LucideIcon, type LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps extends Omit<LucideProps, 'ref'> {
    iconNode: React.ComponentType<LucideProps>;
}

export function Icon({ iconNode: IconComponent, className, ...props }: IconProps) {
    return (
        <IconComponent
            className={cn('h-4 w-4', className)}
            {...props}
        />
    );
}
