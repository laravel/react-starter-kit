// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MULTI LAYOUTS -  3 COLUMNS FORM LAYOUT ||============================== //

export default function ThreeColumnsFormLayoutPage() {
  return (
    <MainCard title="3 Columns Form Layout">
      <Form>
        <Row className="g-3">
          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
              <Form.Text>Please enter your full name</Form.Text>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text>Please enter your email</Form.Text>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="ph ph-lock-key" />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Enter full name" />
              </InputGroup>
              <Form.Text>Please enter your Password</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3">
          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Contact:</Form.Label>
              <Form.Control type="text" placeholder="Enter contact number" />
              <Form.Text>Please enter your contact</Form.Text>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Profile URL:</Form.Label>
              <InputGroup>
                <Form.Control type="email" placeholder="Profile URL" />
                <InputGroup.Text>
                  <i className="ph ph-link" />
                </InputGroup.Text>
              </InputGroup>
              <Form.Text>Please enter your email</Form.Text>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Pin code:</Form.Label>
              <Form.Control type="text" placeholder="Enter your Pin code" />
              <Form.Text>Please enter your Pin code</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3">
          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" placeholder="Enter your address" />
              <Form.Text>Please enter your address</Form.Text>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>User Type:</Form.Label>
              <Form.Check type="radio" name="userType" label="Administrator" id="Administrator" defaultChecked />
              <Form.Check type="radio" name="userType" label="Author" id="Author" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
