import { Fragment, useCallback, useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { Link, usePage } from '@inertiajs/react';

// react-bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// third-party
import { FormattedMessage } from 'react-intl';

// project-imports
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import useConfig from '@/hooks/useConfig';
import { useGetMenuMaster } from '@/api/menu';
import { MenuOrientation } from '@/config';

// types
import { NavItemType } from '@/types/menu';

interface Props {
  item: NavItemType;
  lastItem: number;
  remItems: NavItemType[];
  lastItemId: string;
  setSelectedID: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedID: string | undefined;
  setSelectedItems: React.Dispatch<React.SetStateAction<NavItemType | undefined>>;
  selectedItems: NavItemType | undefined;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
  selectedLevel: number;
  setSelectTab: (item: NavItemType) => void;
}

type VirtualElement = {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
};

// ==============================|| NAVIGATION - GROUP ||============================== //

export default function NavGroup({
  item,
  lastItem,
  remItems,
  lastItemId,
  setSelectedID,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
  setSelectTab
}: Props) {
  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);
  const [currentItem, setCurrentItem] = useState(item);
  const [state, setState] = useState<any>();
  const pathname = usePage();
  const { menuOrientation, onChangeMenuOrientation } = useConfig();

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem: any = { ...item };
        const elements = remItems.map((ele: NavItemType) => ele?.children);
        localItem.children = elements.flat(1);
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
  }, [item, lastItem, lastItemId, remItems, setCurrentItem]);

  const checkOpenForParent = useCallback(
    (child: NavItemType[], id: string) => {
      child.forEach((ele: NavItemType) => {
        if (ele.children?.length) {
          checkOpenForParent(ele.children, currentItem.id!);
        }

        if (ele.url && !!matchPath({ path: ele?.link ? ele.link : ele.url, end: true }, pathname.url)) {
          setSelectedID(id);
        }
      });
    },
    [currentItem.id, pathname, setSelectedID]
  );

  const checkSelectedOnload = useCallback(
    (data: NavItemType) => {
      const children = data.children ?? [];
      children.forEach((itemCheck: NavItemType | undefined) => {
        if (!itemCheck) return;

        if (itemCheck.children?.length) {
          checkOpenForParent(itemCheck.children, currentItem.id!);
        }

        if (itemCheck.url && matchPath({ path: itemCheck.link ? itemCheck.link : itemCheck.url, end: true }, pathname.url)) {
          setSelectedID(currentItem.id!);
        }
      });
    },
    [pathname, currentItem, checkOpenForParent, setSelectedID]
  );

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
  }, [pathname, currentItem, checkSelectedOnload, openMini, setAnchorEl]);

  useEffect(() => {
    if (item.children?.length) {
      setState(() => item.children?.[0]);
    }
  }, [item.children]);

  const navCollapse = item.children?.map((menuItem, index) => {
    const key = menuItem.id || `${menuItem.type}-${index}`;
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={key}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id!}
          />
        );
      case 'item':
        return <NavItem key={key} item={menuItem} level={1} />;
      default:
        return (
          <h6 key={`fix-${index}`} color="error" className="align-center">
            Fix - Group Collapse or Items
          </h6>
        );
    }
  });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);

  const { menuMaster } = useGetMenuMaster();

  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const handleClick = () => {
    const isMobile = window.innerWidth <= 1024;
    setSelectedLevel(1);
    setSelectTab(item);
    if (isMobile || !drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? state.id : null);
      setSelectedItems(!selected ? state : null);
    }
  };
  return (
    <>
      {menuOrientation !== MenuOrientation.TAB ? (
        <Fragment>
          <li className="pc-item pc-caption" key={item.id}>
            <label>
             <FormattedMessage id={item.title as string}  />
            </label>
          </li>
          {navCollapse}
        </Fragment>
      ) : (
        <li className="nav-item">
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={`tooltip-${item?.title ?? ''}`}>
               <FormattedMessage id={item.title as string}  />
              </Tooltip>
            }
          >
            <Link
              href="#!"
              className={`nav-link ${item.id === selected ? 'active' : ''}`}
              onClick={() => {
                handleClick();
                if (item?.layout === item?.title) {
                  onChangeMenuOrientation(item?.layout as MenuOrientation);
                }
              }}
            >
              {state?.icon && <i className={`f-20  ${typeof state?.icon === 'string' ? state?.icon : state?.icon?.props.className}`} />}
            </Link>
          </OverlayTrigger>
        </li>
      )}
    </>
  );
}