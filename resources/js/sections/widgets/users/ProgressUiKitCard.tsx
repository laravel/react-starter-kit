// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar3 from '@assets/images/widget/dashborad-3.jpg';

// =============================|| USERS - PROGRESS UIKIT CARD ||============================== //

export default function ProgressUiKitCard() {
  return (
    <MainCard className="widget-focus">
      <Image className="card-img rounded" src={Avatar3} />
      <h5 className="m-t-35">Dashboard UI Kit</h5>
      <span className="text-muted d-block m-b-30">By Creative Studio Form</span>
      <h6 className="mb-0">
        $2356.23 <span className="float-end">$3200.00</span>
      </h6>
      <ProgressBar className="m-t-10" children={<ProgressBar now={69} className="bg-brand-color-1" />} />

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
