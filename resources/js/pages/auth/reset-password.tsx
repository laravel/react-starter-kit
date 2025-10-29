import { update } from '@/routes/password';
import { Head } from '@inertiajs/react';

import { Form } from '@wandry/inertia-form';

import PasswordField from '@/components/password-field';
import SubmitButton from '@/components/submit-button';
import TextField from '@/components/text-field';
import AuthLayout from '@/layouts/auth-layout';

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
                defaultValues={{ email }}
            >
                <div className="grid gap-6">
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        readOnly
                    />
                    <PasswordField
                        name="password"
                        label="Password"
                        autoFocus
                        placeholder="Password"
                    />
                    <PasswordField
                        name="password_confirmation"
                        label="Confirm password"
                        autoComplete="new-password"
                        placeholder="Confirm password"
                    />

                    <SubmitButton
                        className="mt-4 w-full"
                        data-test="reset-password-button"
                    >
                        Reset password
                    </SubmitButton>
                </div>
            </Form>
        </AuthLayout>
    );
}
