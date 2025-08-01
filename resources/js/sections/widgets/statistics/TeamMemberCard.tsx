// react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';

// =============================|| STATISTICS - TEAM MEMBER CARD ||============================== //

export default function TeamMemberCard() {
  return (
    <MainCard className="team-leader">
      <Carousel prevIcon={false}>
        <Carousel.Item>
          <Row>
            <Col xs="auto">
              <Image className="rounded-circle" src={Avatar1} width={85} alt="activity-user" />
            </Col>
            <Col>
              <h5 className="mb-3">Jarvis Pepperspray</h5>
              <span className="f-w-300 text-muted mb-3 d-block">Separated they live in Bookmarksgrove..</span>
              <span>Team leader</span>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row>
            <Col xs="auto">
              <Image className="rounded-circle" src={Avatar2} width={85} alt="activity-user" />
            </Col>
            <Col>
              <h5 className="mb-3">Jarvis Pepperspray</h5>
              <span className="f-w-300 text-muted mb-3 d-block">Separated they live in Bookmarksgrove..</span>
              <span>Team leader</span>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row>
            <Col xs="auto">
              <Image className="rounded-circle" src={Avatar3} width={85} alt="activity-user" />
            </Col>
            <Col>
              <h5 className="mb-3">Jarvis Pepperspray</h5>
              <span className="f-w-300 text-muted mb-3 d-block">Separated they live in Bookmarksgrove..</span>
              <span>Team leader</span>
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </MainCard>
  );
}
