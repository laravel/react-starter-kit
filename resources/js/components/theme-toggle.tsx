import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface ThemeToggleProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'dropdown' | 'button';
    size?: 'sm' | 'default' | 'lg';
    showLabel?: boolean;
}

export default function ThemeToggle({
                                        variant = 'dropdown',
                                        size = 'default',
                                        showLabel = false,
                                        className = '',
                                        ...props
                                    }: ThemeToggleProps) {
    const { appearance, updateAppearance } = useAppearance();

    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return <Moon className="h-4 w-4" />;
            case 'light':
                return <Sun className="h-4 w-4" />;
            default:
                return <Monitor className="h-4 w-4" />;
        }
    };

    const getCurrentLabel = () => {
        switch (appearance) {
            case 'dark':
                return 'Dark';
            case 'light':
                return 'Light';
            default:
                return 'System';
        }
    };

    if (variant === 'button') {
        const cycleTheme = () => {
            const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
            const currentIndex = themes.indexOf(appearance);
            const nextIndex = (currentIndex + 1) % themes.length;
            updateAppearance(themes[nextIndex]);
        };

        return (
            <div className={className} {...props}>
                <Button
                    variant="outline"
                    size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
                    onClick={cycleTheme}
                    className="flex items-center gap-2"
                >
                    {getCurrentIcon()}
                    {showLabel && <span>{getCurrentLabel()}</span>}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        );
    }

    return (
        <div className={className} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
                        className="flex items-center gap-2"
                    >
                        {getCurrentIcon()}
                        {showLabel && <span>{getCurrentLabel()}</span>}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateAppearance('light')}>
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('dark')}>
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('system')}>
                        <Monitor className="h-4 w-4 mr-2" />
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
