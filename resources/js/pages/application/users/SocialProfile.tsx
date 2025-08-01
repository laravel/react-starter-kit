import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

// project-imports
import Gallery from '@/sections/application/users/social-profile/Gallery';
import Friends from '@/sections/application/users/social-profile/Friends';
import Home from '@/sections/application/users/social-profile/Home';
import Message from '@/sections/application/users/social-profile/Message';
import MyContacts from '@/sections/application/users/social-profile/MyContacts';
import Profile from '@/sections/application/users/social-profile/Profile';
import SocialProfileOverview from '@/sections/application/users/social-profile/SocialProfileOverview';

// ==============================|| USERS - SOCIAL PROFILE ||============================== //

export default function SocialProfilePage() {
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <>
      <AppLayout>
        <Head title="Social profile" />
        <SocialProfileOverview activeTab={activeTab} setActiveTab={setActiveTab} />
        <Row>
          <Col md={8} className="order-md-2">
            <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
              <Tab.Content id="myTabContent">
                <Tab.Pane eventKey="home">
                  <Home />
                </Tab.Pane>
                <Tab.Pane eventKey="profile">
                  <Profile />
                </Tab.Pane>
                <Tab.Pane eventKey="mycontacts">
                  <MyContacts />
                </Tab.Pane>
                <Tab.Pane eventKey="gallery">
                  <Gallery />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
          <Col md={4} className="order-md-1">
            <Friends />
            <Message />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
