import { useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';

export function useDirectionEffect() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);
}
