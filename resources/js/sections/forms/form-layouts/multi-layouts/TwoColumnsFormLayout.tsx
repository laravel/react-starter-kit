// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MULTI LAYOUTS - 2 COLUMNS FORM LAYOUT ||============================== //

export default function TwoColumnsFormLayoutPage() {
  return (
    <MainCard title="2 Columns Form Layout">
      <Form>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
              <Form.Text>Please enter your full name</Form.Text>
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text>Please enter your Email id</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <InputGroup>
                <Form.Control type="password" placeholder="Please enter your Password" />
                <InputGroup.Text>
                  <i className="ti ti-lock f-18" />
                </InputGroup.Text>
              </InputGroup>
              <Form.Text>Please enter your Password</Form.Text>
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Profile URL:</Form.Label>
              <InputGroup>
                <Form.Control type="url" placeholder="Please enter your Profile URL" />
                <InputGroup.Text>
                  <i className="ti ti-link f-18" />
                </InputGroup.Text>
              </InputGroup>
              <Form.Text>Please enter your Profile URL</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={6}>
            <Form.Label>User Type:</Form.Label>
            <Form.Check type="radio" name="userType" label="Administrator" id="Administrator" defaultChecked />
            <Form.Check type="radio" name="userType" label="Author" id="Author" />
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
