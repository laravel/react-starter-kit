import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import LauOutThree from '@/sections/layouts/LayoutThree';

// =================|| LAYOUTS - LAYOUT THREE ||============================== //

export default function LayoutThreeMain() {
  return (
    <AppLayout>
      <Head title="Layout 3" />
      <Row>
        <Col xs={12}>
          <LauOutThree />
        </Col>
      </Row>
    </AppLayout>
  );
}
