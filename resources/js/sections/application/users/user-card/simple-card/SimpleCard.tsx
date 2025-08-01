// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatar2 from '@assets/images/user/avatar-2.png';
import slider5 from '@assets/images/widget/slider5.jpg';

// =============================|| SIMPLE CARD - SIMPLE CARD ||==============================

export default function SimpleCard() {
  return (
    <>
      <h6 className="text-center mb-3">Simple</h6>
      <MainCard
        className="user-card user-card-1 shadow-sm"
        headerClassName="border-0 p-2 pb-0"
        bodyClassName="text-center pt-0"
        title={
          <div className="cover-img-block">
            <Image src={slider5} alt="Cover" fluid />
          </div>
        }
      >
        <div className="user-about-block">
          <Row>
            <Col>
              <Image src={avatar2} fluid className="wid-80 img-radius" />
            </Col>
          </Row>
        </div>
        <h6 className="mb-1 mt-3">Josephin Doe</h6>
        <p className="text-muted mb-3">UI/UX Designer</p>
        <p className="mb-1">Lorem Ipsum is simply dummy text</p>
        <p className="mb-0">been the industry's standard</p>
        <hr className="wid-80 pt-1 mx-auto my-4" />
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
      </MainCard>
    </>
  );
}
