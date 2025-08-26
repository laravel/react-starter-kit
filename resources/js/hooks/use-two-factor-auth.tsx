import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor';
import { type TwoFactorSecretKey, type TwoFactorSetupData } from '@/types';
import { useCallback, useMemo, useState } from 'react';

const fetchJson = async <T,>(url: string): Promise<T> => {
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

    const hasSetupData = useMemo<boolean>(
        () => qrCodeSvg !== null && manualSetupKey !== null,
        [qrCodeSvg, manualSetupKey]
    );

    const fetchQrCode = async (): Promise<void> => {
        const { svg } = await fetchJson<TwoFactorSetupData>(qrCode.url());
        setQrCodeSvg(svg);
    };

    const fetchSetupKey = async (): Promise<void> => {
        const { secretKey: key } = await fetchJson<TwoFactorSecretKey>(secretKey.url());
        setManualSetupKey(key);
    };

    const clearSetupData = useCallback((): void => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
    }, []);

    const fetchRecoveryCodes = async (): Promise<void> => {
        try {
            const codes = await fetchJson<string[]>(recoveryCodes.url());
            setRecoveryCodesList(codes);
        } catch (error) {
            console.error('Failed to fetch recovery codes:', error);
            setRecoveryCodesList([]);
        }
    };

    const fetchSetupData = useCallback(async (): Promise<void> => {
        try {
            await Promise.all([fetchQrCode(), fetchSetupKey()]);
        } catch (error) {
            console.error('Failed to fetch setup data:', error);
            setQrCodeSvg(null);
            setManualSetupKey(null);
        }
    }, []);

    return {
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        hasSetupData,
        clearSetupData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    };
};
