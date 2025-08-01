// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-2.png';

// =============================|| USERS - USER SOCIAL STATS CARD ||============================== //

export default function UserSocialStatsCard() {
  return (
    <MainCard bodyClassName="text-center">
      <h5>Alma Christensen</h5>
      <span className="d-block mb-4">UX Designer</span>
      <Image className="img-fluid rounded-circle" src={Avatar1} width={70} />
      <Row className="m-t-30">
        <Col md={4} xs={6}>
          <h5>974</h5>
          <span className="text-muted">IMAGES</span>
        </Col>

        <Col md={4} xs={6}>
          <h5>35.7k</h5>
          <span className="text-muted">LIKES</span>
        </Col>

        <Col md={4} xs={12}>
          <h5>236</h5>
          <span className="text-muted">FOLLOW</span>
        </Col>
      </Row>

      <div className="designer m-t-30">
        <div className="d-grid">
          <Button className=" shadow-2 text-uppercase btn-block">add friend</Button>
        </div>
      </div>
    </MainCard>
  );
}
