// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| ACTION BAR - TOP & BOTTOM ACTIONS BARS ||============================== //

export default function TopBottomActionsBarsPage() {
  return (
    <MainCard
      bodyClassName="p-0"
      title="Top & Bottom Actions Bars"
      footerClassName="bg-light"
      footer={
        <Stack gap={2} direction="horizontal" className="justify-content-center">
          <Button type="submit" variant="success">
            Submit
          </Button>
          <Button variant="secondary" type="reset">
            Clear
          </Button>
        </Stack>
      }
    >
      <Card.Body className=" border-bottom">
        <Row className="align-items-center">
          <Col sm={6}>Top Actions:</Col>
          <Col sm={6} className=" mt-3 mt-sm-0">
            <Stack gap={1} direction="horizontal" className="justify-content-sm-end">
              <Button type="submit" variant="success">
                Submit
              </Button>

              <Button type="submit" variant="secondary">
                Clear
              </Button>
            </Stack>
          </Col>
        </Row>
      </Card.Body>
      <Card.Body>
        <Form>
          <Form.Group className="mb-0">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
            <Form.Text>Please enter your Name</Form.Text>
          </Form.Group>
        </Form>
      </Card.Body>
    </MainCard>
  );
}
