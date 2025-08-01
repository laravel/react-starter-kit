import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import LayoutTwo from '@/sections/layouts/LayoutTwo';

// ==============================|| LAYOUT - LAYOUT TWO ||============================== //

export default function LayoutTwoMain() {
  return (
    <AppLayout>
      <Head title="Layout 2" />
      <Row>
        <Col xs={12}>
          <LayoutTwo />
        </Col>
      </Row>
    </AppLayout>
  );
}
