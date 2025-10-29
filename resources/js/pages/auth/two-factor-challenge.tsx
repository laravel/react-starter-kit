import InputOtpField from '@/components/input-otp-field';
import SubmitButton from '@/components/submit-button';
import TextField from '@/components/text-field';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/two-factor/login';
import { Head } from '@inertiajs/react';
import { Form } from '@wandry/inertia-form';
import { useMemo, useState } from 'react';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery Code',
                description:
                    'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication Code',
            description:
                'Enter the authentication code provided by your authenticator application.',
            toggleText: 'login using a recovery code',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (): void => {
        setShowRecoveryInput(!showRecoveryInput);
    };

    return (
        <AuthLayout
            title={authConfigContent.title}
            description={authConfigContent.description}
        >
            <Head title="Two-Factor Authentication" />

            <div className="space-y-6">
                <Form
                    {...store.form()}
                    resetOnSuccess={!showRecoveryInput}
                    className="space-y-4"
                >
                    <>
                        {showRecoveryInput ? (
                            <TextField
                                name="recovery_code"
                                type="text"
                                placeholder="Enter recovery code"
                                autoFocus={showRecoveryInput}
                                required
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center space-y-3 text-center">
                                <InputOtpField
                                    name="code"
                                    length={OTP_MAX_LENGTH}
                                />
                            </div>
                        )}

                        <SubmitButton className="w-full">Continue</SubmitButton>

                        <div className="text-center text-sm text-muted-foreground">
                            <span>or you can </span>
                            <button
                                type="button"
                                className="cursor-pointer text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                onClick={() => toggleRecoveryMode()}
                            >
                                {authConfigContent.toggleText}
                            </button>
                        </div>
                    </>
                </Form>
            </div>
        </AuthLayout>
    );
}
