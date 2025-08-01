// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import useConfig from '@/hooks/useConfig';

// types
import { CustomThemeTypes } from '@/types/customizer';

const sidebarThemeOptions: CustomThemeTypes[] = [
  {
    value: true,
    tooltip: 'Light',
    icon: <i className="ph ph-sun align-middle text-warning" />
  },
  {
    value: false,
    tooltip: 'Dark',
    icon: <i className="ph ph-moon align-middle" />
  }
];

// =============================|| CUSTOMIZER - SIDEBAR THEME ||============================== //

export default function SidebarThemeLayout() {
  const { onChangeSideTheme, sidebarTheme } = useConfig();

  return (
    <ListGroup.Item>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <div className="flex-shrink-0">
          <h6 className="mb-1">Sidebar theme</h6>
          <p className="text-muted text-sm mb-0">Dark / Light</p>
        </div>
        <Row className="g-2">
          {sidebarThemeOptions.map(({ value, tooltip, icon }) => (
            <Col key={String(value)} xs="auto">
              <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
                <Button
                  variant="white"
                  className={`preset-btn ${sidebarTheme === value ? 'active' : ''}`}
                  onClick={() => onChangeSideTheme(value)}
                >
                  {icon}
                </Button>
              </OverlayTrigger>
            </Col>
          ))}
        </Row>
      </Stack>
    </ListGroup.Item>
  );
}
