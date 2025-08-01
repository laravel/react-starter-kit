// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| ACTION BAR - LAYOUT WITH SIDE ACTION BUTTON ||============================== //

export default function LayoutWithSideActionButtonPage() {
  return (
    <MainCard>
      <h5>Layout with Side Action Button</h5>
      <hr />
      <Form>
        <Form.Group className="mb-0">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
          <Form.Text>Please enter your Name</Form.Text>
          <hr />

          <Row>
            <Col lg={6}>
              <Stack direction="horizontal" gap={1}>
                <Button type="submit" variant="light-primary">
                  Save
                </Button>
                <Button type="submit" variant="light-secondary">
                  Clear
                </Button>
              </Stack>
            </Col>

            <Col lg={6}>
              <Button type="submit" variant="light-danger" className="float-end">
                Delete
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </MainCard>
  );
}
