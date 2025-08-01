// utils/setResolvedTheme.ts
import { useEffect } from 'react';
import getWindowScheme from '@/utils/getWindowScheme';
import { ThemeMode } from '@/config';

export function getResolvedTheme(mode: ThemeMode): ThemeMode {
  if (mode === ThemeMode.AUTO) {
    return getWindowScheme() ? ThemeMode.DARK : ThemeMode.LIGHT;
  }
  return mode;
}

/**
 * Direct function usage — for non-React files or one-time use
 */
export function setResolvedTheme(mode: ThemeMode): ThemeMode {
  let resolvedTheme: ThemeMode;

  if (mode === ThemeMode.AUTO) {
    resolvedTheme = getWindowScheme() ? ThemeMode.DARK : ThemeMode.LIGHT;
  } else {
    resolvedTheme = mode;
  }

  document.body.setAttribute('data-pc-theme', resolvedTheme);
  return resolvedTheme;
}

/**
 * React hook usage — automatically applies on mode change
 */
export function useResolvedTheme(mode: ThemeMode) {
  useEffect(() => {
    setResolvedTheme(mode);
  }, [mode]);
}
