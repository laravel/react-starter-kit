import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import Setting from '@/sections/admin-panel/membership/Setting';

// =============================|| MEMBERSHIP - SETTING ||============================== //

export default function SettingMainPage() {
  return (
    <AppLayout>
      <Head title="Setting" />
      <Row>
        <Col xs={12}>
          <Setting />
        </Col>
      </Row>
    </AppLayout>
  );
}
