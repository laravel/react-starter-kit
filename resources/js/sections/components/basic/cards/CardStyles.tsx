// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// ==============================|| CARD - STYLES ||============================== //

export default function CardStyles() {
  return (
    <>
      <h5>Card Styles</h5>
      <hr />
      <Row>
        <Col sm={4}>
          <Card bg="primary" text="white">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title as="h5">Primary card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card bg="secondary" text="white">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title as="h5">secondary card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card bg="success" text="white">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title as="h5">success card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card bg="danger" text="white">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title as="h5">danger card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card bg="warning" text="white">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title as="h5">warning card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card bg="info" text="white">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title>info card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card bg="light" text="dark">
            <Card.Header className="text-muted">Header</Card.Header>
            <Card.Body>
              <Card.Title as="h5" className="text-muted ">
                light card title
              </Card.Title>
              <Card.Text className="text-muted">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card bg="dark" text="white">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title as="h5">dark card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
