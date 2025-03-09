import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <TextInput
                            id="email"
                            type="email"
                            label="Email Address"
                            error={errors.email}
                            required
                            withAsterisk={false}
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                    </div>

                    <div className="grid gap-2">
                        <PasswordInput
                            id="password"
                            type="password"
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
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            label="Remember me"
                            checked={data.remember}
                            onChange={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing} loading={processing}>
                        Log in
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
