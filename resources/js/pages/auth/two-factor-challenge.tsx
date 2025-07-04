import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';

export default function TwoFactorChallenge() {
    const [recovery, setRecovery] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        code: '',
        recovery_code: '',
    });

    const submitCode = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('two-factor.challenge'));
    };

    const submitRecoveryCode = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('two-factor.challenge'));
    };

    return (
        <AuthLayout
            title={recovery ? 'Recovery Code' : 'Authentication Code'}
            description={recovery
                ? 'Please confirm access to your account by entering one of your emergency recovery codes.'
                : 'Enter the authentication code provided by your authenticator application.'}
        >
            <Head title="Two Factor Authentication" />

            {!recovery ? (
                <form onSubmit={submitCode} className="space-y-4">
                    <div className="flex flex-col items-center justify-center space-y-3 text-center">
                        <InputOTP maxLength={6} value={data.code} onChange={(value) => setData('code', value)} autoFocus>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <InputError message={errors.code} />
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                        Continue
                    </Button>
                </form>
            ) : (
                <form onSubmit={submitRecoveryCode} className="space-y-4">
                    <Input
                        id="recovery_code"
                        type="text"
                        value={data.recovery_code}
                        onChange={(e) => setData('recovery_code', e.target.value)}
                        className="block w-full"
                        autoComplete="one-time-code"
                        placeholder="Enter recovery code"
                        autoFocus
                        required
                    />
                    <InputError message={errors.recovery_code} />
                    <Button type="submit" className="w-full" disabled={processing}>
                        Continue
                    </Button>
                </form>
            )}

            <div className="space-x-0.5 text-center text-sm leading-5 text-muted-foreground">
                <span className="opacity-80">or you can </span>
                <button
                    type="button"
                    className="font-medium underline opacity-80 cursor-pointer bg-transparent border-0 p-0"
                    onClick={() => setRecovery(!recovery)}
                >
                    {recovery
                        ? 'login using an authentication code'
                        : 'login using a recovery code'}
                </button>
            </div>
        </AuthLayout>
    );
}

