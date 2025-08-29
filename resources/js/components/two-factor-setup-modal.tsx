import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useTwoFactorAuthContext } from '@/hooks/use-two-factor-auth';
import { confirm } from '@/routes/two-factor';
import { Form } from '@inertiajs/react';
import { useClipboard } from '@reactuses/core';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Check, Copy, Loader2, ScanLine } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface TwoFactorSetupModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
}

export default function TwoFactorSetupModal({ isOpen, onOpenChange, requiresConfirmation, twoFactorEnabled }: TwoFactorSetupModalProps) {
    const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData } = useTwoFactorAuthContext();
    const [copiedText, copy] = useClipboard();

    const [showVerificationStep, setShowVerificationStep] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');
    const codeValue = useMemo(() => code, [code]);

    const pinInputContainerRef = useRef<HTMLDivElement>(null);

    const modalConfig = useMemo<{ title: string; description: string; buttonText: string }>(() => {
        if (twoFactorEnabled) {
            return {
                title: 'Two-Factor Authentication Enabled',
                description: 'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
                buttonText: 'Close',
            };
        }

        if (showVerificationStep) {
            return {
                title: 'Verify Authentication Code',
                description: 'Enter the 6-digit code from your authenticator app',
                buttonText: 'Continue',
            };
        }

        return {
            title: 'Enable Two-Factor Authentication',
            description: 'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
            buttonText: 'Continue',
        };
    }, [twoFactorEnabled, showVerificationStep]);

    const handleModalNextStep = () => {
        if (requiresConfirmation) {
            setShowVerificationStep(true);
            setTimeout(() => {
                pinInputContainerRef.current?.querySelector('input')?.focus();
            }, 0);
            return;
        }
        clearSetupData();
        onOpenChange(false);
    };

    const resetModalState = useCallback(() => {
        if (twoFactorEnabled) {
            clearSetupData();
        }
        setShowVerificationStep(false);
        setCode('');
    }, [twoFactorEnabled, clearSetupData]);

    useEffect(() => {
        if (!isOpen) {
            resetModalState();
            return;
        }

        if (!qrCodeSvg) {
            fetchSetupData().then();
        }
    }, [isOpen, qrCodeSvg, fetchSetupData, resetModalState]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex items-center justify-center">
                    <div className="mb-3 w-auto rounded-full border border-border bg-card p-0.5 shadow-sm">
                        <div className="relative overflow-hidden rounded-full border border-border bg-muted p-2.5">
                            <div className="absolute inset-0 grid grid-cols-5 opacity-50">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <div key={`col-${i + 1}`} className="border-r border-border last:border-r-0" />
                                ))}
                            </div>
                            <div className="absolute inset-0 grid grid-rows-5 opacity-50">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <div key={`row-${i + 1}`} className="border-b border-border last:border-b-0" />
                                ))}
                            </div>
                            <ScanLine className="relative z-20 size-6 text-foreground" />
                        </div>
                    </div>
                    <DialogTitle>{modalConfig.title}</DialogTitle>
                    <DialogDescription className="text-center">{modalConfig.description}</DialogDescription>
                </DialogHeader>

                <div className="relative flex w-auto flex-col items-center justify-center space-y-5">
                    {!showVerificationStep ? (
                        <>
                            <div className="relative mx-auto flex max-w-md items-center overflow-hidden">
                                <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-border">
                                    {!qrCodeSvg ? (
                                        <div className="absolute inset-0 z-10 flex aspect-square h-auto w-full animate-pulse items-center justify-center bg-background">
                                            <Loader2 className="size-6 animate-spin" />
                                        </div>
                                    ) : (
                                        <div className="relative z-10 overflow-hidden border p-5">
                                            <div
                                                className="flex aspect-square size-full items-center justify-center"
                                                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full items-center space-x-5">
                                <Button className="w-full" onClick={handleModalNextStep}>
                                    {modalConfig.buttonText}
                                </Button>
                            </div>

                            <div className="relative flex w-full items-center justify-center">
                                <div className="absolute inset-0 top-1/2 h-px w-full bg-border" />
                                <span className="relative bg-card px-2 py-1">or, enter the code manually</span>
                            </div>

                            <div className="flex w-full items-center justify-center space-x-2">
                                <div className="flex w-full items-stretch overflow-hidden rounded-xl border border-border">
                                    {!manualSetupKey ? (
                                        <div className="flex h-full w-full items-center justify-center bg-muted p-3">
                                            <Loader2 className="size-4 animate-spin" />
                                        </div>
                                    ) : (
                                        <>
                                            <input
                                                type="text"
                                                readOnly
                                                value={manualSetupKey}
                                                className="h-full w-full bg-background p-3 text-foreground outline-none"
                                            />
                                            <button
                                                onClick={() => copy(manualSetupKey)}
                                                className="relative block h-auto border-l border-border px-3 hover:bg-muted"
                                            >
                                                {copiedText === manualSetupKey ? <Check className="w-4 text-green-500" /> : <Copy className="w-4" />}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <Form {...confirm.form()} onFinish={() => setCode('')} onSuccess={() => onOpenChange(false)} resetOnError>
                            {({ processing, errors }: { processing: boolean; errors?: { confirmTwoFactorAuthentication?: { code?: string } } }) => (
                                <>
                                    <input type="hidden" name="code" value={codeValue} />
                                    <div ref={pinInputContainerRef} className="relative w-full space-y-3">
                                        <div className="flex w-full flex-col items-center justify-center space-y-3 py-2">
                                            <InputOTP
                                                maxLength={6}
                                                value={codeValue}
                                                onChange={setCode}
                                                disabled={processing}
                                                pattern={REGEXP_ONLY_DIGITS}
                                            >
                                                <InputOTPGroup>
                                                    {Array.from({ length: 6 }, (_, index) => (
                                                        <InputOTPSlot key={index} index={index} />
                                                    ))}
                                                </InputOTPGroup>
                                            </InputOTP>
                                            <InputError message={errors?.confirmTwoFactorAuthentication?.code} />
                                        </div>

                                        <div className="flex w-full items-center space-x-5">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-auto flex-1"
                                                onClick={() => setShowVerificationStep(false)}
                                                disabled={processing}
                                            >
                                                Back
                                            </Button>
                                            <Button type="submit" className="w-auto flex-1" disabled={processing || codeValue.length < 6}>
                                                {processing ? 'Confirming...' : 'Confirm'}
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
