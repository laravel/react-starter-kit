// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| LAYOUTS - INPUT LABEL ALIGNMENT ||============================== //

export default function InputLabelAlignmentPage() {
  return (
    <MainCard title="Input Label Alignment">
      <Form>
        <h5 className="mb-3">A. Personal Info:</h5>
        <Row className="mb-3">
          <Col lg={4} className="text-lg-end">
            <Form.Label className="col-form-label">Name:</Form.Label>
          </Col>
          <Col lg={6}>
            <Form.Control type="text" placeholder="Enter full name" />
            <Form.Text>Please enter your full name</Form.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4} className="text-lg-end">
            <Form.Label className="col-form-label">Email:</Form.Label>
          </Col>
          <Col lg={6}>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text>Please enter your Email</Form.Text>
          </Col>
        </Row>
        <hr className="my-4" />
        <h5 className="mb-3">B. Educational Info:</h5>
        <Row className="mb-3">
          <Col lg={4} className="text-lg-end">
            <Form.Label className="col-form-label">Degree Name:</Form.Label>
          </Col>
          <Col lg={6}>
            <Form.Control type="text" placeholder="Enter full name" />
            <Form.Text>Please enter your Final Degree</Form.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4} className="text-lg-end">
            <Form.Label className="col-form-label">Passing Year</Form.Label>
          </Col>
          <Col lg={6}>
            <Form.Control type="text" placeholder="Enter Passing Year" />
          </Col>
        </Row>
        <Row className="mb-0 align-items-center">
          <Col lg={4} className="text-lg-end">
            <Form.Label className="col-form-label">language:</Form.Label>
          </Col>
          <Col lg={6}>
            <Form.Check required label="English" feedbackType="invalid" defaultChecked />
            <Form.Check required label="French" feedbackType="invalid" />
            <Form.Check required label="Dutch" feedbackType="invalid" />
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
