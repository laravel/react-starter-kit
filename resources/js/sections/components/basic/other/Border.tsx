// react-bootstrap
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - BORDER ||============================== //

export default function Border() {
  return (
    <MainCard title="Border">
      <Row className="g-4">
        <Col sm={12}>
          <h5>Border color</h5>
          <hr />
          <Stack direction="horizontal" gap={2} className="d-inline-block">
            <OverlayTrigger placement="top" overlay={<Tooltip>border-primary</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-primary" />
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>border-secondary</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-secondary" />
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>border-success</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-success" />
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>border-danger</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-danger" />
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>border-warning</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-warning" />
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>border-info</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-info" />
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>border-light</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-light" />
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>border-dark</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark" />
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>border-white</Tooltip>}>
              <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-white" />
            </OverlayTrigger>
          </Stack>
        </Col>

        <Col xs={12} sm={6} className="Additive">
          <h5>Additive</h5>
          <hr />
          <OverlayTrigger placement="top" overlay={<Tooltip>border</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border-top</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border-top border-dark" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border-end</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border-end border-dark" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border-bottom</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border-bottom border-dark" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border-start</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border-start border-dark" />
          </OverlayTrigger>
        </Col>

        <Col sm={6}>
          <h5>Subtractive</h5>
          <hr />
          <OverlayTrigger placement="top" overlay={<Tooltip>border border-0</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-0" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border border-top-0</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-top-0" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border border-end-0</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-end-0" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border border-bottom-0</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-bottom-0" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border border-start-0</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-start-0" />
          </OverlayTrigger>
        </Col>

        <Col sm={6}>
          <h5>Border width</h5>
          <hr />
          <OverlayTrigger placement="top" overlay={<Tooltip>border border-1</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-1" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border border-2</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-2" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border border-3</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-3" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border border-4</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-4" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>border border-5</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark border-5" />
          </OverlayTrigger>
        </Col>

        <Col sm={6}>
          <h5>Border radius Sizes</h5>
          <hr />
          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-sm</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark rounded-sm" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-lg</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-dark rounded-lg" />
          </OverlayTrigger>
        </Col>

        <Col sm={12}>
          <h5>Border-radius</h5>
          <hr />

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-secondary rounded" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-top</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-secondary rounded-top" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-right</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-secondary rounded-end" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-bottom</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-secondary rounded-bottom" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-left</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-secondary rounded-start" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-circle</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-secondary rounded-circle" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-pill</Tooltip>}>
            <div className="hei-75 wid-120 bg-body d-inline-block me-2 border border-secondary rounded-pill" />
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>rounded-0</Tooltip>}>
            <div className="hei-75 wid-75 bg-body d-inline-block me-2 border border-secondary rounded-0" />
          </OverlayTrigger>
        </Col>
      </Row>
    </MainCard>
  );
}
