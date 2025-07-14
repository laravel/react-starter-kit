import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { useLanguage } from '@/hooks/use-language';

const translations = {
    en: {
        breadcrumb: 'Appearance settings',
        pageTitle: 'Appearance settings',
        heading: 'Appearance settings',
        description: "Update your account's appearance settings",
    },
    ar: {
        breadcrumb: 'إعدادات المظهر',
        pageTitle: 'إعدادات المظهر',
        heading: 'إعدادات المظهر',
        description: 'قم بتحديث إعدادات مظهر حسابك',
    },
} as const;

export default function Appearance() {
    const { language } = useLanguage();
    const t = translations[language];
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t.breadcrumb, href: '/settings/appearance' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.pageTitle} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t.heading} description={t.description} />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
