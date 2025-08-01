// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| HORIZONTAL FORM ||============================== //

export default function HorizontalForm() {
  return (
    <MainCard title="Horizontal form">
      <Row>
        <Col lg="6">
          <h6>Horizontal Form Example</h6>
          <hr />

          <Row className="mb-3">
            <Form.Label className="col-sm-3 col-form-label">Email</Form.Label>
            <Col sm={9}>
              <Form.Control type="email" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-sm-3 col-form-label">Password</Form.Label>
            <Col sm={9}>
              <Form.Control type="password" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label className="col-sm-3 col-form-label pt-0">Radios</Form.Label>

            <Col sm={9}>
              <Form.Check type="radio" label="First radio" name="formHorizontalRadios" id="formHorizontalRadios1" defaultChecked />
              <Form.Check type="radio" label="Second radio" name="formHorizontalRadios" id="formHorizontalRadios2" />
              <Form.Check type="radio" label="Third disabled radio" name="formHorizontalRadios" id="formHorizontalRadios3" disabled />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label className="col-sm-3 col-form-label pt-0">Checkbox</Form.Label>

            <Col sm={9}>
              <Form.Check type="checkbox" label="Example checkbox" name="formHorizontalRadios" id="formHorizontalRadios1" />
            </Col>
          </Row>
          <Button type="submit" className="mb-4">
            Sign in
          </Button>
        </Col>

        <Col lg={6}>
          <h6>Horizontal Form Label Sizing</h6>
          <hr />
          <Row className="mb-3">
            <Form.Label className="col-sm-2 col-form-label col-form-label-sm">Email</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" size="sm" placeholder="col-form-label-sm" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label className="col-sm-2 col-form-label">Email</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="col-form-label" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label className="col-sm-2 col-form-label col-form-label-lg">Email</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" size="lg" placeholder="col-form-label-lg" />
            </Col>
          </Row>
        </Col>
      </Row>
    </MainCard>
  );
}
