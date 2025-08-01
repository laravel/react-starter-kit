// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import useConfig from '@/hooks/useConfig';

// types
import { IconItem } from '@/types/customizer';

const iconClasses = ['ti ti-chevron-right', 'ti ti-chevrons-right', 'ti ti-caret-right', 'ti ti-circle-plus', 'ti ti-plus'];

const icons: IconItem[] = iconClasses.map((iconClass, index) => ({
  id: `preset-${index + 1}`,
  iconClass
}));

// =============================|| CUSTOMIZER - MENU ICON THEME ||============================== //

export default function MenuIconTheme() {
  const { onChangeMenuIcon, menuIcon } = useConfig();

  return (
    <ListGroup.Item>
      <h6 className="mb-1">Dropdown Menu Icon</h6>
      <p className="text-muted text-sm">Choose your Dropdown Menu Icon</p>
      <div className="theme-color drp-menu-icon">
        {icons.map(({ id, iconClass }) => (
          <a
            href="#!"
            key={id}
            className={menuIcon === id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onChangeMenuIcon('menuIcon', id);
            }}
          >
            <i className={iconClass} />
          </a>
        ))}
      </div>
    </ListGroup.Item>
  );
}
