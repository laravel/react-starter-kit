// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - ICON ||============================== //

export default function ButtonIcon() {
  return (
    <MainCard title="Button Icon">
      <Row>
        <Col lg={6}>
          <h5>Basic</h5>
          <Stack direction="horizontal" gap={2} className="flex-wrap mb-4">
            <Button className="btn-icon">
              <i className="ti ti-thumb-up" />
            </Button>
            <Button variant="secondary" className="btn-icon">
              <i className="ti ti-camera" />
            </Button>
            <Button variant="success" className="btn-icon">
              <i className="ti ti-circle-check" />
            </Button>
            <Button variant="danger" className="btn-icon">
              <i className="ti ti-alert-triangle" />
            </Button>
            <Button variant="warning" className="btn-icon">
              <i className="ti ti-triangle" />
            </Button>
            <Button variant="info" className="btn-icon">
              <i className="ti ti-info-circle" />
            </Button>
          </Stack>
        </Col>
        <Col lg={6}>
          <h5>Light</h5>
          <Stack direction="horizontal" gap={2} className="flex-wrap mb-4">
            <Button variant="light-primary" className="btn-icon">
              <i className="ti ti-thumb-up" />
            </Button>
            <Button variant="light-secondary" className="btn-icon">
              <i className="ti ti-camera" />
            </Button>
            <Button variant="light-success" className="btn-icon">
              <i className="ti ti-circle-check" />
            </Button>
            <Button variant="light-danger" className="btn-icon">
              <i className="ti ti-alert-triangle" />
            </Button>
            <Button variant="light-warning" className="btn-icon">
              <i className="ti ti-triangle" />
            </Button>
            <Button variant="light-info" className="btn-icon">
              <i className="ti ti-info-circle" />
            </Button>
          </Stack>
        </Col>
        <Col lg={6}>
          <h5>Outline</h5>
          <Stack direction="horizontal" gap={2} className="flex-wrap mb-4">
            <Button variant="outline-primary" className="btn-icon">
              <i className="ti ti-thumb-up" />
            </Button>
            <Button variant="outline-secondary" className="btn-icon">
              <i className="ti ti-camera" />
            </Button>
            <Button variant="outline-success" className="btn-icon">
              <i className="ti ti-circle-check" />
            </Button>
            <Button variant="outline-danger" className="btn-icon">
              <i className="ti ti-alert-triangle" />
            </Button>
            <Button variant="outline-warning" className="btn-icon">
              <i className="ti ti-triangle" />
            </Button>
            <Button variant="outline-info" className="btn-icon">
              <i className="ti ti-info-circle" />
            </Button>
          </Stack>
        </Col>
        <Col lg={6}>
          <h5>Link</h5>
          <Stack direction="horizontal" gap={2} className="flex-wrap mb-4">
            <Button variant="link-primary" className="btn-icon">
              <i className="ti ti-thumb-up" />
            </Button>
            <Button variant="link-secondary" className="btn-icon">
              <i className="ti ti-camera" />
            </Button>
            <Button variant="link-success" className="btn-icon">
              <i className="ti ti-circle-check" />
            </Button>
            <Button variant="link-danger" className="btn-icon">
              <i className="ti ti-alert-triangle" />
            </Button>
            <Button variant="link-warning" className="btn-icon">
              <i className="ti ti-triangle" />
            </Button>
            <Button variant="link-info" className="btn-icon">
              <i className="ti ti-info-circle" />
            </Button>
          </Stack>
        </Col>
        <Col lg={6}>
          <h5>Size</h5>
          <Stack direction="horizontal" gap={2} className="flex-wrap align-items-start">
            <Button className="btn-icon avatar-xl">A</Button>
            <Button className="btn-icon avatar-l">A</Button>
            <Button className="btn-icon">A</Button>
            <Button className="btn-icon avatar-s">A</Button>
            <Button className="btn-icon avatar-xs">A</Button>
          </Stack>
        </Col>
      </Row>
    </MainCard>
  );
}
