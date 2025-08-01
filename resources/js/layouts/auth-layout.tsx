import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { Suspense, useEffect } from 'react';

// project-imports
import Loader from '@/components/Loader';
import Customizer from './Dashboard/Customizer';
import useConfig from '@/hooks/useConfig';
import { setResolvedTheme } from '@/components/setResolvedTheme';

export default function AuthLayout({ children, ...props }: { children: React.ReactNode }) {
    const { themeDirection, customColor, mode } = useConfig();

    useEffect(() => {
        const body = document.body;
        body.setAttribute('data-pc-preset', customColor);
        body.setAttribute('data-pc-direction', themeDirection);
        body.setAttribute('data-pc-theme', mode);
        setResolvedTheme(mode);
    }, [customColor, themeDirection, mode]);

    return (
        <Suspense fallback={<Loader />}>
            <Customizer />
            <AuthLayoutTemplate {...props}>
                {children}
            </AuthLayoutTemplate>
        </Suspense>
    );
}
