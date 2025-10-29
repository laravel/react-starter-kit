import { login } from '@/routes';
import { store } from '@/routes/register';
import { Head } from '@inertiajs/react';

import { Form } from '@wandry/inertia-form';

import PasswordField from '@/components/password-field';
import TextField from '@/components/text-field';
import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';

import SubmitButton from '@/components/submit-button';

export default function Register() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-6"
            >
                <>
                    <div className="grid gap-6">
                        <TextField
                            name="name"
                            label="Name"
                            autoComplete="name"
                            placeholder="Full name"
                        />
                        <TextField
                            type="email"
                            name="email"
                            autoComplete="email"
                            label="Email"
                            placeholder="email@example.com"
                        />

                        <PasswordField
                            name="password"
                            label="Password"
                            autoComplete="new-password"
                            placeholder="Password"
                        />

                        <PasswordField
                            name="password_confirmation"
                            label="Password Confirmation"
                            autoComplete="new-password"
                            placeholder="Confirm password"
                        />

                        <SubmitButton
                            className="mt-2 w-full"
                            data-test="register-user-button"
                        >
                            Create account
                        </SubmitButton>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <TextLink href={login()} tabIndex={6}>
                            Log in
                        </TextLink>
                    </div>
                </>
            </Form>
        </AuthLayout>
    );
}
