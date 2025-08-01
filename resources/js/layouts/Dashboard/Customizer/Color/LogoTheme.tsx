// react-bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ListGroup from 'react-bootstrap/ListGroup';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import useConfig from '@/hooks/useConfig';

// types
import { ColorOption } from '@/types/customizer';

// =============================|| CUSTOMIZER - LOGO THEME ||============================== //

export default function LogoTheme({ logoColors }: { logoColors: ColorOption[] }) {
  const { onChangeThemePreset, logoColor } = useConfig();

  return (
    <ListGroup.Item>
      <h6 className="mb-1">Logo Theme</h6>
      <p className="text-muted text-sm">Choose your Logo theme color</p>
      <div className="theme-color preset-color">
        {logoColors.map(({ id, label }) => (
          <OverlayTrigger key={id} placement="top" overlay={<Tooltip>{label}</Tooltip>}>
            <a
              href="#!"
              className={logoColor === id ? 'active' : ''}
              data-value={id}
              aria-label={label}
              onClick={(e) => {
                e.preventDefault();
                onChangeThemePreset('logoColor', id);
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
