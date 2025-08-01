// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import slider7 from '@assets/images/widget/slider7.jpg';

// ==============================|| SIMPLE CARD - CARD HOVER ||============================== //

export default function CardHover({ title }: { title: string }) {
  return (
    <>
      <h6 className="text-center mb-3">{title}</h6>
      <MainCard className="user-card user-card-1" bodyClassName="p-0">
        <Card.Header className="border-0 p-2 pb-0">
          <div className="cover-img-block">
            <Image src={slider7} alt="image" fluid />
          </div>
        </Card.Header>
        <Card.Body className="pt-0">
          <div className="user-about-block text-center">
            <Row className="align-items-end">
              <Col></Col>
              <Col>
                <div className="position-relative d-inline-block">
                  <Image className="img-radius img-fluid wid-80" src={avatar1} alt="User image" />
                </div>
              </Col>
              <Col></Col>
            </Row>
          </div>
          <div className="text-center">
            <h6 className="mb-1 mt-3">John Doe</h6>
            <p className="mb-3 text-muted">UI/UX Designer</p>
            <p className="mb-1">Lorem Ipsum is simply dummy text</p>
            <p className="mb-0">been the industry's standard</p>
          </div>
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
        </Card.Body>
        <Card.Body className="hover-data text-white">
          <div>
            <h4 className="text-white">Hire Me?</h4>
            <p className="mb-1">Lorem Ipsum is simply dummy text</p>
            <p className="mb-3">been the industry's standard</p>
            <Button variant="warning" className="me-1">
              <i className="ph ph-link align-middle" /> Meeting
            </Button>
            <Button variant="danger">
              <i className="ph ph-trash align-middle" /> Resume
            </Button>
          </div>
        </Card.Body>
      </MainCard>
    </>
  );
}
