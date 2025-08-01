// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// assets
import imgRound1 from '@assets/images/widget/img-round1.jpg';

// ==============================|| SOCIAL - USER PROFILE 2 ||============================== //

export default function UserProfile2() {
  return (
    <>
      <h6 className="text-center mb-3">User profile 2</h6>
      <Card className="text-center">
        <div
          className="widget-profile-card-3"
          style={{
            backgroundImage: `url('/src/assets/images/widget/slider5.jpg')`
          }}
        >
          <Image className=" img-thumbnail" src={imgRound1} alt="Profile-user" fluid />
        </div>
        <Card.Body>
          <Card.Title as="h3">John Doe</Card.Title>
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
