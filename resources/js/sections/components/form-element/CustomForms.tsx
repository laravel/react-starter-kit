// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// project-import
import MainCard from '@/components/MainCard';

//  =============================|| CUSTOM FORMS ||============================== //

export default function CustomForms() {
  return (
    <MainCard title="Custom Forms">
      <Row className="g-4">
        <Col md={6}>
          <h5>Custom Select</h5>
          <hr />
          <InputGroup className="mb-3">
            <InputGroup.Text>Option</InputGroup.Text>
            <Form.Select>
              <option>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Select>
              <option>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <InputGroup.Text>Option</InputGroup.Text>
          </InputGroup>

          <InputGroup className="mb-3">
            <Button variant="outline-secondary">Button</Button>
            <Form.Select>
              <option>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Select>
              <option>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Button variant="outline-secondary">Button</Button>
          </InputGroup>
        </Col>

        <Col md={6}>
          <h5>Custom File Input</h5>
          <hr />
          <InputGroup className="mb-3">
            <InputGroup.Text typeof="file">Option</InputGroup.Text>
            <Form.Control type="file" />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control type="file" />
            <InputGroup.Text typeof="file">Option</InputGroup.Text>
          </InputGroup>

          <InputGroup className="mb-3">
            <Button variant="outline-secondary">Button</Button>
            <Form.Control type="file" />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control type="file" />
            <Button variant="outline-secondary">Button</Button>
          </InputGroup>
        </Col>
      </Row>
    </MainCard>
  );
}
