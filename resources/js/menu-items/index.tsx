// project-imports
import application from './application';
import adminPanel from './admin-panel';
import chartsMaps from './charts-maps';
import formComponents from './forms';
import other from './other';
import pages from './pages';
import uiComponents from './ui-components';
import tableRoutes from './tables';
import navigation from './navigation';

// types
import { NavItemType } from '@/types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [navigation, adminPanel, uiComponents, formComponents, tableRoutes, chartsMaps, application, pages, other]
};

export default menuItems;
