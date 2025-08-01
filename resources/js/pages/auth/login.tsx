
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import Form from 'react-bootstrap/Form';
import MainCard from '@/components/MainCard';

import Image from 'react-bootstrap/Image';

import useConfig from '@/hooks/useConfig';
import { ThemeMode } from '@/config';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';

import LightLogo from '@assets/images/logo-white.svg';
import DarkLogo from '@assets/images/logo-dark.svg';


type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: 'viral@phoenixcoded.co',
        password: '123123123',
        remember: false,
    });

    const { mode } = useConfig();
    const resolvedTheme = getResolvedTheme(mode);
    setResolvedTheme(mode);

    const logo = resolvedTheme === ThemeMode.DARK ? LightLogo : DarkLogo;

    const submit: FormEventHandler = (e) => {
        console.log(route('login'));
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />
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
                                <h4 className={`text-center f-w-500 mt-4 mb-3`}>Login</h4>
                                <form className="flex flex-col gap-6" onSubmit={submit}>
                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            value={data.email}
                                            className='form-control'
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            className='form-control'
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <Form.Group controlId="customCheckc1">
                                            <Form.Check
                                                type="checkbox"
                                                label="Remember me?"
                                                defaultChecked
                                                className={`input-primary`}
                                                checked={data.remember}
                                                onClick={() => setData('remember', !data.remember)}
                                            />
                                        </Form.Group>
                                        {canResetPassword && (
                                            <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <div className="text-center mt-4">
                                        <Button type="submit" className="btn btn-primary shadow px-sm-4" tabIndex={4} disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Log in
                                        </Button>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-end mt-4">
                                        <h6 className={`f-w-500 mb-0`}>Don't have an Account?</h6>
                                        <a href={route('register')} className="link-primary text-end">
                                            Sign up
                                        </a>
                                    </div>
                                </form>

                                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                            </MainCard>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
