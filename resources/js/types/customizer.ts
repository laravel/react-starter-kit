import { ReactNode } from 'react';

// project-imports
import { ThemeDirection, ThemeMode } from '@/config';

export interface ColorOption {
  id: string;
  img?: string;
  label?: string;
}

export interface CustomThemeTypes {
  value: boolean;
  tooltip: string;
  image?: string;
  icon?: ReactNode;
  label?: string;
}

export interface ThemeLayoutTypes {
  value: ThemeDirection;
  tooltip: string;
  image: string;
  dir: string;
}
export interface ThemeModeTypes {
  value: ThemeMode;
  tooltip: string;
  icon: ReactNode;
}

export interface IconItem {
  id: string;
  iconClass: string;
}
