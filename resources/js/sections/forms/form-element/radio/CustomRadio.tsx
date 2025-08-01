import { useEffect, useRef, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| RADIO - CUSTOM RADIO ||============================== //

export default function CustomRadio() {
  const [radio, setradio] = useState(true);
  const [radio1, setradio1] = useState(true);
  const radioRef = useRef<HTMLInputElement>(null);

  const handleradioChange = () => setradio(!radio);
  const handleradioChange1 = () => setradio1(!radio1);

  useEffect(() => {
    if (radioRef.current) {
      radioRef.current.indeterminate = true;
    }
  }, []);

  return (
    <MainCard title="Custom radio">
      <Row className="mb-3">
        <Col sm={3} className="text-sm-end col-form-label pt-0">
          Radio
        </Col>
        <Col sm={9}>
          <Form.Group className="mb-2">
            <Form.Check type="radio" label="Default radio" />
          </Form.Group>

          <Form.Check type="radio" id="flexCheckChecked" label="Checked radio" checked={radio} onChange={handleradioChange} />

          <Form.Group className="mb-2">
            <Form.Check type="radio" label="Disabled radio" disabled />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check type="radio" label="Disabled checked radio" checked disabled />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-sm-end col-form-label pt-0">
          Inline
        </Col>
        <Col sm={9}>
          <Form.Group>
            <Form.Check type="radio" label="1" />
          </Form.Group>

          <Form.Group>
            <Form.Check type="radio" label="2" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check type="radio" label="3" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check type="radio" label="4 (disabled)" disabled />
            <small className="form-text text-muted">
              Add <code>.form-check-inline</code> to any <code>.custom-control</code>
            </small>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col sm={3} className="text-sm-end col-form-label pt-0">
          Inline Radio Checked State
        </Col>
        <Col sm={9}>
          <Form.Group>
            <Form.Check type="radio" label="1" />
          </Form.Group>

          <Form.Group>
            <Form.Check type="radio" label="2" />
          </Form.Group>

          <Form.Group>
            <Form.Check type="radio" label="3" checked={radio1} onChange={handleradioChange1} />
          </Form.Group>

          <Form.Group>
            <Form.Check type="radio" label="4 (disabled)" disabled />
            <small className="form-text text-muted">
              Add <code>checked</code>attribute to any <code>.form-check-input</code>
            </small>
          </Form.Group>
        </Col>
      </Row>
    </MainCard>
  );
}
