// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MULTI LAYOUTS - 2 COLUMNS HORIZONTAL FORM ||============================== //

export default function TwoColumnsHorizontalFormPage() {
  return (
    <MainCard title="2 Columns Horizontal Form Layout">
      <Row className="mb-3 g-3">
        <Col lg={2} className="col-form-label">
          <Form.Label>Name:</Form.Label>
        </Col>
        <Col lg={3}>
          <Form.Control type="text" placeholder="Enter full name" />
          <Form.Text>Please enter your full name</Form.Text>
        </Col>
        <Col lg={2} className="col-form-label">
          <Form.Label>Email:</Form.Label>
        </Col>
        <Col lg={3}>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text>Please enter your Email id</Form.Text>
        </Col>
      </Row>

      <Row className="mb-3 g-3">
        <Col lg={2} className="col-form-label">
          <Form.Label>Password:</Form.Label>
        </Col>
        <Col lg={3}>
          <InputGroup>
            <Form.Control type="password" placeholder="Enter your Password" />
            <InputGroup.Text>
              <i className="ph ph-lock-key" />
            </InputGroup.Text>
          </InputGroup>
          <Form.Text>Please enter your Password</Form.Text>
        </Col>
        <Col lg={2} className="col-form-label">
          <Form.Label>Profile URL:</Form.Label>
        </Col>
        <Col lg={3}>
          <InputGroup>
            <Form.Control type="email" placeholder="Enter your Profile URL" />
            <InputGroup.Text>
              <i className="ph ph-link" />
            </InputGroup.Text>
          </InputGroup>
          <Form.Text>Please enter your Profile URL</Form.Text>
        </Col>
      </Row>

      <Row className="mb-3 g-3 align-items-center">
        <Col lg={2} className="col-form-label">
          <Form.Label className="mb-0">User Type:</Form.Label>
        </Col>
        <Col lg={3}>
          <Form.Check type="radio" name="userType" label="Administrator" id="Administrator" defaultChecked />
          <Form.Check type="radio" name="userType" label="Author" id="Author" />
        </Col>
      </Row>
    </MainCard>
  );
}
