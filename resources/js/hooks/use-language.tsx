import React, { useCallback, useEffect, useState } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextValue {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}
export function useDirectionEffect() {
    const { language } = useLanguage(); // make sure `language` is 'en' or 'ar'

    useEffect(() => {
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    }, [language]);
}
const LanguageContext = React.createContext<LanguageContextValue | null>(null);

const getStoredLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';

    const stored = localStorage.getItem('language') as Language | null;
    if (stored === 'en' || stored === 'ar') {
        return stored;
    }

    const cookie = document.cookie
        .split(';')
        .find(c => c.trim().startsWith('language='));
    if (cookie) {
        const value = cookie.split('=')[1] as Language;
        if (value === 'en' || value === 'ar') {
            return value;
        }
    }

    const htmlLang = document.documentElement.lang as Language;
    if (htmlLang === 'en' || htmlLang === 'ar') {
        return htmlLang;
    }

    return 'en';
};

const applyLanguage = (lang: Language) => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const initial = getStoredLanguage();
        setLanguageState(initial);
        applyLanguage(initial);
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang);
        }
        if (typeof document !== 'undefined') {
            document.cookie = `language=${lang};path=/;max-age=31536000;SameSite=Lax`;
        }
    }, []);

    useEffect(() => {
        applyLanguage(language);
    }, [language]);

    const toggleLanguage = useCallback(() => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    }, [language, setLanguage]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = React.useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
}
