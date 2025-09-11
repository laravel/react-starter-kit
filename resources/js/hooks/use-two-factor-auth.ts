import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor';
import { useCallback, useMemo, useState } from 'react';

interface TwoFactorSetupData {
    svg: string;
    url: string;
}

interface TwoFactorSecretKey {
    secretKey: string;
}

export const OTP_MAX_LENGTH = 6;

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    return response.json();
};

export const useTwoFactorAuth = () => {
    const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
    const [manualSetupKey, setManualSetupKey] = useState<string | null>(null);
    const [recoveryCodesList, setRecoveryCodesList] = useState<string[]>([]);
    const [errors, setErrors] = useState<{
        qrCode?: string;
        setupKey?: string;
        recoveryCodes?: string;
    }>({});

    const hasSetupData = useMemo<boolean>(() => qrCodeSvg !== null && manualSetupKey !== null, [qrCodeSvg, manualSetupKey]);

    const fetchQrCode = useCallback(async (): Promise<void> => {
        try {
            const { svg } = await fetchJson<TwoFactorSetupData>(qrCode.url());

            setQrCodeSvg(svg);
        } catch {
            setErrors((prev) => ({ ...prev, qrCode: 'Failed to fetch QR code' }));
            setQrCodeSvg(null);
        }
    }, []);

    const fetchSetupKey = useCallback(async (): Promise<void> => {
        try {
            const { secretKey: key } = await fetchJson<TwoFactorSecretKey>(secretKey.url());

            setManualSetupKey(key);
        } catch {
            setErrors((prev) => ({ ...prev, setupKey: 'Failed to fetch a setup key' }));
            setManualSetupKey(null);
        }
    }, []);

    const clearErrors = useCallback((): void => {
        setErrors({});
    }, []);

    const clearSetupData = useCallback((): void => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
        clearErrors();
    }, [clearErrors]);

    const fetchRecoveryCodes = useCallback(async (): Promise<void> => {
        try {
            const codes = await fetchJson<string[]>(recoveryCodes.url());

            setRecoveryCodesList(codes);
        } catch {
            setErrors((prev) => ({ ...prev, recoveryCodes: 'Failed to fetch recovery codes' }));
            setRecoveryCodesList([]);
        }
    }, []);

    const fetchSetupData = useCallback(async (): Promise<void> => {
        try {
            await Promise.all([fetchQrCode(), fetchSetupKey()]);
        } catch {
            setQrCodeSvg(null);
            setManualSetupKey(null);
        }
    }, [fetchQrCode, fetchSetupKey]);

    return {
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        hasSetupData,
        errors,
        clearErrors,
        clearSetupData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    };
};
