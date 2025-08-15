import { Form, Head } from '@inertiajs/react';

import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <Form method="post" action={route('login')} onSubmitComplete={(form) => form.reset('password')} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    label="Email Address"
                                    error={errors.email}
                                    required
                                    withAsterisk={false}
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
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
                                    label="Password"
                                    description={
                                        canResetPassword && (
                                            <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                                Forgot password?
                                            </TextLink>
                                        )
                                    }
                                    inputWrapperOrder={['label', 'input', 'description', 'error']}
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" label="Remember me" tabIndex={3} />
                            </div>

                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing} loading={processing}>
                                Log in
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <TextLink href={route('register')} tabIndex={5}>
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
