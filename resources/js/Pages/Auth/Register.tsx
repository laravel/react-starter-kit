import { cn } from "@/lib/utils"
import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function Register({
    name,
    quote
}: {
    name?: string;
    quote?: array;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
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
        <AuthLayout name={name} quote={quote}>
            <Head title="Register" />
            <div className="flex flex-col items-start sm:items-center gap-2 text-left sm:text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your name, email and password below.
                </p>
            </div>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-3">
                    <div>
                        <Input
                            id="name"
                            type="text"
                            v-model={data.name}
                            placeholder="Name"
                            required
                            autoFocus
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Input
                            id="email"
                            type="email"
                            v-model={data.email}
                            placeholder="Email Address"
                            required
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <Input
                            id="password"
                            type="password"
                            v-model={data.password}
                            placeholder="Password"
                            required
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <Input
                            id="password_confirmation"
                            type="password"
                            v-model={data.password_confirmation}
                            placeholder="Confirm Password"
                            required
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            disabled={processing}
                        />
                        <InputError message={errors.passowrd_confirmation} className="mt-2" />
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Register
                    </Button>
                    <hr />
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href={route('login')} className="underline underline-offset-4">
                        Login
                    </a>
                </div>
            </form>
        </AuthLayout>
    );
}
