// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - POINTER EVENTS ||============================== //

export default function PointerEvents() {
  return (
    <MainCard
      title={
        <h5>
          Pointer Events <Badge bg="danger">NEW</Badge>
        </h5>
      }
      subheader={
        <p className="mb-0">
          Bootstrap provides <code>pe-none </code> and <code>pe-auto </code> classes to prevent or add element interactions.
        </p>
      }
    >
      <Row className="g-4">
        <Col sm={12} lg={3} className="text-lg-end">
          <b>Pointer events none</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p>
            <a>This link </a>can not be clicked.
          </p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} lg={3} className="text-lg-end">
          <b>Pointer events auto</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p>
            <a>This link </a>can be clicked (this is default behaviour).
          </p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} lg={3} className="text-lg-end">
          <b>Pointer events combine</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p className="pe-none lh-base">
            <a>This link </a> can not be clicked because the <code>pointer-events </code> property is inherited from its parent. However,{' '}
            <a className="pe-auto">this link</a>
            has a <code>pe-auto</code> class and can be clicked.
          </p>
        </Col>
      </Row>
    </MainCard>
  );
}
