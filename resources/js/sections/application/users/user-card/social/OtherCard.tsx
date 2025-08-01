// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BackGroundCover from './BackGroundCover';
import BackGroundProfile from './BackGroundProfile';
import SocialLink1 from './SocialLink1';
import SocialLink2 from './SocialLink2';
import SocialProfileBadge from './SocialProfileBadge';
import UserProfile from './UserProfile';
import UserProfile2 from './UserProfile2';
import UserSettings from './UserSettings';
import UserCard4 from '@/sections/application/users/user-card/social/UserCard4';
import MainCard from '@/components/MainCard';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import avatar2 from '@assets/images/user/avatar-2.png';
import Image from 'react-bootstrap/Image';

// ==============================|| SOCIAL -  OTHER CARD ||============================== //

export default function OtherCard() {
  return (
    <Row className="mb-4">
      <Col xl={4} md={6}>
        <h6 className="text-center mb-3">User card 3</h6>
        <MainCard
          className="user-card user-card-3 support-bar1"
          footerClassName="bg-light"
          footer={
            <Row className="text-center">
              {[
                { label: 'Mails', count: 37 },
                { label: 'Followers', count: 2749 },
                { label: 'Following', count: 678 }
              ].map((item, index) => (
                <Col key={index}>
                  <h6 className="mb-1">{item.count}</h6>
                  <p className="mb-0">{item.label}</p>
                </Col>
              ))}
            </Row>
          }
        >
          <div className="text-center">
            <Image fluid className="img-radius wid-150" src={avatar1} alt="User image" />
            <h3 className="mb-1 mt-3 f-w-400">Sara Soudein</h3>
            <p className="mb-3 text-muted">UI/UX Designer</p>
          </div>
        </MainCard>
      </Col>
      <Col xl={4} md={6}>
        <>
          <h6 className="text-center mb-3">Hover data</h6>
          <MainCard
            className="user-card user-card-3 support-bar1 mb-0"
            bodyClassName="p-0"
            footerClassName="bg-light"
            footer={
              <Row className="text-center">
                {[
                  { label: 'Mails', count: 37 },
                  { label: 'Followers', count: 2749 },
                  { label: 'Following', count: 678 }
                ].map((item, index) => (
                  <Col key={index}>
                    <h6 className="mb-1">{item.count}</h6>
                    <p className="mb-0">{item.label}</p>
                  </Col>
                ))}
              </Row>
            }
          >
            <Card.Body>
              <div className="text-center">
                <Image fluid className="img-radius wid-150" src={avatar2} alt="User image" />
                <h3 className="mb-1 mt-3 f-w-400">Jully Doe</h3>
                <p className="mb-3 text-muted">UI/UX Designer</p>
              </div>
            </Card.Body>
            <Card.Body className="hover-data text-white">
              <div>
                <h4 className="text-white">Hire Me?</h4>
                <p className="mb-1">Lorem Ipsum is simply dummy text</p>
                <p className="mb-3">been the industry's standard</p>
                <Button variant="warning" className="me-1">
                  <i className="ti ti-link" /> Meeting
                </Button>
                <Button variant="danger">
                  <i className="ti ti-download" /> Resume
                </Button>
              </div>
            </Card.Body>
          </MainCard>
        </>
      </Col>
      <Col xl={4} md={6}>
        <SocialProfileBadge />
      </Col>
      <Col xl={4} md={6}>
        <SocialLink1 userName="Josephin Doe" />
      </Col>
      <Col xl={4} md={6}>
        <SocialLink2 userName="Joseph William" />
      </Col>
      <Col xl={4} md={6}>
        <UserCard4 />
      </Col>
      <Col xl={4} md={6}>
        <UserProfile />
      </Col>
      <Col xl={4} md={6}>
        <UserProfile2 />
      </Col>
      <Col xl={4} md={6}>
        <BackGroundProfile />
      </Col>
      <Col xl={4} md={6}>
        <BackGroundCover />
      </Col>
      <Col xl={5} md={6}>
        <UserSettings />
      </Col>
    </Row>
  );
}
