import { FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

// Components
import InputError from "@/Components/InputError";
import AuthLayout from "@/Layouts/Auth/AuthBase";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthLayout 
            title="Create an account"
            description="Enter your name, email and password below."
        >
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            required
                            autoFocus
                            onChange={(e) => setData("name", e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            required
                            onChange={(e) => setData("email", e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            required
                            onChange={(e) => setData("password", e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            required
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            disabled={processing}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Register
                    </Button>
                    <hr />
                </div>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href={route("login")} className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
