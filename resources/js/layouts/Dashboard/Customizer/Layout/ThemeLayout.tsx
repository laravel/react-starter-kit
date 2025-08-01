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
import { ThemeDirection } from '@/config';

// types
import { ThemeLayoutTypes } from '@/types/customizer';

// assets
import Image3 from '@assets/images/customizer/ltr.svg';
import Image4 from '@assets/images/customizer/rtl.svg';

const themeLayoutOptions: ThemeLayoutTypes[] = [
  { value: ThemeDirection.LTR, tooltip: 'LTR', image: Image3, dir: 'ltr' },
  { value: ThemeDirection.RTL, tooltip: 'RTL', image: Image4, dir: 'rtl' }
];

// =============================|| CUSTOMIZER - THEME LAYOUT ||============================== //

export default function ThemeLayout() {
  const { onChangeDirection, themeDirection } = useConfig();

  return (
    <ListGroup.Item>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <div className="flex-shrink-0">
          <h6 className="mb-1">Theme Layout</h6>
          <p className="text-muted text-sm mb-0">LTR/RTL</p>
        </div>

        <Row className="g-2">
          {themeLayoutOptions.map(({ value, tooltip, image, dir }) => (
            <Col key={value} xs="auto">
              <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
                <Button
                  variant="white"
                  className={`preset-btn btn-img ${themeDirection === value ? 'active' : ''}`}
                  dir={dir}
                  onClick={() => onChangeDirection(value)}
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
