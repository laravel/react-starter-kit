import { SVGAttributes } from 'react';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo(props: SVGAttributes<SVGElement>) {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate mb-0.5 font-semibold leading-none">Laravel</span>
                <span className="truncate text-[11px] tracking-tight opacity-80 leading-none">Starter Kit</span>
            </div>
        </>
    );
}
