// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/widget/dashborad-1.jpg';

// =============================|| USERS - PROFILE UIKIT CARD ||============================== //

export default function ProfileUiKitCard() {
  return (
    <MainCard headerClassName="p-0" title={<Image className="img-fluid" src={Avatar1} />}>
      <h5>Dashboard UI Kit</h5>
      <span className="text-muted">By Creative Studio Form</span>
      <Row className="m-t-30">
        <Col xs={6} className="p-r-0">
          <div className="d-grid">
            <Button className="text-uppercase">Add Friend</Button>
          </div>
        </Col>
        <Col xs={6}>
          <div className="d-grid">
            <Button variant="outline-secondary btn text-uppercase border">Message</Button>
          </div>
        </Col>
      </Row>
    </MainCard>
  );
}
