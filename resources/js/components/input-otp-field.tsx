'use client';
import { useField } from '@wandry/inertia-form';
import { OTPInput } from 'input-otp';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';

export type InputOtpProps = Omit<
    React.ComponentProps<typeof OTPInput>,
    'render'
>;

type ResendFn = () => void;

export type ResendProps = {
    onResend?: ResendFn;
    didntReceivePlaceholder?: string;
    resendButtonPlaceholder?: string;
    resendPlaceholder?: string;
    resendTimeoutMs?: number;
};

export type InputOtpFieldProps = {
    name: string;
    label?: string;
    description?: string;
    length?: number;
} & ResendProps;

const hasResendLogic = (onResend?: () => void): onResend is ResendFn => {
    return onResend !== null && onResend !== undefined;
};

const InputOtpField: React.FC<InputOtpFieldProps> = ({
    name,
    label,
    description,
    onResend,
    resendPlaceholder,
    resendTimeoutMs,
    resendButtonPlaceholder,
    didntReceivePlaceholder,
    length = 6,
    ...inputOtpProps
}) => {
    const field = useField(name, { defaultValue: '' });

    return (
        <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <InputOTP
                {...inputOtpProps}
                maxLength={length}
                value={field.value}
                onChange={field.onChange}
            >
                <InputOTPGroup>
                    {Array.from({ length }).map((_, index) => (
                        <InputOTPSlot index={index} key={name + index} />
                    ))}
                </InputOTPGroup>
            </InputOTP>
            <FieldDescription>
                {hasResendLogic(onResend) ? (
                    <Resend
                        onResend={onResend}
                        resendPlaceholder={resendPlaceholder}
                        didntReceivePlaceholder={didntReceivePlaceholder}
                        resendButtonPlaceholder={resendButtonPlaceholder}
                        resendTimeoutMs={resendTimeoutMs}
                    />
                ) : (
                    description
                )}
            </FieldDescription>
            <FieldError>{field.error}</FieldError>
        </Field>
    );
};

const Resend: React.FC<ResendProps> = ({
    onResend,
    didntReceivePlaceholder = "Didn't receive the code?",
    resendButtonPlaceholder = 'Resend',
    resendPlaceholder = 'Resend code in',
    resendTimeoutMs = 60,
}) => {
    const [countdown, setCountdown] = React.useState(resendTimeoutMs);
    const [canResend, setCanResend] = React.useState(false);

    const handleResend = () => {
        setCountdown(60);
        setCanResend(false);

        onResend?.();
    };

    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
        setCanResend(true);
    }, [countdown]);

    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
                {canResend
                    ? didntReceivePlaceholder
                    : `${resendPlaceholder} ${countdown}s`}
            </span>
            <Button
                className="h-auto p-0"
                disabled={!canResend}
                onClick={handleResend}
                size="sm"
                variant="link"
            >
                {resendButtonPlaceholder}
            </Button>
        </div>
    );
};

export default InputOtpField;
