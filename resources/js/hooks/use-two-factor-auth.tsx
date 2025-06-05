import { useState, useEffect } from 'react';

interface EnableResponse {
  qrCode: string;
  secret: string;
}

interface ConfirmResponse {
  status: string;
  recovery_codes?: string[];
  message?: string;
}

interface RecoveryCodesResponse {
  recovery_codes: string[];
}

export function useTwoFactorAuth(initialConfirmed: boolean, initialRecoveryCodes: string[]) {
  const csrfToken =
    document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-CSRF-TOKEN': csrfToken,
    'X-Requested-With': 'XMLHttpRequest',
  };

  const [confirmed, setConfirmed] = useState(initialConfirmed);
  const [qrCodeSvg, setQrCodeSvg] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [recoveryCodesList, setRecoveryCodesList] = useState(initialRecoveryCodes);
  const [copied, setCopied] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [verifyStep, setVerifyStep] = useState(false);
  const [showingRecoveryCodes, setShowingRecoveryCodes] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Automatically enable 2FA when modal opens and QR is not yet fetched
  useEffect(() => {
    if (showModal && !verifyStep && !qrCodeSvg) {
      enable();
    }
  }, [showModal, verifyStep, qrCodeSvg]);

  const enable = async () => {
    try {
      const response = await fetch(route('two-factor.enable'), {
        method: 'POST',
        headers,
      });

      if (response.ok) {
        const data: EnableResponse = await response.json();
        setQrCodeSvg(data.qrCode);
        setSecretKey(data.secret);
      } else {
        console.error('Error enabling 2FA:', response.statusText);
      }
    } catch (error) {
      console.error('Error enabling 2FA:', error);
    }
  };

  const confirm = async () => {
    if (!passcode || passcode.length !== 6) return;

    const formattedCode = passcode.replace(/\s+/g, '').trim();

    try {
      const response = await fetch(route('two-factor.confirm'), {
        method: 'POST',
        headers,
        body: JSON.stringify({ code: formattedCode }),
      });

      if (response.ok) {
        const responseData: ConfirmResponse = await response.json();
        if (responseData.recovery_codes) {
          setRecoveryCodesList(responseData.recovery_codes);
        }

        setConfirmed(true);
        setVerifyStep(false);
        setShowModal(false);
        setShowingRecoveryCodes(true);
        setPasscode('');
        setError('');
      } else {
        const errorData = await response.json();
        console.error('Verification error:', errorData.message);
        setError(errorData.message || 'Invalid verification code');
        setPasscode('');
      }
    } catch (error) {
      console.error('Error confirming 2FA:', error);
      setError('An error occurred while confirming 2FA');
    }
  };

  const regenerateRecoveryCodes = async () => {
    try {
      const response = await fetch(route('two-factor.regenerate-recovery-codes'), {
        method: 'POST',
        headers,
      });

      if (response.ok) {
        const data: RecoveryCodesResponse = await response.json();
        if (data.recovery_codes) {
          setRecoveryCodesList(data.recovery_codes);
        }
      } else {
        console.error('Error regenerating codes:', response.statusText);
      }
    } catch (error) {
      console.error('Error regenerating codes:', error);
    }
  };

  const disable = async () => {
    try {
      const response = await fetch(route('two-factor.disable'), { method: 'DELETE', headers });

      if (response.ok) {
        setConfirmed(false);
        setShowingRecoveryCodes(false);
        setRecoveryCodesList([]);
        setQrCodeSvg('');
        setSecretKey('');
      } else {
        console.error('Error disabling 2FA:', response.statusText);
      }
    } catch (error) {
      console.error('Error disabling 2FA:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return {
    confirmed,
    qrCodeSvg,
    secretKey,
    recoveryCodesList,
    copied,
    passcode,
    setPasscode,
    error,
    setError,
    verifyStep,
    setVerifyStep,
    showingRecoveryCodes,
    setShowingRecoveryCodes,
    showModal,
    setShowModal,
    enable,
    confirm,
    regenerateRecoveryCodes,
    disable,
    copyToClipboard,
  };
}