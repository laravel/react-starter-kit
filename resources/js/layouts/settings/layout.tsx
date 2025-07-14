import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { useLanguage } from '@/hooks/use-language';

const translations = {
    en: {
        settings: 'Settings',
        description: 'Manage your profile and account settings',
        profile: 'Profile',
        password: 'Password',
        appearance: 'Appearance',
    },
    ar: {
        settings: 'الإعدادات',
        description: 'إدارة إعدادات الحساب والمعلومات الشخصية',
        profile: 'الملف الشخصي',
        password: 'كلمة المرور',
        appearance: 'المظهر',
    },
} as const;

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { language } = useLanguage();
    const t = translations[language];

    const sidebarNavItems: NavItem[] = [
        { title: t.profile, href: '/settings/profile', icon: null },
        { title: t.password, href: '/settings/password', icon: null },
        { title: t.appearance, href: '/settings/appearance', icon: null },
    ];
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title={t.settings} description={t.description} />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <Link href={item.href} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
