import { useEffect, useRef } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| FORM CHECKBOX - CUSTOM CHECKBOX ||============================== //

export default function CustomCheckbox() {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = true;
    }
  }, []);

  return (
    <MainCard title="Custom Checkbox">
      <Row className="mb-3">
        <Col sm={3} className="text-sm-end col-form-label pt-0">
          Checkboxes
        </Col>
        <Col sm={9}>
          <Form.Group className="mb-2">
            <Form.Check label="Default checkbox" />
          </Form.Group>

          <Form.Check type="checkbox" id="flexCheckChecked" label="Checked checkbox" defaultChecked />

          <Form.Group className="mb-2">
            <Form.Check label="Disabled checkbox" disabled />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check label="Disabled checked checkbox" defaultChecked disabled />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-sm-end col-form-label pt-0 pb-1">
          Inline
        </Col>
        <Col sm={9}>
          <Form.Group>
            <Form.Check label="1" />
          </Form.Group>

          <Form.Group>
            <Form.Check label="2" />
          </Form.Group>

          <Form.Group>
            <Form.Check label="3" defaultChecked />
          </Form.Group>

          <Form.Group>
            <Form.Check label="4 (disabled)" disabled />
            <small className="form-text text-muted">
              Add <code>.form-check-inline</code> to any <code>.custom-control</code>
            </small>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col sm={3} className="text-sm-end col-form-label pt-0 pb-1">
          Indeterminate
        </Col>
        <Col sm={9}>
          <Form.Check type="checkbox" label="Indeterminate" ref={checkboxRef} />
          <small className="form-text text-muted">
            <code>document.querySelector('your-checkbox').indeterminate=!0;</code>
          </small>
        </Col>
      </Row>
    </MainCard>
  );
}
