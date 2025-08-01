import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainProfile from '@/sections/application/users/profile/MainProfile';
import UserProfile from '@/sections/application/users/profile/UserProfile';

// ==============================|| USERS - PROFILE PAGE ||============================== //

export default function ProfilePage() {
  const [activeProfileTab, setActiveProfileTab] = useState<string>('profile-overview');

  const handleActiveProfileTab = (value: string) => {
    setActiveProfileTab(value);
  };

  return (
    <AppLayout>
      <Head title="Profile" />
      <Row>
        <Col lg={4}>
          <UserProfile activeProfileTab={activeProfileTab} handleActiveProfileTab={handleActiveProfileTab} />
        </Col>
        <Col lg={8}>
          <MainProfile activeProfileTab={activeProfileTab} />
        </Col>
      </Row>
    </AppLayout>
  );
}
