import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor';
import { type TwoFactorSecretKey, type TwoFactorSetupData } from '@/types';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

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

    const fetchQrCode = useCallback(async (): Promise<void> => {
        try {
            const { svg } = await fetchJson<TwoFactorSetupData>(qrCode.url());
            setQrCodeSvg(svg);
        } catch (error) {
            console.error('Failed to fetch QR code:', error);
            setQrCodeSvg(null);
        }
    }, []);

    const fetchSetupKey = useCallback(async (): Promise<void> => {
        try {
            const { secretKey: key } = await fetchJson<TwoFactorSecretKey>(secretKey.url());
            setManualSetupKey(key);
        } catch (error) {
            console.error('Failed to fetch setup key:', error);
            setManualSetupKey(null);
        }
    }, []);

    const clearSetupData = useCallback((): void => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
    }, []);

    const fetchRecoveryCodes = useCallback(async (): Promise<void> => {
        try {
            const codes = await fetchJson<string[]>(recoveryCodes.url());
            setRecoveryCodesList(codes);
        } catch (error) {
            console.error('Failed to fetch recovery codes:', error);
            setRecoveryCodesList([]);
        }
    }, []);

    const fetchSetupData = useCallback(async (): Promise<void> => {
        try {
            await Promise.all([fetchQrCode(), fetchSetupKey()]);
        } catch (error) {
            console.error('Failed to fetch setup data:', error);
            setQrCodeSvg(null);
            setManualSetupKey(null);
        }
    }, [fetchQrCode, fetchSetupKey]);

    return useMemo(() => ({
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        hasSetupData,
        clearSetupData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    }), [
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        hasSetupData,
        clearSetupData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    ]);
};

type TwoFactorAuthContextType = ReturnType<typeof useTwoFactorAuth>;

const TwoFactorAuthContext = createContext<TwoFactorAuthContextType | null>(null);

export const TwoFactorAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const twoFactorAuth = useTwoFactorAuth();
    return (
        <TwoFactorAuthContext.Provider value={twoFactorAuth}>
            {children}
        </TwoFactorAuthContext.Provider>
    );
};

export const useTwoFactorAuthContext = () => {
    const context = useContext(TwoFactorAuthContext);
    if (!context) {
        throw new Error('useTwoFactorAuthContext must be used within TwoFactorAuthProvider');
    }
    return context;
};
