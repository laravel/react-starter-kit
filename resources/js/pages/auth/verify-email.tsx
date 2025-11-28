// Components
import { Form, Head, router } from '@inertiajs/react';

import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import login from '@/routes/login';
import { Button } from '@mantine/core';

export default function VerifyEmail({ status }: { status?: string }) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
        router.post(logout());
    };

    return (
        <AuthLayout
            title="Verify email"
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <Form
                {...login.store.form()}
                className="flex flex-col items-center space-y-6 text-center"
            >
                {({ processing }) => (
                    <>
                        <Button
                            type="submit"
                            disabled={processing}
                            variant="outline"
                            loading={processing}
                        >
                            Resend verification email
                        </Button>

                        <Button
                            type="button"
                            onClick={handleLogout}
                            variant="subtle"
                            className="mx-auto block cursor-pointer text-sm"
                        >
                            Log out
                        </Button>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
