// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';

// =============================|| USERS - PROJECT COLLABORATION CARD ||============================== //

export default function ProjectCollaborationCard() {
  return (
    <>
      <MainCard
        headerClassName="border-bottom-0"
        className="Design-sprint bg-brand-color-2"
        title={<span className="text-white f-w-600">Project Design Sprint</span>}
        subheader={<p className="d-block f-w-300 mt-3 text-white card-text">11 MAY 10:35</p>}
      >
        <p className="text-white f-w-300">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
        <p className="text-white f-w-300">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>

        <Nav className="design-image" as="ul">
          <Nav.Item as="li" className="me-2">
            <Button className="btn-icon" variant="light">
              <i className="ti ti-plus f-14 me-0" />
            </Button>
          </Nav.Item>
          <Nav.Item as="li" className="me-2">
            <Image src={Avatar1} width={40} className="rounded-pill" />
          </Nav.Item>

          <Nav.Item as="li" className="me-2">
            <Image src={Avatar2} width={40} className="rounded-pill" />
          </Nav.Item>

          <Nav.Item as="li">
            <Image src={Avatar3} width={40} className="rounded-pill" />
          </Nav.Item>

          <Nav.Item className="text-white" as="li">
            <Nav.Link className="text-white">+63</Nav.Link>
          </Nav.Item>
        </Nav>
      </MainCard>
    </>
  );
}
