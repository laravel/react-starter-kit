// react-bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ListGroup from 'react-bootstrap/ListGroup';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import useConfig from '@/hooks/useConfig';

// types
import { ColorOption } from '@/types/customizer';

// =============================|| CUSTOMIZER - NAVBAR THEME ||============================== //

export default function NavbarTheme({ navbarColors }: { navbarColors: ColorOption[] }) {
  const { onChangeThemePreset, navbarColor } = useConfig();

  return (
    <ListGroup.Item>
      <h6 className="mb-1">Navbar Theme</h6>
      <p className="text-muted text-sm">Choose your Navbar theme color</p>
      <div className="theme-color preset-color">
        {navbarColors.map(({ id, label }) => (
          <OverlayTrigger key={id} placement="top" overlay={<Tooltip>{label}</Tooltip>}>
            <a
              href="#!"
              className={navbarColor === id ? 'active' : ''}
              data-value={id}
              aria-label={label}
              onClick={(e) => {
                e.preventDefault();
                onChangeThemePreset('navbarColor', id);
              }}
            >
              <i className="ti ti-checks" />
            </a>
          </OverlayTrigger>
        ))}
      </div>
    </ListGroup.Item>
  );
}
