// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// ==============================|| SOCIAL -  CUSTOM CARD FOOTER ||============================== //

export default function CustomCardFooter() {
  return (
    <Card.Footer className="bg-light">
      <Row className="text-center">
        <Col>
          <h6 className="mb-1">37</h6>
          <p className="mb-0">Mails</p>
        </Col>
        <Col>
          <h6 className="mb-1">2749</h6>
          <p className="mb-0">Followers</p>
        </Col>
        <Col>
          <h6 className="mb-1">678</h6>
          <p className="mb-0">Following</p>
        </Col>
      </Row>
    </Card.Footer>
  );
}
