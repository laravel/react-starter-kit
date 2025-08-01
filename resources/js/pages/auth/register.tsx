import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import MainCard from '@/components/MainCard';

import Image from 'react-bootstrap/Image';

import useConfig from '@/hooks/useConfig';
import { ThemeMode } from '@/config';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';

import LightLogo from '@assets/images/logo-white.svg';
import DarkLogo from '@assets/images/logo-dark.svg';

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
    const { mode } = useConfig();
    const resolvedTheme = getResolvedTheme(mode);
    setResolvedTheme(mode);

    const logo = resolvedTheme === ThemeMode.DARK ? LightLogo : DarkLogo;


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Register" />
            <div className="auth-main">
                <div className="auth-wrapper v1">
                    <div className="auth-form">
                        <div className="position-relative">
                            <div className="auth-bg">
                                <span className="r"></span>
                                <span className="r s"></span>
                                <span className="r s"></span>
                                <span className="r"></span>
                            </div>
                            <MainCard className="mb-0">
                                <div className="text-center">
                                    <a>
                                        <Image src={logo} alt="img" />
                                    </a>
                                </div>
                                <h4 className={`text-center f-w-500 mt-4 mb-3`}>Sign up</h4>
                                <form className="flex flex-col gap-6" onSubmit={submit}>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            className='form-control'
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Full name"
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            className='form-control'
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            className='form-control'
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                            placeholder="Password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            className='form-control'
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            disabled={processing}
                                            placeholder="Confirm password"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <div className="text-center mt-4">
                                        <Button type="submit" className="btn btn-primary shadow px-sm-4" tabIndex={5} disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Create account
                                        </Button>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-end mt-4">
                                        <h6 className={`f-w-500 mb-0`}>Already have an account?</h6>
                                        <a href={route('login')} className="link-primary text-end">
                                            Log in
                                        </a>
                                    </div>
                                </form>
                            </MainCard>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
