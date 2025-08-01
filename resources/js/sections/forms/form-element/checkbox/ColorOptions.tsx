// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| FORM CHECKBOX - COLOR OPTIONS ||============================== //

export default function ColorOptionsPage() {
  return (
    <MainCard title="Color Options">
      <Form>
        <Row className="g-4">
          <Col md={6}>
            <FormCheck className="mb-2">
              <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
              <FormCheck.Label>primary</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-secondary" type="checkbox" defaultChecked />
              <FormCheck.Label>secondary</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-success" type="checkbox" defaultChecked />
              <FormCheck.Label>success</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-danger" type="checkbox" defaultChecked />
              <FormCheck.Label>danger</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-warning" type="checkbox" defaultChecked />
              <FormCheck.Label>warning</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-info" type="checkbox" defaultChecked />
              <FormCheck.Label>info</FormCheck.Label>
            </FormCheck>

            <FormCheck>
              <FormCheck.Input className="input-dark" type="checkbox" defaultChecked />
              <FormCheck.Label>dark</FormCheck.Label>
            </FormCheck>
          </Col>

          <Col md={6}>
            <FormCheck className="mb-2">
              <FormCheck.Input className="input-light-primary" type="checkbox" defaultChecked />
              <FormCheck.Label>primary light</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-light-secondary" type="checkbox" defaultChecked />
              <FormCheck.Label>secondary light</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-light-success" type="checkbox" defaultChecked />
              <FormCheck.Label>success light</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-light-danger" type="checkbox" defaultChecked />
              <FormCheck.Label>danger light</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-light-warning" type="checkbox" defaultChecked />
              <FormCheck.Label>warning light</FormCheck.Label>
            </FormCheck>

            <FormCheck className="mb-2">
              <FormCheck.Input className="input-light-info" type="checkbox" defaultChecked />
              <FormCheck.Label>info light</FormCheck.Label>
            </FormCheck>

            <FormCheck>
              <FormCheck.Input className="input-light-dark" type="checkbox" defaultChecked />
              <FormCheck.Label>dark light</FormCheck.Label>
            </FormCheck>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
