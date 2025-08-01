// react-bootstrap
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| FORM FLOATING - LABELS ||============================== //

export default function FloatingLabels() {
  return (
    <MainCard title="Floating Labels">
      <h5>Form controls</h5>
      <hr />
      <Form>
        <Row className="g-4">
          <Col md={6}>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </Col>
        </Row>
      </Form>

      <h5 className="mt-3">Default Value</h5>
      <hr />

      <Row className="g-4">
        <Col md={6}>
          <FloatingLabel controlId="floatingInput" label="Input with value">
            <Form.Control type="email" placeholder="Email" defaultValue="test@example.com" />
          </FloatingLabel>
        </Col>

        <Col md={6}>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" defaultValue="Password" />
          </FloatingLabel>
        </Col>
      </Row>

      <h5 className="mt-3">Validation styles</h5>
      <hr />

      <Row className="g-4">
        <Col md={6}>
          <FloatingLabel controlId="floatingInput" label="Valid input">
            <Form.Control type="email" placeholder="Email" defaultValue="test@example.com" isValid />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel controlId="floatingInput" label="Invalid input">
            <Form.Control type="email" placeholder="Email" defaultValue="test@example.com" isInvalid />
          </FloatingLabel>
        </Col>
      </Row>
    </MainCard>
  );
}
