// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

// project-import
import MainCard from '@/components/MainCard';

// ============================|| FORM CONTROL STATE ||============================== //

export default function FormControlState() {
  return (
    <MainCard title="Form Control State">
      <Row className="g-4">
        <Col md={6}>
          <h5>Readonly</h5>
          <hr />

          <div className="mb-0">
            <Form.Label className="col-sm-3 col-form-label">Email</Form.Label>
            <Form.Control type="email" placeholder="Readonly input here…" value={'email@example.com'} readOnly />
          </div>
        </Col>

        <Col md={6}>
          <h5>Readonly plain Text</h5>
          <hr />

          <Form>
            <Row>
              <Col sm={3}>
                <Form.Label className="col-form-label">Email</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control type="email" placeholder="Readonly input here…" value={'email@example.com'} readOnly plaintext />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </MainCard>
  );
}
