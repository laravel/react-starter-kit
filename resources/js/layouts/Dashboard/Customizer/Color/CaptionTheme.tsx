// react-bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ListGroup from 'react-bootstrap/ListGroup';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import useConfig from '@/hooks/useConfig';

// types
import { ColorOption } from '@/types/customizer';

// =============================|| CUSTOMIZER - CAPTION THEME ||============================== //

export default function CaptionTheme({ captionColors }: { captionColors: ColorOption[] }) {
  const { onChangeThemePreset, navbarCaptionColor } = useConfig();

  return (
    <ListGroup.Item>
      <h6 className="mb-1">Navbar Caption Color</h6>
      <p className="text-muted text-sm">Choose your Navbar Caption Color</p>
      <div className="theme-color preset-color">
        {captionColors.map(({ id, label }) => (
          <OverlayTrigger key={id} placement="top" overlay={<Tooltip>{label}</Tooltip>}>
            <a
              href="#!"
              className={navbarCaptionColor === id ? 'active' : ''}
              data-value={id}
              aria-label={label}
              onClick={(e) => {
                e.preventDefault();
                onChangeThemePreset('navbarCaptionColor', id);
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
