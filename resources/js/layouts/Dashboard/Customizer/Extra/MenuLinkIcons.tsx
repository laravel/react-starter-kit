// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import useConfig from '@/hooks/useConfig';

// types
import { IconItem } from '@/types/customizer';

const iconClasses = [
  'ti ti-point-filled',
  'ti ti-arrow-narrow-right',
  'ti ti-chevron-right',
  'ti ti-chevrons-right',
  'ti ti-corner-down-right',
  'ti ti-minus'
];

const icons: IconItem[] = iconClasses.map((iconClass, index) => ({
  id: `preset-${index + 1}`,
  iconClass
}));

// =============================|| CUSTOMIZER - MENU LINK ICON ||============================== //

export default function MenuLinkIconTheme() {
  const { onChangeMenuIcon, menuLinkIcon } = useConfig();

  return (
    <ListGroup.Item>
      <h6 className="mb-1">Dropdown Menu Link Icon</h6>
      <p className="text-muted text-sm">Choose your Dropdown Menu Link Icon</p>
      <div className="theme-color drp-menu-icon">
        {icons.map(({ id, iconClass }) => (
          <a
            href="#!"
            key={id}
            className={menuLinkIcon === id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onChangeMenuIcon('menuLinkIcon', id);
            }}
          >
            <i className={iconClass} />
          </a>
        ))}
      </div>
    </ListGroup.Item>
  );
}
