// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// types
import { UserProfileProps } from '@/types/userProfile';

// assets
import avatar5 from '@assets/images/user/avatar-5.png';

interface ProfileData {
  id: string;
  icon: string;
  label: string;
}

// profile tabs
const profileTabs: ProfileData[] = [
  { id: 'profile-overview', icon: 'ph ph-user', label: 'Profile Overview' },
  { id: 'personal-information', icon: 'ph ph-file-text', label: 'Personal Information' },
  { id: 'account-information', icon: 'ph ph-book', label: 'Account Information' },
  { id: 'change-password', icon: 'ph ph-shield', label: 'Change Password' },
  { id: 'email-settings', icon: 'ph ph-envelope-simple', label: 'Email Settings' }
];

// =============================|| PROFILE - USER PROFILE ||============================== //

export default function UserProfile({ activeProfileTab, handleActiveProfileTab }: UserProfileProps) {
  return (
    <>
      <MainCard className="user-card user-card-1" bodyClassName="p-0">
        <Card.Body className="pb-0">
          <div className="float-end">
            <Badge bg="light-danger">Pro</Badge>
          </div>
          <Stack direction="horizontal" className="user-about-block align-items-center mt-0 mb-3">
            <div className="flex-shrink-0">
              <div className="position-relative d-inline-block">
                <Image fluid className="img-radius wid-80" src={avatar5} alt="User" />
                <div className="certificated-badge">
                  <i className="ti ti-rosette-discount-check-filled text-primary bg-icon" />
                </div>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="mb-1">Suzen</h6>
              <p className="mb-0 text-muted">UI/UX Designer</p>
            </div>
          </Stack>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <i className="ph ph-envelope-simple m-r-10" />
            Email
            <a href="mailto:demo@sample" className="float-end text-body">
              demo@sample.com
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            <i className="ph ph-phone-call m-r-10" />
            Phone
            <a className="float-end text-body">(+99) 9999 999 999</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <i className="ph ph-map-pin-line m-r-10" />
            Location
            <span className="float-end">Melbourne</span>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Row className="text-center">
            <Col>
              <h6 className="mb-1">37</h6>
              <p className="mb-0">Mails</p>
            </Col>
            <Col className="border-start">
              <h6 className="mb-1">2749</h6>
              <p className="mb-0">Followers</p>
            </Col>
            <Col className="border-start">
              <h6 className="mb-1">678</h6>
              <p className="mb-0">Following</p>
            </Col>
          </Row>
        </Card.Body>
        <ListGroup variant="flush" as="div" className="nav flex-column nav-pills list-pills" role="tablist" aria-orientation="vertical">
          {profileTabs.map(({ id, icon, label }) => (
            <a
              key={id}
              className={`nav-link list-group-item list-group-item-action ${activeProfileTab === id ? 'active' : ''}`}
              onClick={() => handleActiveProfileTab && handleActiveProfileTab(id)}
            >
              <i className={`${icon} m-r-10 h5`} /> {label}
              <span className="float-end">
                <i className="ph ph-caret-right" />
              </span>
            </a>
          ))}
        </ListGroup>
      </MainCard>
      <MainCard
        title="Hello Card"
        secondary={
          <Dropdown align="end">
            <Dropdown.Toggle as="div" bsPrefix="toggle" className="p-0 border-0 bg-transparent cursor-pointer btn-icon">
              <i className="ti ti-dots" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="card-option">
              <Dropdown.Item href="#" className="full-card text-primary">
                <i className="ti ti-maximize me-2" /> Maximize
              </Dropdown.Item>
              <Dropdown.Item href="#" className="minimize-card text-primary">
                <i className="ti ti-minus me-2" /> Collapse
              </Dropdown.Item>
              <Dropdown.Item href="#" className="reload-card text-primary">
                <i className="ti ti-refresh me-2" /> Reload
              </Dropdown.Item>
              <Dropdown.Item href="#" className="close-card text-primary">
                <i className="ti ti-trash me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        }
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
      </MainCard>
    </>
  );
}
