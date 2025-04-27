import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

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
      const response = await axios.post(route('two-factor.enable'));

      const data: EnableResponse = response.data;
      setQrCodeSvg(data.qrCode);
        setSecretKey(data.secret);
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data;
        console.error('Verification error:', errorData.message);
        setError(errorData.message || 'Invalid verification code');
        setPasscode('');
      }
    }
  };

  const confirm = async () => {
    if (!passcode || passcode.length !== 6) return;

    const formattedCode = passcode.replace(/\s+/g, '').trim();

    try {
      const response = await axios.post(route('two-factor.confirm'), { code: formattedCode });

      const responseData: ConfirmResponse = response.data;
      if (responseData.recovery_codes) {
        setRecoveryCodesList(responseData.recovery_codes);
      }

      setConfirmed(true);
      setVerifyStep(false);
      setShowModal(false);
      setShowingRecoveryCodes(true);
      setPasscode('');
      setError('');

    } catch (error) {
      console.error('Error confirming 2FA:', error);
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data;
        console.error('Verification error:', errorData.message);
        setError(errorData.message || 'Invalid verification code');
        setPasscode('');
        return;
      }
      setError('An error occurred while confirming 2FA');
    }
  };

  const regenerateRecoveryCodes = async () => {
    try {
      const response = await axios.post(route('two-factor.regenerate-recovery-codes'));
      const data: RecoveryCodesResponse = await response.data;
      if (data.recovery_codes) {
        setRecoveryCodesList(data.recovery_codes);
      }
    } catch (error) {
      console.error('Error regenerating codes:', error);
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data;
        setError(errorData.message || 'Invalid verification code');
      }
    }
  };

  const disable = async () => {
    try {
      await axios.delete(route('two-factor.disable'));

      setConfirmed(false);
      setShowingRecoveryCodes(false);
      setRecoveryCodesList([]);
      setQrCodeSvg('');
      setSecretKey('');
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data;
        setError(errorData.message || 'Invalid verification code');
      }
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
