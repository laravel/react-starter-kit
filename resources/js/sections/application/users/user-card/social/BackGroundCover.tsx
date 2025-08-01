// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import blurBackground from '@assets/images/widget/user-blur-bg.png';
import bgBlur from '@assets/images/widget/blur-bg.png';

// ==============================|| SOCIAL - BACKROUND COVER ||============================== //

export default function BackGroundCover() {
  return (
    <>
      <h6 className="text-center mb-3">Backround cover image</h6>
      <MainCard className="text-center" bodyClassName="p-0">
        <div
          className="widget-main-card blur-user-card"
          style={{
            backgroundImage: `url(${bgBlur})`
          }}
        >
          <Image src={blurBackground} alt="Profile Background" fluid />
          <Card.Title as="h3" className="text-white">
            Linda Fox
          </Card.Title>
          <p className="text-white">UI Designer at CreativesCastle Studio</p>
          <Button variant="info" className="m-t-30">
            + Follow
          </Button>
          <Card.Footer className="mt-4">
            <Row className="text-center">
              <Col>
                <h4 className="text-white">134</h4>
                <span>Shots</span>
              </Col>
              <Col>
                <h4 className="text-white">13,227</h4>
                <span>Followers</span>
              </Col>
              <Col>
                <h4 className="text-white">488</h4>
                <span>Following</span>
              </Col>
            </Row>
          </Card.Footer>
        </div>
      </MainCard>
    </>
  );
}
