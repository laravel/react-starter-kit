import { useEffect } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import useConfig from '@/hooks/useConfig';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';
import { ThemeMode } from '@/config';

// types
import { ThemeModeTypes } from '@/types/customizer';

const themeModes: ThemeModeTypes[] = [
  {
    value: ThemeMode.LIGHT,
    tooltip: 'Light',
    icon: <i className="ph ph-sun align-middle text-warning" />
  },
  {
    value: ThemeMode.DARK,
    tooltip: 'Dark',
    icon: <i className="ph ph-moon align-middle" />
  },
  {
    value: ThemeMode.AUTO,
    tooltip: "Automatically sets the theme based on user's operating system's color scheme.",
    icon: <i className="ph ph-cpu align-middle" />
  }
];

// ==============================|| CUSTOMIZATION - THEME MODE ||============================== //

export default function ThemeModeLayout() {
  const { onChangeMode, mode } = useConfig();
  const appliedTheme = getResolvedTheme(mode);

  useEffect(() => {
    setResolvedTheme(mode);
  }, [mode]);

  return (
    <div className="pc-dark">
      <Stack direction="horizontal" className="align-items-center">
        <div className="flex-shrink-0">
          <h6 className="mb-1">Theme Mode</h6>
          <p className="text-muted text-sm mb-0">Light / Dark / System</p>
        </div>

        <div className="flex-grow-1 ms-3">
          <Row direction="horizontal" className="g-2 theme-color theme-layout justify-content-end">
            {themeModes.map(({ value, tooltip, icon }) => (
              <OverlayTrigger key={value} placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
                <Col xs="auto">
                  <Button
                    variant="white"
                    className={`preset-btn ${mode === value || (mode === ThemeMode.AUTO && appliedTheme === value) ? 'active' : ''}`}
                    onClick={() => onChangeMode(value)}
                  >
                    {icon}
                  </Button>
                </Col>
              </OverlayTrigger>
            ))}
          </Row>
        </div>
      </Stack>
    </div>
  );
}
