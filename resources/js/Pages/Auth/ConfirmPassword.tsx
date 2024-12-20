// Components
import InputError from "@/Components/InputError";
import AuthLayout from "@/Layouts/Auth/AuthBase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LoaderCircle } from "lucide-react";

import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Confirm Your Password" description="This is a secure area of the application. Please confirm your
                password before continuing.">
            <Head title="Confirm Password" />


            <form onSubmit={submit}>
                <div class="space-y-6">
                    <div className="grid gap-2">

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Confirm Password
                        </Button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
