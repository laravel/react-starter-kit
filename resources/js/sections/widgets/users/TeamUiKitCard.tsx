// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/widget/dashborad-1.jpg';
import Avatar3 from '@assets/images/user/avatar-1.png';
import Avatar4 from '@assets/images/user/avatar-2.png';
import Avatar5 from '@assets/images/user/avatar-3.png';

// =============================|| USERS - TEAM UIKIT CARD ||============================== //

export default function TeamUiKitCard() {
  return (
    <MainCard className="dashboard-kit widget-focus">
      <h5>Dashboard UI Kit</h5>
      <span className="text-muted">By Creative Studio Form</span>
      <Image src={Avatar1} className="card-img mt-4" />

      <Nav className="design-image" as="ul">
        <Nav.Item className="me-2">
          <Button className="bg-primary text-white" variant="link-secondary">
            <i className="ti ti-plus me-0" />
          </Button>
        </Nav.Item>
        <Nav.Item className="me-2">
          <Image src={Avatar3} width={40} />
        </Nav.Item>

        <Nav.Item className="me-2">
          <Image src={Avatar4} width={40} />
        </Nav.Item>

        <Nav.Item>
          <Image src={Avatar5} width={40} />
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            +63
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </MainCard>
  );
}
