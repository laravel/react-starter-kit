import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import Pricing from '@/sections/admin-panel/online-courses/Pricing';

// ===============================|| ONLINE COURSES - PRICING ||============================== //

export default function PricingPage() {
  return (
    <AppLayout>
      <Head title="Pricing" />
      <Row>
        <Col xs={12}>
          <Pricing />
        </Col>
      </Row>
    </AppLayout>
  );
}
