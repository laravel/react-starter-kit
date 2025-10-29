// Components
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Head } from '@inertiajs/react';

import { Form } from '@wandry/inertia-form';

import SubmitButton from '@/components/submit-button';
import TextField from '@/components/text-field';
import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Forgot password"
            description="Enter your email to receive a password reset link"
        >
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    <>
                        <TextField
                            name="email"
                            type="email"
                            label="Email address"
                            autoComplete="off"
                            autoFocus
                            placeholder="email@example.com"
                        />

                        <div className="my-6 flex items-center justify-start">
                            <SubmitButton
                                className="w-full"
                                data-test="email-password-reset-link-button"
                            >
                                Email password reset link
                            </SubmitButton>
                        </div>
                    </>
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href={login()}>log in</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
