// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// assets
import CardImg from '@assets/images/light-box/l3.jpg';

// ==============================|| CARD - HORIZONTAL ||============================== //

export default function Horizontal() {
  return (
    <Row>
      <Col xl={12} className="mt-4">
        <h5>Horizontal</h5>
        <hr />
        <Card>
          <Row className="g-0">
            <Col md={4}>
              <Card.Img className="img-fluid rounded-md-start" src={CardImg} />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title as="h5">Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
