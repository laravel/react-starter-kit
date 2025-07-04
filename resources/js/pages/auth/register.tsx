import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';

import AuthLayout from '@/layouts/auth-layout';
import { Button, PasswordInput, TextInput } from '@mantine/core';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <TextInput
                            id="name"
                            type="text"
                            required
                            withAsterisk={false}
                            autoFocus
                            tabIndex={1}
                            label="Name"
                            error={errors.name}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                    </div>

                    <div className="grid gap-2">
                        <TextInput
                            id="email"
                            type="email"
                            required
                            withAsterisk={false}
                            tabIndex={2}
                            label="Email address"
                            error={errors.email}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                    </div>

                    <div className="grid gap-2">
                        <PasswordInput
                            id="password"
                            type="password"
                            required
                            withAsterisk={false}
                            tabIndex={3}
                            label="Password"
                            error={errors.password}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                    </div>

                    <div className="grid gap-2">
                        <PasswordInput
                            id="password_confirmation"
                            type="password"
                            required
                            withAsterisk={false}
                            tabIndex={4}
                            label="Confirm password"
                            error={errors.password_confirmation}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} loading={processing} disabled={processing}>
                        Create account
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
