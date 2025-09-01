import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/two-factor/login';
import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';

const OTP_MAX_LENGTH = 6;

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{ title: string; description: string; toggleText: string }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery Code',
                description: 'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication Code',
            description: 'Enter the authentication code provided by your authenticator application.',
            toggleText: 'login using a recovery code',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <AuthLayout title={authConfigContent.title} description={authConfigContent.description}>
            <Head title="Two-Factor Authentication" />

            <div className="space-y-6">
                {!showRecoveryInput ? (
                    <Form {...store.form()} className="space-y-4" resetOnError transform={(data) => ({ ...data, code })}>
                        {({ errors, processing, clearErrors }) => (
                            <>
                                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                                    <div className="flex w-full items-center justify-center">
                                        <InputOTP
                                            maxLength={OTP_MAX_LENGTH}
                                            value={code}
                                            onChange={(value) => setCode(value)}
                                            disabled={processing}
                                            pattern={REGEXP_ONLY_DIGITS}
                                        >
                                            <InputOTPGroup>
                                                {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                                                    <InputOTPSlot key={index} index={index} />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <InputError message={errors.code} />
                                </div>
                                <Button type="submit" className="w-full" disabled={processing || code.length < OTP_MAX_LENGTH}>
                                    Continue
                                </Button>
                                <div className="text-center text-sm text-muted-foreground">
                                    <span>or you can </span>
                                    <button
                                        type="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        onClick={() => toggleRecoveryMode(clearErrors)}
                                    >
                                        {authConfigContent.toggleText}
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                ) : (
                    <Form {...store.form()} className="space-y-4" resetOnError>
                        {({ errors, processing, clearErrors }) => (
                            <>
                                <Input name="recovery_code" type="text" placeholder="Enter recovery code" autoFocus={showRecoveryInput} required />
                                <InputError message={errors.recovery_code} />
                                <Button type="submit" className="w-full" disabled={processing}>
                                    Continue
                                </Button>

                                <div className="text-center text-sm text-muted-foreground">
                                    <span>or you can </span>
                                    <button
                                        type="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        onClick={() => toggleRecoveryMode(clearErrors)}
                                    >
                                        {authConfigContent.toggleText}
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                )}
            </div>
        </AuthLayout>
    );
}
