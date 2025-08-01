import { useCallback, useEffect, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';

// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// third-party
// import { FormattedMessage } from 'react-intl';

// project-imports
import Navigation from './Navigation';
import { useGetMenuMaster } from '@/api/menu';
import SimpleBarScroll from '@/components/third-party/SimpleBar';
import { MenuOrientation } from '@/config';
import useConfig from '@/hooks/useConfig';
import menuItems from '@/menu-items';

// types
import { NavItemType } from '@/types/menu';

interface Props {
  selectedItems: NavItemType | undefined;
  setSelectedItems: React.Dispatch<React.SetStateAction<NavItemType | undefined>>;
}

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function DrawerContent({ selectedItems, setSelectedItems }: Props) {
  const { onChangeMenuOrientation, menuOrientation } = useConfig();
  const [selectTab, setSelectTab] = useState<NavItemType | undefined>(menuItems.items[0]);
  const { menuMaster } = useGetMenuMaster();
  const pathname = usePage();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleClick = (item: NavItemType) => {
    if (!item.id) return;

    const isMobile = window.innerWidth <= 1024;

    setOpen((prev) => ({
      ...prev,
      [item.id as string]: !prev[item.id as string]
    }));

    if (isMobile || !drawerOpen) {
      setSelectedItems(item);
    }
  };

  const isActive = useCallback(
    (item: NavItemType) => {
      if (!item.url) return false;
      return pathname.url.toLowerCase().includes(item.url.toLowerCase());
    },
    [pathname]
  );

  const autoOpenParents = useCallback(
    (items?: NavItemType[]) => {
      const openMap: Record<string, boolean> = {};

      const findAndMark = (entries: NavItemType[] = []) => {
        entries.forEach((item) => {
          if (item.children) {
            const match = item.children.find((child) => isActive(child) || child.children?.some(isActive));
            if (match) openMap[item.id as string] = true;

            findAndMark(item.children);
          }
        });
      };

      findAndMark(items);
      setOpen(openMap);
    },
    [isActive, setOpen]
  );

  useEffect(() => {
    autoOpenParents(selectTab?.children);
  }, [autoOpenParents, selectTab]);
  return (
    <>
      {menuOrientation === MenuOrientation.TAB ? (
        <div className="tab-sidemenu">
          <SimpleBarScroll style={{ height: 'calc(100vh - 74px)' }}>
            <Navigation selectedItems={selectedItems} setSelectedItems={setSelectedItems} setSelectTab={setSelectTab} />
          </SimpleBarScroll>
        </div>
      ) : (
        <SimpleBarScroll style={{ height: 'calc(100vh - 74px)' }}>
          <Navigation selectedItems={selectedItems} setSelectedItems={setSelectedItems} setSelectTab={setSelectTab} />
        </SimpleBarScroll>
      )}
      {menuOrientation === MenuOrientation.TAB && (
        <div className="tab-link">
          <div className="navbar-content pc-trigger">
            <SimpleBarScroll style={{ height: 'calc(100vh - 74px)' }}>
              <ul className="pc-navbar">
                {selectTab?.children?.map((item) => (
                  <ListGroup
                    key={item.id}
                    className={`pc-item pc-hasmenu ${open[item.id as string] ? 'pc-trigger' : ''} ${isActive(item) ? 'active' : ''}`}
                  >
                    <Link href={item.url || '#'} className="pc-link" onClick={() => handleClick(item)}>
                      {item.icon && (
                        <span className="pc-micon">
                          <i className={item.icon} />
                        </span>
                      )}
                      <span className="pc-mtext">
                        {item.title}
                      </span>
                      {item.type === 'collapse' && (
                        <span className="pc-arrow">
                          <i className="ti ti-chevron-right" />
                        </span>
                      )}
                    </Link>

                    {open[item.id as string] && item.children && (
                      <ul className="pc-submenu">
                        {item.children.map((child) => (
                          <li
                            key={child.id}
                            className={`pc-item ${open[child.id as string] ? 'pc-trigger' : ''} ${isActive(child) ? 'active' : ''}`}
                          >
                            <Link
                              href={child.url || '#'}
                              className="pc-link"
                              onClick={() => {
                                handleClick(child);
                                if (child?.layout === child?.title) {
                                  onChangeMenuOrientation(child?.layout as MenuOrientation);
                                }
                              }}
                            >
                              {child.icon && (
                                <span className="pc-micon">
                                  <i className={child.icon} />
                                </span>
                              )}
                       {child.title}
                              {child.type === 'collapse' && (
                                <span className="pc-arrow">
                                  <i className="ti ti-chevron-right" />
                                </span>
                              )}
                            </Link>

                            {open[child.id as string] && child.children && (
                              <ul className="pc-submenu">
                                {child.children.map((value) => (
                                  <li key={value.id} className={`pc-item ${isActive(value) ? 'active' : ''}`}>
                                    <Link
                                      className="pc-link"
                                      href={value.url || ''}
                                      onClick={() => {
                                        if (value?.layout === value?.title) {
                                          onChangeMenuOrientation(value?.layout as MenuOrientation);
                                        }
                                      }}
                                    >
                                      {value.icon && (
                                        <span className="pc-micon">
                                          <i className={value.icon} />
                                        </span>
                                      )}
                                      {value.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </ListGroup>
                ))}
              </ul>
            </SimpleBarScroll>
          </div>
        </div>
      )}
    </>
  );
}