// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| ACTION BAR - HORIZONTAL FORM ||============================== //

export default function HorizontalFormPage() {
  return (
    <MainCard
      title="Horizontal Form"
      footerClassName="bg-light"
      footer={
        <Stack gap={2} direction="horizontal" className="justify-content-center">
          <Button type="submit">Submit</Button>
          <Button variant="secondary" type="reset">
            Clear
          </Button>
        </Stack>
      }
    >
      <Form>
        <Row className="mb-0">
          <Form.Label column lg={4} className="col-form-label">
            Name:
          </Form.Label>
          <Col lg={6}>
            <Form.Control type="text" placeholder="Enter Name" />
            <Form.Text>Please enter your Name</Form.Text>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
