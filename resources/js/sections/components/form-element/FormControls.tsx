// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-import
import MainCard from '@/components/MainCard';

// =============================|| FORM CONTROLS ||============================== //

export default function FormControls() {
  return (
    <MainCard title="Form Controls">
      <Row>
        <Col md={6}>
          <Form>
            <div className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <small>We'll never share your email with anyone else. </small>
            </div>
            <div className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </div>
            <div className="mb-3">
              <Form.Check type="checkbox" label="Check me out" />
            </div>
            <Button type="submit" className="mb-4">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <Form>
            <div className="mb-3">
              <Form.Label>Text</Form.Label>
              <Form.Control type="text" placeholder="Text" />
            </div>

            <div className="mb-3">
              <Form.Label>Example select</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </div>

            <div className="mb-3">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </div>
          </Form>
        </Col>
      </Row>
    </MainCard>
  );
}
