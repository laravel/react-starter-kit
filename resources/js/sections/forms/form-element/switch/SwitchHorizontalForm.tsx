// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SWITCH - SWITCH HORIZONTAL FORM ||=============================== //

export default function SwitchHorizontalForm() {
  return (
    <MainCard title="Switch in Horizontal Form">
      <Form>
        <Row className="mb-3">
          <Col sm={3} className="text-sm-end col-form-label mb-0">
            <Form.Label className="">Switches</Form.Label>
          </Col>
          <Col sm={9}>
            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-primary" type="checkbox" />
              <FormCheck.Label>Default</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-primary" type="checkbox" />
              <FormCheck.Label>Option 2</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-primary" type="checkbox" disabled />
              <FormCheck.Label>Disabled</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
              <FormCheck.Label>Checked</FormCheck.Label>
            </FormCheck>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-sm-end text-muted">
            <Form.Label className="  col-form-label">Inline Switches</Form.Label>
          </Col>

          <Col sm={9} className=" text-muted">
            <FormCheck className="form-switch custom-switch-v1">
              <FormCheck.Input className="input-primary" type="checkbox" />
              <FormCheck.Label>Inline 1</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1">
              <FormCheck.Input className="input-primary" type="checkbox" />
              <FormCheck.Label>Inline 2</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1">
              <FormCheck.Input className="input-primary" type="checkbox" />
              <FormCheck.Label>Inline 3</FormCheck.Label>
            </FormCheck>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col sm={3} className="text-sm-end text-muted">
            <Form.Label className="  col-form-label">Inline States</Form.Label>
          </Col>

          <Col sm={9} className=" text-muted">
            <FormCheck className="form-switch custom-switch-v1">
              <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
              <FormCheck.Label>Inline 1</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1">
              <FormCheck.Input className="input-primary" type="checkbox" />
              <FormCheck.Label>Inline 2</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1">
              <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
              <FormCheck.Label>Inline 3</FormCheck.Label>
            </FormCheck>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
