// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import profilePerson1 from '@assets/images/widget/profile-person1.jpg';

// ==============================|| SOCIAL - BACKROUND PROFILE ||============================== //

export default function BackGroundProfile() {
  return (
    <>
      <h6 className="text-center mb-3">Background profile image</h6>
      <MainCard
        className="text-center"
        footerClassName="bg-inverse"
        footer={
          <Row className="text-center">
            <Col>
              <h4>134</h4>
              <span>Shots</span>
            </Col>
            <Col>
              <h4>13,227</h4>
              <span>Shots</span>
            </Col>
            <Col>
              <h4>488</h4>
              <span>Shots</span>
            </Col>
          </Row>
        }
      >
        <div className="profile-card">
          <Image src={profilePerson1} alt="Profile Background" fluid />
          <Card.Body>
            <Card.Title as="h3" className="text-white">
              John Steve
            </Card.Title>
            <p className="mb-2 text-white">UI/UX Designer at CreativesCastle Studio</p>
            <Button variant="info">+ Follow</Button>
          </Card.Body>
        </div>
      </MainCard>
    </>
  );
}
