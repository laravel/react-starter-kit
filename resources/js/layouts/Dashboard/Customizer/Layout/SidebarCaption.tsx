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
import Image1 from '@assets/images/customizer/caption-on.svg';
import Image2 from '@assets/images/customizer/caption-off.svg';

const captionOptions: CustomThemeTypes[] = [
  { value: true, tooltip: 'Caption Show', image: Image1 },
  { value: false, tooltip: 'Caption Hide', image: Image2 }
];

// =============================|| CUSTOMIZER - SIDEBAR CAPTION THEME ||============================== //

export default function SidebarCaption() {
  const { onChangeCaption, caption } = useConfig();

  return (
    <ListGroup.Item>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <div className="flex-shrink-0">
          <h6 className="mb-1">Sidebar Caption</h6>
          <p className="text-muted text-sm mb-0">Show / Hide</p>
        </div>

        <Row className="g-2">
          {captionOptions.map(({ value, tooltip, image }) => (
            <Col key={String(value)} xs="auto">
              <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
                <Button
                  variant="white"
                  className={`preset-btn btn-img ${caption === value ? 'active' : ''}`}
                  onClick={() => onChangeCaption(value)}
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
