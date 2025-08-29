import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTwoFactorAuthContext } from '@/hooks/use-two-factor-auth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';
import { Form } from '@inertiajs/react';
import { Eye, EyeOff, LockKeyhole, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TwoFactorRecoveryCodes() {
    const { recoveryCodesList, fetchRecoveryCodes } = useTwoFactorAuthContext();
    const [isRecoveryCodesVisible, setIsRecoveryCodesVisible] = useState<boolean>(false);
    const recoveryCodeSectionRef = useRef<HTMLDivElement | null>(null);

    const toggleRecoveryCodesVisibility = async () => {
        if (!isRecoveryCodesVisible && !recoveryCodesList.length) {
            await fetchRecoveryCodes();
        }

        setIsRecoveryCodesVisible(!isRecoveryCodesVisible);

        if (!isRecoveryCodesVisible) {
            setTimeout(() => {
                recoveryCodeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 0);
        }
    };

    useEffect(() => {
        if (!recoveryCodesList.length) {
            fetchRecoveryCodes();
        }
    }, [recoveryCodesList.length, fetchRecoveryCodes]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-3">
                    <LockKeyhole className="size-4" />
                    2FA Recovery Codes
                </CardTitle>
                <CardDescription>
                    Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between">
                    <Button onClick={toggleRecoveryCodesVisibility} className="w-fit">
                        {isRecoveryCodesVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        {isRecoveryCodesVisible ? 'Hide' : 'View'} Recovery Codes
                    </Button>

                    {isRecoveryCodesVisible && (
                        <Form {...regenerateRecoveryCodes.form()} options={{ preserveScroll: true }} onSuccess={fetchRecoveryCodes}>
                            {({ processing }) => (
                                <Button variant="secondary" type="submit" disabled={processing}>
                                    <RefreshCw className={`mr-2 size-4 ${processing ? 'animate-spin' : ''}`} />
                                    {processing ? 'Regenerating...' : 'Regenerate Codes'}
                                </Button>
                            )}
                        </Form>
                    )}
                </div>
                <div
                    className={`relative overflow-hidden transition-all duration-300 ${
                        isRecoveryCodesVisible ? 'h-auto opacity-100' : 'h-0 opacity-0'
                    }`}
                >
                    <div className="mt-3 space-y-3">
                        <div ref={recoveryCodeSectionRef} className="grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm">
                            {!recoveryCodesList.length ? (
                                <div className="space-y-2">
                                    {Array.from({ length: 8 }, (_, n) => (
                                        <div key={n} className="h-4 animate-pulse rounded bg-muted-foreground/20" />
                                    ))}
                                </div>
                            ) : (
                                recoveryCodesList.map((code, index) => <div key={index}>{code}</div>)
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground select-none">
                            Each can be used once to access your account and will be removed after use. If you need more, click{' '}
                            <span className="font-bold">Regenerate Codes</span> above.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
