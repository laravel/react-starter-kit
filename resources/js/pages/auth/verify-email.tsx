// Components
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@mantine/core';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const cleanup = useMobileNavigation();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    const handleLogout = () => {
        cleanup();
        router.flushAll();
        router.post(route('logout'));
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center flex flex-col items-center">
                <Button type='submit' disabled={processing} variant="outline" loading={processing}>
                    Resend verification email
                </Button>

                <Button type='button' onClick={handleLogout} variant='subtle' className="cursor-pointer mx-auto block text-sm">
                    Log out
                </Button>
            </form>
        </AuthLayout>
    );
}
