import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import MainCard from '@/components/MainCard';

import Image from 'react-bootstrap/Image';

import useConfig from '@/hooks/useConfig';
import { ThemeMode } from '@/config';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';

import LightLogo from '@assets/images/logo-white.svg';
import DarkLogo from '@assets/images/logo-dark.svg';

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

    const { mode } = useConfig();
    const resolvedTheme = getResolvedTheme(mode);
    setResolvedTheme(mode);

    const logo = resolvedTheme === ThemeMode.DARK ? LightLogo : DarkLogo;


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Reset password" />
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
                                <h4 className={`text-center f-w-500 mt-4 mb-3`}>Reset password</h4>
                                <form onSubmit={submit}>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            value={data.email}
                                            className='form-control'
                                            readOnly
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            value={data.password}
                                            className='form-control'
                                            autoFocus
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            className='form-control'
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Confirm password"
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>


                                    <div className="text-center mt-4">
                                        <Button type="submit" className="btn btn-primary shadow px-sm-4" disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Reset password
                                        </Button>
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
