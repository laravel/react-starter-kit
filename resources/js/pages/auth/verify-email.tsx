// Components
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';

import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@mantine/core';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="outline" loading={processing}>
                    Resend verification email
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}
