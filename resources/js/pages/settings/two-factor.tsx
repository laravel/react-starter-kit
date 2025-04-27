import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Check, Copy, Eye, EyeOff, Loader, ScanLine, LockKeyhole } from 'lucide-react';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import type { BreadcrumbItem } from '@/types';
import { ConfirmsPassword } from '@/components/confirms-password';

interface TwoFactorProps {
    confirmed: boolean;
    recoveryCodes: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Two-Factor Authentication',
        href: '/settings/two-factor'
    }
];

export default function TwoFactor({ confirmed: initialConfirmed, recoveryCodes }: TwoFactorProps) {
    const {
        confirmed,
        qrCodeSvg,
        secretKey,
        recoveryCodesList,
        copied,
        passcode,
        setPasscode,
        error,
        verifyStep,
        setVerifyStep,
        showingRecoveryCodes,
        setShowingRecoveryCodes,
        showModal,
        setShowModal,
        confirm,
        regenerateRecoveryCodes,
        disable,
        copyToClipboard
    } = useTwoFactorAuth(initialConfirmed, recoveryCodes);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Two-Factor Authentication" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Two-Factor Authentication"
                        description="Add additional security to your account using two-factor authentication."
                    />

                    {!confirmed && (
                        <div className="flex flex-col items-start justify-start space-y-5">
                            <Badge
                                variant="outline"
                                className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50"
                            >
                                Disabled
                            </Badge>
                            <p className="-translate-y-1 text-stone-500 dark:text-stone-400">
                                When you enable 2FA, you'll be prompted for a secure code during login, which can be
                                retrieved from your phone's Google Authenticator app.
                            </p>

                            <Dialog open={showModal} onOpenChange={setShowModal}>
                                <DialogTrigger asChild>
                                    <Button onClick={() => setShowModal(true)}>Enable</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader className="flex items-center justify-center">
                                        <div className="p-0.5 w-auto rounded-full border mb-3 border-stone-100 dark:border-stone-600 bg-white dark:bg-stone-800 shadow-sm">
                                            <div className="p-2.5 rounded-full border border-stone-200 dark:border-stone-600 overflow-hidden bg-stone-100 dark:bg-stone-200 relative">
                                                <div className="flex items-stretch absolute inset-0 w-full h-full divide-x [&>div]:flex-1 divide-stone-200 dark:divide-stone-300 justify-around opacity-50">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i}></div>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col items-stretch absolute w-full h-full divide-y [&>div]:flex-1 inset-0 divide-stone-200 dark:divide-stone-300 justify-around opacity-50">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i}></div>
                                                    ))}
                                                </div>
                                                <ScanLine className="size-6 relative z-20 dark:text-black" />
                                            </div>
                                        </div>
                                        <DialogTitle>
                                            {!verifyStep ? 'Turn on 2-step Verification' : 'Verify Authentication Code'}
                                        </DialogTitle>
                                        <DialogDescription className="text-center">
                                            {!verifyStep
                                                ? 'Open your authenticator app and choose Scan QR code'
                                                : 'Enter the 6-digit code from your authenticator app'}
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="relative w-full items-center justify-center flex flex-col space-y-5">
                                        {!verifyStep ? (
                                            <>
                                                <div className="relative max-w-md mx-auto overflow-hidden flex items-center p-8 pt-0">
                                                    <div className="border border-stone-200 dark:border-stone-700 rounded-lg relative overflow-hidden w-64 aspect-square mx-auto">
                                                        {!qrCodeSvg ? (
                                                            <div className="bg-white dark:bg-stone-700 animate-pulse flex items-center justify-center absolute inset-0 w-full h-auto aspect-square z-10">
                                                                <Loader className="size-6 animate-spin" />
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={`data:image/svg+xml;base64,${qrCodeSvg}`}
                                                                style={{ width: '100%', height: 'auto' }}
                                                                className="relative z-10"
                                                                alt="QR Code"
                                                            />
                                                        )}
                                                    </div>
                                                    {qrCodeSvg && (
                                                        <div className="h-1/2 z-20 w-full border-t border-blue-500 absolute bottom-0 left-0 -translate-y-4">
                                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-500 to-transparent opacity-20"></div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center space-x-5 w-full">
                                                    <Button className="w-full" onClick={() => setVerifyStep(true)}>
                                                        Continue
                                                    </Button>
                                                </div>

                                                <div className="flex items-center relative w-full justify-center">
                                                    <div className="w-full absolute inset-0 top-1/2 bg-stone-200 dark:bg-stone-600 h-px"></div>
                                                    <span className="px-2 py-1 bg-white dark:bg-stone-800 relative">
                                                        or, enter the code manually
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-center w-full space-x-2">
                                                    <div className="w-full rounded-xl flex items-stretch border dark:border-stone-700 overflow-hidden">
                                                        {!secretKey ? (
                                                            <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-stone-700 p-3">
                                                                <Loader className="size-4 animate-spin" />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    readOnly
                                                                    value={secretKey}
                                                                    className="w-full h-full p-3 text-black dark:text-stone-100 bg-white dark:bg-stone-800"
                                                                />
                                                                <button
                                                                    onClick={() => copyToClipboard(secretKey)}
                                                                    className="block relative border-l border-stone-200 dark:border-stone-600 px-3 hover:bg-stone-100 dark:hover:bg-stone-600 h-auto"
                                                                >
                                                                    {!copied ? (
                                                                        <Copy className="w-4" />
                                                                    ) : (
                                                                        <Check className="w-4 text-green-500" />
                                                                    )}
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <InputOTP maxLength={6} value={passcode} onChange={setPasscode} autoFocus>
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
                                                {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
                                                <div className="flex items-center space-x-5 w-full">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() => setVerifyStep(false)}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        className="w-full"
                                                        onClick={confirm}
                                                        disabled={!passcode || passcode.length < 6}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}

                    {confirmed && (
                        <div className="flex flex-col space-y-5">
                            <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                            >
                                Enabled
                            </Badge>
                            <p className="text-stone-500 dark:text-stone-400">
                                With two factor authentication enabled, you'll be prompted for a secure, random
                                token during login, which you can retrieve from your Google Authenticator app.
                            </p>

                            <div>
                                <div className="flex items-start p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-t-xl">
                                    <LockKeyhole className="size-5 mr-2 text-stone-500" />
                                    <div className="space-y-1">
                                        <h3 className="font-medium">2FA Recovery Codes</h3>
                                        <p className="text-sm text-stone-500 dark:text-stone-400">
                                            Recovery codes let you regain access if you lose your 2FA device. Store them
                                            in a secure password manager.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-stone-100 dark:bg-stone-800 rounded-b-xl border-t-0 border border-stone-200 dark:border-stone-700 text-sm">
                                    <div
                                        onClick={() => setShowingRecoveryCodes(!showingRecoveryCodes)}
                                        className="h-10 group cursor-pointer flex items-center select-none justify-between px-5 text-xs"
                                    >
                                        <div
                                            className={`relative ${!showingRecoveryCodes ? 'opacity-40 hover:opacity-60' : 'opacity-60'
                                                }`}
                                        >
                                            {!showingRecoveryCodes ? (
                                                <span className="flex items-center space-x-1">
                                                    <Eye className="size-4" /> <span>View My Recovery Codes</span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center space-x-1">
                                                    <EyeOff className="size-4" /> <span>Hide Recovery Codes</span>
                                                </span>
                                            )}
                                        </div>

                                        {showingRecoveryCodes && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-stone-600"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    regenerateRecoveryCodes();
                                                }}
                                            >
                                                Regenerate Codes
                                            </Button>
                                        )}
                                    </div>

                                    <div
                                        className="relative overflow-hidden transition-all duration-300"
                                        style={{
                                            height: showingRecoveryCodes ? 'auto' : '0',
                                            opacity: showingRecoveryCodes ? 1 : 0
                                        }}
                                    >
                                        <div className="grid max-w-xl gap-1 px-4 py-4 font-mono text-sm bg-stone-200 dark:bg-stone-900 dark:text-stone-100">
                                            {recoveryCodesList.map((code, index) => (
                                                <div key={index}>{code}</div>
                                            ))}
                                        </div>
                                        <p className="px-4 py-3 text-xs select-none text-stone-500 dark:text-stone-400">
                                            You have {recoveryCodesList.length} recovery codes left. Each can be used
                                            once to access your account and will be removed after use. If you need more,
                                            click <span className="font-bold">Regenerate Codes</span> above.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="inline relative">
                                <ConfirmsPassword
                                    onConfirm={disable}
                                >
                                    <Button variant="destructive">
                                        Disable 2FA
                                    </Button>
                                </ConfirmsPassword>
                            </div>
                        </div>
                    )}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}