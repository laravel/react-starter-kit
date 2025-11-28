import { update } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { Button, PasswordInput, TextInput } from '@mantine/core';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <AuthLayout
            title="Reset password"
            description="Please enter your new password below"
        >
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                disabled={true}
                                defaultValue={email}
                                placeholder="Email"
                                error={errors.email}
                                autoComplete="email"
                                className="mt-1 block w-full"
                                readOnly
                            />
                        </div>

                        <div className="grid gap-2">
                            <PasswordInput
                                id="password"
                                type="password"
                                name="password"
                                label="Password"
                                error={errors.password}
                                autoComplete="new-password"
                                className="mt-1 block w-full"
                                autoFocus
                                placeholder="Password"
                            />
                        </div>

                        <div className="grid gap-2">
                            <PasswordInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                label="Confirm password"
                                error={errors.password_confirmation}
                                className="mt-1 block w-full"
                                placeholder="Confirm password"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            disabled={processing}
                            loading={processing}
                            data-test="reset-password-button"
                        >
                            Reset password
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
