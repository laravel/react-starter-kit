import { cn } from '@/lib/utils';
import { type LucideProps } from 'lucide-react';

interface IIconProps extends Omit<LucideProps, 'ref'> {
    iconNode: React.ComponentType<LucideProps>;
}

export function Icon({ iconNode: IconComponent, className, ...props }: IIconProps) {
    return <IconComponent className={cn('h-4 w-4', className)} {...props} />;
}
