import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import { Button, PasswordInput, TextInput } from '@mantine/core';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Reset password" description="Please enter your new password below">
            <Head title="Reset password" />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            error={errors.email}
                            autoComplete="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            readOnly
                            onChange={(e) => setData('email', e.target.value)}
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
                            value={data.password}
                            className="mt-1 block w-full"
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
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
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm password"
                        />
                    </div>

                    <Button type="submit" className="mt-4 w-full" disabled={processing} loading={processing}>
                        Reset password
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
