// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| SIZING ||============================== //

export default function Sizeing() {
  return (
    <MainCard title="Sizing">
      <Row className="g-4">
        <Col md={6}>
          <Form.Control size="lg" type="text" className="mb-3" placeholder=".form-control-lg" />
          <Form.Control type="text" className="mb-3" placeholder="Default input" />
          <Form.Control size="sm" type="text" className="mb-0" placeholder=".form-control-sm" />
        </Col>

        <Col md={6}>
          <Form.Select aria-label="Default select example" size="lg" className="mb-3">
            <option>Large select</option>
          </Form.Select>
          <Form.Select aria-label="Default select example" className="mb-0">
            <option>Default select</option>
          </Form.Select>
        </Col>
      </Row>
    </MainCard>
  );
}
