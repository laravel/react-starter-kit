import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ showName = true }: { showName?: boolean }) {
    return (
        <div className="flex items-center justify-start gap-x-2 py-1">
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            {showName && (
                <div className="ml-1 grid flex-1 text-left text-sm">
                    <span className="mb-0.5 truncate leading-tight font-semibold text-foreground">
                        Laravel Starter Kit
                    </span>
                </div>
            )}
        </div>
    );
}
