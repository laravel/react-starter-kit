// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SPINNER - SIZE ||============================== //

export default function SizeSpinner() {
  return (
    <>
      <MainCard title="Size" bodyClassName="d-flex flex-wrap gap-1">
        <h6>Small</h6>
        <Spinner size="sm" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Spinner size="sm" animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <hr />

        <h6>Custom</h6>
        <Spinner animation="border" role="status" className="wid-50 hei-50">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Spinner animation="grow" role="status" className="wid-50 hei-50">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </MainCard>

      <MainCard title="Border spinner" bodyClassName="d-flex flex-wrap gap-1">
        <Row className="g-4">
          <Col sm={6}>
            <Row className="g-3">
              <Col xs={12}>
                <Button className="lh-1" disabled>
                  <Spinner as="span" animation="border" size="sm" role="status" />
                  <span className="visually-hidden"> Loading...</span>
                </Button>
              </Col>
              <Col xs={12}>
                <Button className="lh-1" disabled>
                  <Spinner as="span" animation="border" size="sm" role="status" />
                  <span className="visually-hidden"> Loading...</span>
                  Loading...
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <Row className="g-3">
              <Col xs={12}>
                <Button className="lh-1" disabled>
                  <Spinner as="span" animation="grow" size="sm" role="status" />
                  <span className="visually-hidden">Loading...</span>
                </Button>
              </Col>
              <Col xs={12}>
                <Button className="lh-1" disabled>
                  <Spinner as="span" animation="grow" size="sm" role="status" />
                  <span className="visually-hidden">Loading...</span>
                  Loading...
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </MainCard>
    </>
  );
}
