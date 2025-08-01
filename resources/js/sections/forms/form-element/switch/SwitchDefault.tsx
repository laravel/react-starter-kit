// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SWITCH - SWITCH DEFAULT ||============================== //

export default function SwitchDefault() {
  return (
    <MainCard title="Switch [ v1 ]">
      <Row className="g-4">
        <Col md={4}>
          <h5>Default Switch</h5>
          <hr />

          <Form>
            <FormCheck className="form-switch mb-2">
              <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
              <FormCheck.Label>primary</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch mb-2">
              <FormCheck.Input className="input-secondary" type="checkbox" defaultChecked />
              <FormCheck.Label>secondary</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch mb-2">
              <FormCheck.Input className=" input-success" type="checkbox" defaultChecked />
              <FormCheck.Label>success</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch mb-2">
              <FormCheck.Input className="input-danger" type="checkbox" defaultChecked />
              <FormCheck.Label>danger</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch mb-2">
              <FormCheck.Input className="input-warning" type="checkbox" defaultChecked />
              <FormCheck.Label>warning</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch mb-2">
              <FormCheck.Input className="input-info" type="checkbox" defaultChecked />
              <FormCheck.Label>info</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch mb-2">
              <FormCheck.Input className="input-dark" type="checkbox" defaultChecked />
              <FormCheck.Label>dark</FormCheck.Label>
            </FormCheck>
            <small className="form-text text-muted">
              Use class <code>input-[color name]</code>in <code>&lt;input&gt;</code> tag
            </small>
          </Form>
        </Col>

        <Col md={4}>
          <h5>Custom Switch</h5>
          <hr />

          <Form>
            <FormCheck className="form-switch custom-switch-v1  mb-2">
              <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
              <FormCheck.Label>primary</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-secondary" type="checkbox" defaultChecked />
              <FormCheck.Label>secondary</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className=" input-success" type="checkbox" defaultChecked />
              <FormCheck.Label>success</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-danger" type="checkbox" defaultChecked />
              <FormCheck.Label>danger</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-warning" type="checkbox" defaultChecked />
              <FormCheck.Label>warning</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-info" type="checkbox" defaultChecked />
              <FormCheck.Label>info</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-dark" type="checkbox" defaultChecked />
              <FormCheck.Label>dark</FormCheck.Label>
            </FormCheck>
            <small className="form-text text-muted">
              Use class <code>custom-switch-v1</code>in <code>{`<div>`}</code> tag
            </small>
          </Form>
        </Col>

        <Col md={4}>
          <h5>Custom Switch</h5>
          <hr />

          <Form>
            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-light-primary" type="checkbox" defaultChecked />
              <FormCheck.Label>primary</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-light-secondary" type="checkbox" defaultChecked />
              <FormCheck.Label>secondary</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className=" input-light-success" type="checkbox" defaultChecked />
              <FormCheck.Label>success</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-light-danger" type="checkbox" defaultChecked />
              <FormCheck.Label>danger</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-light-warning" type="checkbox" defaultChecked />
              <FormCheck.Label>warning</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-light-info" type="checkbox" defaultChecked />
              <FormCheck.Label>info</FormCheck.Label>
            </FormCheck>

            <FormCheck className="form-switch custom-switch-v1 mb-2">
              <FormCheck.Input className="input-light-dark" type="checkbox" defaultChecked />
              <FormCheck.Label>dark</FormCheck.Label>
            </FormCheck>
            <small className="form-text text-muted">
              Use class <code>input-light-[color name]</code>
            </small>
          </Form>
        </Col>
      </Row>
    </MainCard>
  );
}
