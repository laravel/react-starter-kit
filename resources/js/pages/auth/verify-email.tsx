// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import MainCard from '@/components/MainCard';

import Image from 'react-bootstrap/Image';

import useConfig from '@/hooks/useConfig';
import { ThemeMode } from '@/config';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';

import LightLogo from '@assets/images/logo-white.svg';
import DarkLogo from '@assets/images/logo-dark.svg';



export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const { mode } = useConfig();
    const resolvedTheme = getResolvedTheme(mode);
    setResolvedTheme(mode);

    const logo = resolvedTheme === ThemeMode.DARK ? LightLogo : DarkLogo;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout>
            <Head title="Email verification" />
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
                                <h4 className={`text-center f-w-500 mt-4 mb-3`}>Verify email</h4>
                                {status === 'verification-link-sent' && (
                                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                                        A new verification link has been sent to the email address you provided during registration.
                                    </div>
                                )}
                                <form onSubmit={submit} className="text-center">
                                    <Button disabled={processing} className="btn btn-primary shadow px-sm-4 my-3">
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Resend verification email
                                    </Button>

                                    <TextLink href={route('logout')} method="post" className="btn btn-outline-secondary px-sm-4">
                                        Log out
                                    </TextLink>
                                </form>
                            </MainCard>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
