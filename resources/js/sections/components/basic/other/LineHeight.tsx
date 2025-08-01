// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - LINE HEIGHT ||============================== //

export default function LineHeight() {
  return (
    <MainCard
      title={
        <h5>
          Line Height <Badge bg="danger">NEW</Badge>
        </h5>
      }
      subheader={
        <p className="mb-0 mt-2">
          Change the line height with <code>.lh-*</code> utilities
        </p>
      }
    >
      <Row>
        <Col sm={12} lg={2} className="text-lg-end">
          <b>Line height 1</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p className="lh-1">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Cras mattis pannenkoek purus sit amet
            fermentum.
          </p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} lg={2} className="text-lg-end">
          <b>Line height small</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p className="lh-sm">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Cras mattis pannenkoek purus sit amet
            fermentum.
          </p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} lg={2} className="text-lg-end">
          <b>Line height base</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p className="lh-base">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Cras mattis pannenkoek purus sit amet
            fermentum.
          </p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} lg={2} className="text-lg-end">
          <b>Line height large</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p className="lh-lg">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Cras mattis pannenkoek purus sit amet
            fermentum.
          </p>
        </Col>
      </Row>
    </MainCard>
  );
}
