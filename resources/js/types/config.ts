import { MenuOrientation, ThemeDirection, ThemeMode } from '@/config';

export type FontFamily = "'Public Sans', sans-serif";
export type PresetColor = 'default' | 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5' | 'theme6' | 'theme7' | 'theme8';
export type I18n = 'en' | 'fr' | 'ro' | 'zh';

// ==============================|| CONFIG TYPES ||============================== //

export type DefaultConfigProps = {
  fontFamily: FontFamily;
  /**
   * The props used for display menu-items with multi-language.
   * We provide static below languages according to 'react-intl' options - https://www.npmjs.com/package/react-intl
   * 'en' (default)
   * 'fr'
   * 'ro'
   * 'zh'
   */
  i18n: I18n;

  /**
   * the props used for menu orientation (diffrent theme layout).
   * we provide static below options -
   * 'vertical' (default) - MenuOrientation.VERTICAL
   * 'horizontal' - MenuOrientation.HORIZONTAL
   */
  menuOrientation: MenuOrientation;

  /**
   * the props used for theme container.
   * the container centers your content horizontally. It's the most basic layout element.
   * default - true which show container
   * false - will show fluid
   */
  container: boolean;

  /**
   * the props used for default theme palette mode
   * explore the default theme
   * below theme options -
   * 'light' (default)
   * 'dark'
   */
  mode: ThemeMode;

  /**
   * the props used for theme primary color variants
   * we provide static below options thoe s are already defaine in resources/themes/theme -
   * 'default'
   * 'theme1'
   * 'theme2'
   * 'theme3'
   * 'theme4'
   * 'theme5'
   * 'theme6'
   * 'theme7'
   * 'theme8'
   */
  presetColor: PresetColor;

  /**
   * the props used for default theme direction
   * explore the default theme
   * below theme options -
   * 'ltr' (default) - ThemeDirection.LTR
   * 'rtl' - ThemeDirection.RTL
   */
  themeDirection: ThemeDirection;
  caption: boolean;
  sidebarTheme: boolean;
  customColor: string;
  headerColor: string;
  navbarColor: string;
  logoColor: string;
  navbarCaptionColor: string;
  navbarImg: string;
  menuIcon: string;
  menuLinkIcon: string;
};

export type CustomizationProps = {
  i18n: I18n;
  menuOrientation: MenuOrientation;
  themeDirection: ThemeDirection;
  container: boolean;
  mode: ThemeMode;
  caption: boolean;
  sidebarTheme: boolean;
  customColor: string;
  headerColor: string;
  navbarColor: string;
  logoColor: string;
  navbarCaptionColor: string;
  navbarImg: string;
  menuIcon: string;
  menuLinkIcon: string;
  onChangeLocalization: (lang: I18n) => void;
  onChangeDirection: (direction: ThemeDirection) => void;
  onChangeMenuOrientation: (menuOrientation: MenuOrientation) => void;
  onChangeCaption: (caption: boolean) => void;
  onChangeSideTheme: (sidebarTheme: boolean) => void;
  onChangeMode: (mode: ThemeMode) => void;
  onChangeContainer: (container: boolean) => void;
  onChangeThemePreset: (key: string, value: string) => void;
  onChangeMenuIcon: (key: string, value: string) => void;
  onReset: () => void;
};
