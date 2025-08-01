import { useEffect } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import Choices from 'choices.js';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| SELECT - FORM INTERACTION ||============================== //

export default function FormInteraction() {
  useEffect(() => {
    const choicesElement = document.getElementById('reset-simple') as HTMLSelectElement;
    if (choicesElement) {
      new Choices(choicesElement).setValue([]);
    }

    const choicesElement1 = document.getElementById('reset-multiple') as HTMLSelectElement;
    if (choicesElement1) {
      new Choices(choicesElement1, {
        removeItemButton: true
      }).setValue([]);
    }
  }, []);
  return (
    <MainCard title="Form interaction" subheader="Change the values and press reset to restore to initial state.">
      <Form>
        <Form.Group className="my-2 py-2" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Change me!
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="reset-simple" defaultValue="Option 2">
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
              <option value="Option 4">Option 4</option>
              <option value="Option 5">Option 5</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="my-2 py-2" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            And me!
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="reset-multiple" multiple defaultValue={['Choice 1']}>
              <option value="Choice 1">Choice 1</option>
              <option value="Choice 2">Choice 2</option>
              <option value="Choice 3">Choice 3</option>
              <option value="Choice 4" disabled>
                Choice 4
              </option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="my-2 py-2" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end" />
          <Col lg={6} md={11} sm={12}>
            <Button variant="light-warning" type="reset">
              <i className="ph ph-warning me-2" /> Reset
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </MainCard>
  );
}
