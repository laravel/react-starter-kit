import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Link, usePage } from '@inertiajs/react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// third-party
import { FormattedMessage } from 'react-intl';

// project-imports
import NavItem from './NavItem';
import { useGetMenuMaster } from '@/api/menu';
import useConfig from '@/hooks/useConfig';
import { MenuOrientation, ThemeDirection } from '@/config';

// types
import { NavItemType } from '@/types/menu';

interface Props {
  menu: NavItemType;
  level: number;
  parentId: string;
  setSelectedItems: React.Dispatch<React.SetStateAction<NavItemType | undefined>>;
  selectedItems: NavItemType | undefined;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
  selectedLevel: number;
}

// ==============================|| NAVIGATION - COLLAPSE ||============================== //

export default function NavCollapse({ menu, level, parentId, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel }: Props) {
  const { menuMaster } = useGetMenuMaster();
  // const navigation = useNavigate();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);
  const { menuOrientation, themeDirection } = useConfig();
  const location = usePage();
  const currentPath = new URL(location.url, window.location.origin).pathname;

  const isMenuActive = (menu: NavItemType, currentPath: string): boolean => {
    if (menu.type === 'item') {
      return menu.url === currentPath;
    }
    if (menu.type === 'collapse' && Array.isArray(menu.children)) {
      return menu.children.some((child) => isMenuActive(child, currentPath));
    }
    return false;
  };

  const active = isMenuActive(menu, currentPath);

  const handleClick = (isRedirect: boolean) => {
    const isMobile = window.innerWidth <= 1024;
    setSelectedLevel(level);

    if (isMobile || !drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
      setSelectedItems(!selected ? menu : selectedItems);
      // if (menu.url && isRedirect) navigation(`${menu.url}`);
    }
  };

  useMemo(() => {
    if (selected === selectedItems?.id) {
      if (level === 1) {
        setOpen(true);
      }
    } else {
      if (level === selectedLevel) {
        setOpen(false);

        if (drawerOpen) {
          setSelected(null);
        }
      }
    }
  }, [selectedItems, level, selected, drawerOpen, selectedLevel]);

  const pathname = usePage();

  useEffect(() => {
    if (pathname.url === menu.url) {
      setSelected(menu.id);
    }
  }, [pathname, menu.id, menu.url]);

  const checkOpenForParent = useCallback(
    (child: NavItemType[], id: string) => {
      child.forEach((item: NavItemType) => {
        if (item.url === pathname.url) {
          setOpen(true);
          setSelected(id);
        }
      });
    },
    [pathname]
  );

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    if (menu.children) {
      menu.children.forEach((item: NavItemType) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id!);
        }

        if (item.link && !!matchPath({ path: item?.link, end: false }, pathname.url)) {
          setSelected(menu.id);
          setOpen(true);
        }

        if (item.url === pathname.url) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu.id, menu.children, checkOpenForParent]);

  useEffect(() => {
    if (menu.url === pathname.url) {
      setSelected(menu.id);
      setOpen(true);
    }
  }, [pathname, menu]);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <h6 key={item.id} color="error" className="align-center">
            Fix - Collapse or Item
          </h6>
        );
    }
  });

  return (
    <>
      {menuOrientation !== MenuOrientation.TAB ? (
        <ListGroup className={`pc-item pc-hasmenu ${open && 'pc-trigger'}`}>
          <a className="pc-link" href="#!" onClick={() => handleClick(true)}>
            {menu.icon && (
              <span className="pc-micon">
                <i className={menu.icon} />
              </span>
            )}
            <span className="pc-mtext">
              <FormattedMessage id={menu.title as string} />
            </span>
            <span className="pc-arrow">
              <i className={`ti ti-chevron-right`} />
            </span>
            {menu.badge && <Badge className="pc-badge">{menu.badge}</Badge>}
          </a>
          {open === true && <ul className={`pc-submenu ${themeDirection === ThemeDirection.RTL && 'edge'}`}>{navCollapse}</ul>}
        </ListGroup>
      ) : (
        <>
          {menuOrientation !== MenuOrientation.TAB && (
            <ListGroup className={`pc-item pc-hasmenu ${open ?? 'pc-trigger'} ${active ? 'active' : ''}`}>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id={`tooltip-${menu.title as string}`}>
                   <FormattedMessage id={menu.title as string} />
                  </Tooltip>
                }
              >
                <Link
                  href="#!"
                  className="pc-link"
                  onClick={() => {
                    handleClick(!open);
                  }}
                >
                  {menu.icon && (
                    <span className="pc-micon">
                      <i className={menu.icon} />
                    </span>
                  )}
                </Link>
              </OverlayTrigger>
            </ListGroup>
          )}
        </>
      )}
    </>
  );
}