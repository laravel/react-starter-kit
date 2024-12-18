// Components
import InputError from "@/Components/InputError";
import AuthLayout from "@/Layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout
            title="Forgot Password"
            description="Enter your email to receive a password reset link"
            >
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-start">
                    <Button className="w-full" disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
                <hr />
            </form>
            <div className="text-center text-sm space-x-1">
                
                <span>Return back to the</span>
                <Link href={route("login")} className="underline underline-offset-4">
                    login page
                </Link>
            </div>
        </AuthLayout>
    );
}
