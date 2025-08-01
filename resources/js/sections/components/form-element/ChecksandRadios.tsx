// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-import
import MainCard from '@/components/MainCard';

// =============================|| CHECKS AND RADIOS ||============================== //

export default function ChecksandRadios() {
  return (
    <MainCard title="Checks and radios">
      <Row className="g-4">
        <Col md={6}>
          <h5>Checkboxes</h5>
          <hr />
          <Form.Check type="checkbox" label="Check this custom checkbox" />
        </Col>

        <Col md={6}>
          <h5>Switches</h5>
          <hr />
          <Form.Check type="switch" label="Check this custom Switchess" />
        </Col>

        <Col md={6}>
          <h5>Radios</h5>
          <hr />
          <Form.Check type="radio" name="radioGroup" label="Default radio" defaultChecked />
          <Form.Check type="radio" name="radioGroup" label="Default checked radio" />

          <h5 className="mt-3">Inline</h5>
          <hr />
          <Form.Check type="radio" name="inlineRadioGroup" label="Default radio" />
          <Form.Check type="radio" name="inlineRadioGroup" label="Default checked radio" />
        </Col>

        <Col md={6}>
          <h5>Range</h5>
          <hr />
          <Form.Label>Example range</Form.Label>
          <Form.Range />
          <Form.Label>Min and max</Form.Label>
          <Form.Range min={0} max={5} />
          <Form.Label>Steps</Form.Label>
          <Form.Range step={0.5} />
        </Col>
      </Row>
    </MainCard>
  );
}
