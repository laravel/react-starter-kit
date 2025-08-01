// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-2.png';

// =============================|| USERS - USER PROFILE INTERACTION CARD ||============================== //

export default function UserProfileInteractionCard() {
  return (
    <MainCard>
      <div className="text-center m-b-30">
        <Image className="img-fluid rounded-circle" src={Avatar1} />
        <h5 className="mt-3">Mille Jensen</h5>
        <span className="d-block">Ninja Level 14</span>
      </div>
      <h6 className=" mb-0">
        754 Points <span className="float-end">1000</span>
      </h6>
      <ProgressBar className="m-t-10" children={<ProgressBar now={70} className="bg-brand-color-1" />} />

      <Row className="m-t-30">
        <Col xs={6} className="p-r-0">
          <div className="d-grid">
            <Button className="text-uppercase">Add friend</Button>
          </div>
        </Col>

        <Col xs={6}>
          <div className="d-grid">
            <Button className="text-uppercase border" variant="outline-secondary">
              Message
            </Button>
          </div>
        </Col>
      </Row>
    </MainCard>
  );
}
