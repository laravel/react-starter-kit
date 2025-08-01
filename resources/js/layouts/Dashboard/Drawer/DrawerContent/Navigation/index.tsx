import { useState } from 'react';

// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import { MenuOrientation } from '@/config';
import menuItems from '@/menu-items';
import useConfig from '@/hooks/useConfig';

// types
import { NavItemType } from '@/types/menu';

interface NavigationProps {
  selectedItems: NavItemType | undefined;
  setSelectedItems: React.Dispatch<React.SetStateAction<NavItemType | undefined>>;
  setSelectTab?: React.Dispatch<React.SetStateAction<NavItemType | undefined>>;
}

// ==============================|| NAVIGATION ||============================== //

export default function Navigation({ selectedItems, setSelectedItems, setSelectTab }: NavigationProps) {
  const [selectedID, setSelectedID] = useState<string | undefined>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const { menuOrientation } = useConfig();

  const lastItem = null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      id: item.id, // Ensure id is included
      type: item.type, // Add the missing type field
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url
      })
    }));
  }

  const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item, index) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <>
              <ListGroup.Item key={index}>
                <NavItem item={item} level={1} isParents />
              </ListGroup.Item>
            </>
          );
        }

        return (
          <NavGroup
            key={item.id}
            setSelectedID={setSelectedID}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedID={selectedID}
            selectedItems={selectedItems}
            lastItem={lastItem!}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
            setSelectTab={setSelectTab ?? (() => {})}
          />
        );
      default:
        return (
          <h6 key={item.id} color="error" className="align-items-center">
            Fix - Navigation Group
          </h6>
        );
    }
  });

  return (
    <ul className={`pc-navbar 'd-block'  ${menuOrientation === MenuOrientation.TAB ? 'pc-tab-link nav flex-column' : ''}`}>{navGroups}</ul>
  );
}