import { ReactNode } from 'react';

// ==============================|| MENU TYPES ||============================== //

export type NavItemType = {
  badge?: number;
  breadcrumbs?: boolean;
  children?: NavItemType[];
  icon?: string;
  id?: string;
  link?: string;
  target?: boolean;
  title?: ReactNode | string;
  type?: string;
  url?: string | undefined;
  layout?: string;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type MenuProps = {
  /**
   * Indicate if dashboard layout menu open or not
   */
  isDashboardDrawerOpened: boolean;

  /**
   * Indicate if component layout menu open or not
   */
  isComponentDrawerOpened: boolean;
};