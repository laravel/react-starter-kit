import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import PricingCard from '@/sections/admin-panel/online-courses/setting/PricingCard';

// ==============================|| SETTING - PRICING ||============================== //

export default function PricingPage() {
  return (
    <AppLayout>
      <Head title="Pricing" />
      <Row>
        <Col xs={12}>
          <PricingCard
            title="Plans & Pricing"
            description="Every paid plan comes with educational resources and training to support you on your journey, along with a 30-day money-back guarantee."
          />
        </Col>
      </Row>
    </AppLayout>
  );
}
