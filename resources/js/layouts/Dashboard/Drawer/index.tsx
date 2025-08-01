import { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
// react-bootstrap
import Image from 'react-bootstrap/Image';

// third-party

// project-imports
import DrawerContent from './DrawerContent';
import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { MenuOrientation } from '@/config';
import useConfig from '@/hooks/useConfig';

// assets
import logo from '@assets/images/logo-white.svg';
import DarkLogo from '@assets/images/logo-dark.svg';

// types
import { NavItemType } from '@/types/menu';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

export default function MainDrawer() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const [selectedItems, setSelectedItems] = useState<NavItemType | undefined>();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const { menuOrientation, sidebarTheme } = useConfig();
  const location = usePage();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current?.contains(event.target as Node)) {
        handlerDrawerOpen(false);
      }
    };
    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const isLargeScreen = window.innerWidth > 1024;

  useEffect(() => {
    const removeClasses = ['layout-2', 'layout-3', 'preset-1', 'preset-brand-1'];
    const resetAttributes = () => {
      document.body.classList.remove(...removeClasses);
    };

    resetAttributes();

    const pathname = new URL(location.url, window.location.origin).pathname;

    if (!isLargeScreen) {
      document.body.setAttribute('data-pc-layout', 'vertical');
    }

    if (pathname === '/layouts/layout-2') {
      document.body.removeAttribute('data-pc-layout');
      document.body.setAttribute('data-pc-preset', 'preset-1');
      document.body.classList.add('layout-2', 'preset-1');
    }

    if (pathname === '/layouts/layout-3') {
      document.body.removeAttribute('data-pc-layout');
      document.body.setAttribute('data-pc-preset', 'preset-1');
      document.body.classList.add('layout-3', 'preset-brand-1');
    }

    // always run layout logic
    switch (menuOrientation) {
      case MenuOrientation.TAB:
      case MenuOrientation.VERTICAL:
        document.body.setAttribute('data-pc-layout', menuOrientation.toLowerCase());
        break;
      case MenuOrientation.LAYOUT2:
        document.body.setAttribute('data-pc-layout', MenuOrientation.VERTICAL);
        document.body.setAttribute('data-pc-preset', 'preset-1');
        document.body.classList.add('layout-2', 'preset-1');
        break;
      case MenuOrientation.LAYOUT3:
        document.body.setAttribute('data-pc-layout', MenuOrientation.VERTICAL);
        document.body.setAttribute('data-pc-preset', 'preset-1');
        document.body.classList.add('layout-3', 'preset-brand-1');
        break;
      default:
        break;
    }
  }, [menuOrientation, isLargeScreen, new URL(location.url, window.location.origin).pathname]);

  return (
    <nav id="pc-sidebar" className={`pc-sidebar ${drawerOpen ? 'pc-sidebar-hide mob-sidebar-active' : ''} `}>
      <div className="navbar-wrapper">
        <div className="m-header">
          <a className="b-brand text-primary">
            <Image src={sidebarTheme === true ? DarkLogo : logo} fluid className="logo logo-lg" alt="logo" />
          </a>
        </div>

        <div className={menuOrientation === MenuOrientation.TAB ? 'tab-container' : 'navbar-content'}>
          <DrawerContent selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        </div>
      </div>
      {drawerOpen && isMobile && <div className="pc-menu-overlay" ref={overlayRef} />}
    </nav>
  );
}
