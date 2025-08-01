import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

// project-imports
import ClipImageCenter from '@/sections/application/users/user-card/clip-image/ClipImageCenter';
import ClipImageLeft from '@/sections/application/users/user-card/clip-image/ClipImageLeft';
import ClipImageRight from '@/sections/application/users/user-card/clip-image/ClipImageRight';
import ClipSliderCenter from '@/sections/application/users/user-card/clip-image/ClipSliderCenter';
import ClipSliderLeft from '@/sections/application/users/user-card/clip-image/ClipSliderLeft';
import ClipSliderRight from '@/sections/application/users/user-card/clip-image/ClipSliderRight';
import CardCertificatedBadge from '@/sections/application/users/user-card/simple-card/CardCertificatedBadge';
import CardHover from '@/sections/application/users/user-card/simple-card/CardHover';
import CardSlider from '@/sections/application/users/user-card/simple-card/CardSlider';
import CardWithOption from '@/sections/application/users/user-card/simple-card/CardWithOption';
import CardWithSelectedOption from '@/sections/application/users/user-card/simple-card/CardWithSelectedOption';
import Footer from '@/sections/application/users/user-card/Footer';
import OtherCard1 from '@/sections/application/users/user-card/social/OtherCard';
import SimpleCard from '@/sections/application/users/user-card/simple-card/SimpleCard';
import SocialLink1 from '@/sections/application/users/user-card/social/SocialLink1';
import SocialLink2 from '@/sections/application/users/user-card/social/SocialLink2';
import SocialProfile1 from '@/sections/application/users/user-card/social/SocialProfile1';
import SocialProfileBadge from '@/sections/application/users/user-card/social/SocialProfileBadge';

// ==============================|| USERS - USER CARD  ||============================== //

export default function UserCardPage() {
  return (
    <AppLayout>
      <Head title="User card" />
      <Row>
        <Col sm={12}>
          <Tab.Container defaultActiveKey="user1">
            <Row>
              <Col sm={12}>
                <Card>
                  <CardBody>
                    <Nav variant="pills">
                      <Nav.Item>
                        <Nav.Link eventKey="user1" className="text-uppercase">
                          Simple
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="user2" className="text-uppercase">
                          Clip Image
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="user3" className="text-uppercase">
                          Footer
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="user4" className="text-uppercase">
                          Social
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="user5" className="text-uppercase">
                          Other
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </CardBody>
                </Card>
              </Col>

              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="user1">
                    <Row className="mb-4">
                      <Col xl={4} md={6}>
                        <SimpleCard />
                      </Col>
                      <Col xl={4} md={6}>
                        <CardWithOption />
                      </Col>
                      <Col xl={4} md={6}>
                        <CardWithSelectedOption />
                      </Col>
                      <Col xl={4} md={6}>
                        <CardSlider title="Slider" />
                      </Col>
                      <Col xl={4} md={6}>
                        <CardCertificatedBadge title="Certificated Badge" />
                      </Col>
                      <Col xl={4} md={6}>
                        <CardHover title="Hover Data" />
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="user2">
                    <Row className="mb-4">
                      <Col xl={4} md={6}>
                        <ClipImageLeft />
                      </Col>
                      <Col xl={4} md={6}>
                        <ClipImageCenter />
                      </Col>
                      <Col xl={4} md={6}>
                        <ClipImageRight />
                      </Col>
                      <Col xl={4} md={6}>
                        <ClipSliderLeft />
                      </Col>
                      <Col xl={4} md={6}>
                        <ClipSliderCenter title="Center slider" />
                      </Col>
                      <Col xl={4} md={6}>
                        <ClipSliderRight />
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="user3">
                    <Footer />
                  </Tab.Pane>
                  <Tab.Pane eventKey="user4">
                    <Row>
                      <Col>
                        <SocialProfile1 />
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={4} md={6}>
                        <SocialProfileBadge />
                      </Col>
                      <Col xl={4} md={6}>
                        <SocialLink1 userName="Sara Soudein" />
                      </Col>
                      <Col xl={4} md={6}>
                        <SocialLink2 userName="Suzen" />
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="user5">
                    <OtherCard1 />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </AppLayout>
  );
}
