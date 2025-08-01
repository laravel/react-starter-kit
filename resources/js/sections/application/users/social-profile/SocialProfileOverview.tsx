import { JSX } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatarImage5 from '@assets/images/user/avatar-5.png';
import cover from '@assets/images/profile/cover.jpg';

interface SocialProfileOverviewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabIcons: { [key: string]: JSX.Element } = {
  home: <i className="ph ph-house align-middle" />,
  profile: <i className="ph ph-user align-middle" />,
  mycontacts: <i className="ph ph-phone align-middle" />,
  gallery: <i className="ph ph-image align-middle" />
};

// ==============================|| SOCIAL PROFILE - SOCIAL PROFILE OVERVIEW ||============================== //

export default function SocialProfileOverview({ activeTab, setActiveTab }: SocialProfileOverviewProps) {
  return (
    <MainCard
      className="user-profile card user-card mb-4"
      headerClassName="border-0 p-0 pb-0"
      bodyClassName="py-0"
      title={
        <div className="cover-img-block">
          <Image src={cover} alt="" fluid />
          <div className="overlay"></div>
          <div className="change-cover">
            <Dropdown>
              <Dropdown.Toggle variant="span" id="dropdown-cover">
                <i className="ph ph-camera" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  <i className="ph ph-cloud-arrow-up me-2" /> Upload new
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <i className="ph ph-image me-2" /> From photos
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <i className="ph ph-film-strip me-2" /> Upload video
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <i className="ph ph-trash me-2" /> Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      }
    >
      <div className="user-about-block m-0">
        <Row>
          <Col md={4} className="text-center mt-n5">
            <div className="change-profile text-center">
              <Dropdown className="w-auto d-inline-block">
                <Dropdown.Toggle variant="link" id="dropdown-profile">
                  <div className="profile-dp">
                    <div className="position-relative d-inline-block">
                      <Image fluid className="img-radius wid-100" src={avatarImage5} alt="User" />
                      <div className="certificated-badge">
                        <i className="ti ti-rosette-discount-check-filled text-primary bg-icon" />
                      </div>
                    </div>
                    <div className="overlay">
                      <span>Change</span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">
                    <i className="ph ph-cloud-arrow-up me-2" /> Upload new
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <i className="ph ph-image me-2" /> From photos
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <i className="ph ph-film-strip me-2 me-2" /> Protect
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <i className="ph ph-trash me-2" /> Remove
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <h5 className="mb-1">Lary Doe</h5>
            <p className="mb-2 text-muted">UI/UX Designer</p>
          </Col>
          <Col md={8} className="mt-md-4">
            <Row>
              <Col md={6}>
                <Stack as="a" direction="horizontal" className="mb-1 text-muted align-items-end text-h-primary">
                  <i className="ph ph-globe me-2 f-18" /> www.CodedTheme.com
                </Stack>
                <Stack
                  as="a"
                  direction="horizontal"
                  href="mailto:demo@domain.com"
                  className="mb-1 text-muted align-items-end text-h-primary"
                >
                  <i className="ph ph-envelope-simple me-2 f-18" /> demo@domain.com
                </Stack>
                <Stack as="a" direction="horizontal" className="mb-1 text-muted align-items-end text-h-primary">
                  <i className="ph ph-phone me-2 f-18" /> +1 9999-999-999
                </Stack>
              </Col>
              <Col md={6}>
                <Stack direction="horizontal" gap={3} className="align-items-start">
                  <i className="ph ph-map-pin f-18" />{' '}
                  <div>
                    <p className="mb-0 text-muted">4289 Calvin Street</p>
                    <p className="mb-0 text-muted">Baltimore, near MD Tower Maryland,</p>
                    <p className="mb-0 text-muted">Maryland (21201)</p>
                  </div>
                </Stack>
              </Col>
            </Row>
            <Nav variant="tabs" className="profile-tabs nav-fill" id="myTab">
              {['home', 'profile', 'mycontacts', 'gallery'].map((tab) => (
                <Nav.Item key={tab}>
                  <Nav.Link eventKey={tab} className="text-reset" active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                    <span className="me-2 ">{tabIcons[tab]}</span>{' '}
                    {tab === 'mycontacts' ? 'My Contacts' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>
      </div>
    </MainCard>
  );
}
