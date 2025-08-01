import { DefaultConfigProps } from '@/types/config';

// ==============================|| THEME CONSTANT ||============================== //

export const APP_DEFAULT_PATH = '/dashboard/default';
export const DRAWER_WIDTH = 260;

export enum MenuOrientation {
  VERTICAL = 'vertical',
  TAB = 'tab',
  LAYOUT2 = 'layout 2',
  LAYOUT3 = 'layout 3'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}
export enum ThemeDirection {
  LTR = 'ltr',
  RTL = 'rtl'
}

// ==============================|| THEME CONFIG ||============================== //

const config: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  menuOrientation: MenuOrientation.VERTICAL,
  container: false,
  mode: ThemeMode.LIGHT,
  presetColor: 'default',
  caption: true,
  sidebarTheme: false,
  themeDirection: ThemeDirection.LTR,
  customColor: 'preset-1',
  headerColor: '',
  navbarColor: '',
  logoColor: '',
  navbarCaptionColor: '',
  navbarImg: '',
  menuIcon: 'preset-1',
  menuLinkIcon: 'preset-1'
};

export default config;
