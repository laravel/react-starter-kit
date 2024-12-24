// Components
import { FormEventHandler } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { LoaderCircle } from "lucide-react"

import InputError from "@/Components/InputError"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import AuthLayout from "@/Layouts/Auth/AuthBase"

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

            <div className="space-y-6">
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

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
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
            </div>
        </AuthLayout>
    );
}
