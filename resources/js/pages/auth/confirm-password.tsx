// Components
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

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });
    const { mode } = useConfig();
    const resolvedTheme = getResolvedTheme(mode);
    setResolvedTheme(mode);

    const logo = resolvedTheme === ThemeMode.DARK ? LightLogo : DarkLogo;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Confirm password" />
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
                                <h4 className={`text-center f-w-500 mt-4 mb-3`}>Confirm password</h4>
                                <form onSubmit={submit}>
                                    <div className="space-y-6">
                                        <div className="d-flex flex-column gap-2 mb-3">
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={data.password}
                                                className='form-control'
                                                autoFocus
                                                onChange={(e) => setData('password', e.target.value)}
                                            />

                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="text-center mt-4">
                                            <Button className="btn btn-primary shadow px-sm-4" disabled={processing}>
                                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                                Confirm password
                                            </Button>
                                        </div>

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
