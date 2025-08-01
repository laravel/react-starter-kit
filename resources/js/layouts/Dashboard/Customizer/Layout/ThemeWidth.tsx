// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import useConfig from '@/hooks/useConfig';

// types
import { CustomThemeTypes } from '@/types/customizer';

// assets
import Image5 from '@assets/images/customizer/full.svg';
import Image6 from '@assets/images/customizer/fixed.svg';

const layoutWidths: CustomThemeTypes[] = [
  { label: 'Full Width', tooltip: 'Full Width', value: false, image: Image5 },
  { label: 'Fixed Width', tooltip: 'Fixed Width', value: true, image: Image6 }
];

// =============================|| CUSTOMIZER - THEME WIDTH ||============================== //

export default function ThemeWidth() {
  const { onChangeContainer, container } = useConfig();

  return (
    <ListGroup.Item>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <div className="flex-shrink-0">
          <h6 className="mb-1">Layout Width</h6>
          <p className="text-muted text-sm mb-0">Full / Fixed</p>
        </div>

        <Row className="g-2">
          {layoutWidths.map(({ label, tooltip, value, image }) => (
            <Col xs="auto" key={label}>
              <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
                <Button
                  variant="white"
                  className={`preset-btn btn-img ${container === value ? 'active' : ''}`}
                  onClick={() => onChangeContainer(value)}
                >
                  <Image src={image} fluid />
                </Button>
              </OverlayTrigger>
            </Col>
          ))}
        </Row>
      </Stack>
    </ListGroup.Item>
  );
}
