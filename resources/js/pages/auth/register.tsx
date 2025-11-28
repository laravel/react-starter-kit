import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import TextLink from '@/components/text-link';

import AuthLayout from '@/layouts/auth-layout';
import { Button, PasswordInput, TextInput } from '@mantine/core';

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
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    withAsterisk={false}
                                    autoFocus
                                    tabIndex={1}
                                    label="Name"
                                    error={errors.name}
                                    autoComplete="name"
                                    disabled={processing}
                                    placeholder="Full name"
                                />
                            </div>

                            <div className="grid gap-2">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    withAsterisk={false}
                                    tabIndex={2}
                                    label="Email address"
                                    error={errors.email}
                                    autoComplete="email"
                                    disabled={processing}
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="grid gap-2">
                                <PasswordInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    withAsterisk={false}
                                    tabIndex={3}
                                    label="Password"
                                    error={errors.password}
                                    autoComplete="new-password"
                                    disabled={processing}
                                    placeholder="Password"
                                />
                            </div>

                            <div className="grid gap-2">
                                <PasswordInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    withAsterisk={false}
                                    tabIndex={4}
                                    label="Confirm password"
                                    error={errors.password_confirmation}
                                    autoComplete="new-password"
                                    disabled={processing}
                                    placeholder="Confirm password"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                loading={processing}
                                disabled={processing}
                                data-test="register-user-button"
                            >
                                Create account
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
