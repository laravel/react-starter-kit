// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// assets
import blurBackground from '@assets/images/widget/user-blur-bg.png';
import slider7 from '@assets/images/widget/slider7.jpg';

// ==============================|| USER CARD 4 ||============================== //

export default function UserCard4() {
  return (
    <>
      <h6 className="text-center mb-3">User card 4</h6>
      <Card className="text-center">
        <div className="widget-profile-card-1">
          <Image src={slider7} alt="card-style-1" fluid />
          <div className="middle-user">
            <Image fluid className="img-thumbnail" src={blurBackground} alt="Profile-user" />
          </div>
        </div>
        <Card.Body>
          <Card.Title as="h3">Lary Doe</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Web Designer</Card.Subtitle>
          <Card.Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci a, rem accusantium recusandae beatae.</Card.Text>
        </Card.Body>
        <Card.Footer className="bg-inverse">
          <Row className="text-center">
            <Col>
              <h4>400</h4>
              <span>Designs</span>
            </Col>
            <Col>
              <h4>90</h4>
              <span>Projects</span>
            </Col>
            <Col>
              <h4>70</h4>
              <span>Development</span>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}
