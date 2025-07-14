import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useLanguage } from '@/hooks/use-language';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const translations = {
    en: {
        breadcrumb: 'Profile settings',
        pageTitle: 'Profile settings',
        headingTitle: 'Profile information',
        headingDesc: 'Update your name and email address',
        name: 'Name',
        email: 'Email address',
        placeholderName: 'Full name',
        placeholderEmail: 'Email address',
        unverified: 'Your email address is unverified.',
        resend: 'Click here to resend the verification email.',
        verificationSent: 'A new verification link has been sent to your email address.',
        save: 'Save',
        saved: 'Saved',
    },
    ar: {
        breadcrumb: 'إعدادات الملف الشخصي',
        pageTitle: 'إعدادات الملف الشخصي',
        headingTitle: 'معلومات الملف الشخصي',
        headingDesc: 'قم بتحديث اسمك وبريدك الإلكتروني',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        placeholderName: 'الاسم الكامل',
        placeholderEmail: 'البريد الإلكتروني',
        unverified: 'عنوان بريدك الإلكتروني غير موثق.',
        resend: 'اضغط هنا لإعادة إرسال رابط التوثيق.',
        verificationSent: 'تم إرسال رابط تحقق جديد إلى بريدك الإلكتروني.',
        save: 'حفظ',
        saved: 'تم الحفظ',
    },
} as const;

type ProfileForm = {
    name: string;
    email: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { language } = useLanguage();
    const t = translations[language];
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t.breadcrumb, href: '/settings/profile' },
    ];

    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.pageTitle} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t.headingTitle} description={t.headingDesc} />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t.name}</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder={t.placeholderName}
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">{t.email}</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder={t.placeholderEmail}
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    {t.unverified}{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        {t.resend}
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        {t.verificationSent}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>{t.save}</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">{t.saved}</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
