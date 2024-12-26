import { useState, useEffect } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>('system');

  const prefersDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (mode: Appearance) => {
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
  };

  const updateAppearance = (mode: Appearance) => {
    setAppearance(mode);
    localStorage.setItem('appearance', mode);
    applyTheme(mode);
  };

  useEffect(() => {
    const savedAppearance = localStorage.getItem('appearance') as Appearance;
    updateAppearance(savedAppearance || 'system');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (appearance === 'system') applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { appearance, updateAppearance };
}