import { cn } from "@/lib/utils"
import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderCircle } from 'lucide-react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({
    status,
    canResetPassword,
    name,
    quote
}: {
    status?: string;
    canResetPassword: boolean;
    name?: string;
    quote?: array;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
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
        <AuthLayout name={name} quote={quote}>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="flex flex-col items-start sm:items-center gap-2 text-left sm:text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email and password below to login
                </p>
            </div>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="Email Address" 
                            required 
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a
                                href="#"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <Input 
                            id="password" 
                            type="password" 
                            required 
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Login
                    </Button>
                    <hr />
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href={route('register')} className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>
            </form>
        </AuthLayout>
    );
}
