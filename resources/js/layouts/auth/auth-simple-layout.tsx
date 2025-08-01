import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
}

export default function AuthSimpleLayout({ children, ...props }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
            <div
                data-pc-preset="preset-1"
                data-pc-sidebar-caption="true"
                data-pc-direction="ltr"
                data-pc-theme="light"
                {...props}
            >
                {children}
            </div>
        </>
    );
}
