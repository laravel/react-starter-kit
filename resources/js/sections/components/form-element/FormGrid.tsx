// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-import
import MainCard from '@/components/MainCard';

// =============================|| FORM GRID ||============================== //

export default function FormGrid() {
  return (
    <MainCard title="Form Grid">
      <Form>
        <Row>
          <Col xs={12}>
            <Alert variant="primary" className="d-flex align-items-center gap-2">
              <i className="ti ti-info-circle-filled f-24" />
              When working with the Bootstrap grid system, be sure to place form elements within column classes.
            </Alert>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" />
          </Col>
        </Row>
        <div className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="1234 Main St" />
        </div>

        <div className="mb-3">
          <Form.Label>Address 2</Form.Label>
          <Form.Control type="text" placeholder="Apartment, studio, or floor" />
        </div>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" />
          </Col>

          <Col md={4} className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select>
              <option>Select</option>
              <option value="1">Large select</option>
            </Form.Select>
          </Col>

          <Col md={2} className="mb-3">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" />
          </Col>
        </Row>
        <div className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </div>

        <Button type="submit">Sign in</Button>
      </Form>
    </MainCard>
  );
}
