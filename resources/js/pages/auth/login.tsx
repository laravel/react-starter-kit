import CheckboxField from '@/components/checkbox-field';
import PasswordField from '@/components/password-field';
import SubmitButton from '@/components/submit-button';
import TextField from '@/components/text-field';
import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Head } from '@inertiajs/react';

import { Form } from '@wandry/inertia-form';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                <>
                    <div className="grid gap-6">
                        <TextField
                            name="email"
                            label="Email address"
                            type="email"
                            autoFocus
                            autoComplete="email"
                            placeholder="email@example.com"
                        />
                        <PasswordField
                            name="password"
                            label="Password"
                            labelRight={
                                canResetPassword ? (
                                    <TextLink href={request()} tabIndex={4}>
                                        Forgot your password?
                                    </TextLink>
                                ) : undefined
                            }
                            autoFocus
                            autoComplete="current-password"
                            placeholder="Password"
                        />
                        <CheckboxField name="remember" label="Remember me" />

                        <SubmitButton
                            className="mt-4 w-full"
                            data-test="login-button"
                        >
                            Log in
                        </SubmitButton>
                    </div>

                    {canRegister && (
                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <TextLink href={register()} tabIndex={5}>
                                Sign up
                            </TextLink>
                        </div>
                    )}
                </>
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
