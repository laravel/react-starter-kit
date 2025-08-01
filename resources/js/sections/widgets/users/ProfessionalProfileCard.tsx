// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar3 from '@assets/images/user/avatar-3.png';

// =============================|| USERS - PROFESSIONAL PROFILE CARD ||============================== //

export default function ProfessionalProfileCard() {
  return (
    <MainCard bodyClassName="p-0">
      <div className="text-center project-main">
        <Image src={Avatar3} />
        <h5 className="mt-4">Alma Christensen</h5>
        <span>UX Designer</span>
        <Row className="m-t-30">
          <Col xs={6} className=" p-r-0">
            <div className="d-grid">
              <Button className="text-uppercase">add friend</Button>
            </div>
          </Col>
          <Col xs={6}>
            <div className="d-grid">
              <Button className=" text-uppercase border" variant="outline-secondary">
                message
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="border-top" />
      <div className="project-main">
        <Row className=" text-center">
          <Col md={4} xs={6}>
            <h6 className="text-muted m-0">
              <i className="ti ti-star-filled  m-r-5 f-18" /> 4.8
            </h6>
          </Col>
          <Col md={4} xs={6}>
            <h6 className="text-muted m-0">
              <i className="ti ti-map-pin-filled m-r-5 f-18" />
              USA
            </h6>
          </Col>
          <Col md={4} xs={6}>
            <h6 className="text-muted m-0">
              <i className="ti ti-file-description-filled m-r-5 f-18" /> 28 Task
            </h6>
          </Col>
        </Row>
      </div>
    </MainCard>
  );
}
