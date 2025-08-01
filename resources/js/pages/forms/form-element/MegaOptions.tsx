import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import HorizontalFormExample from '@/sections/forms/form-element/mega-options/HorizontalFormExample';
import MegaOptionsExample from '@/sections/forms/form-element/mega-options/MegaOptionExmaple.';

// =============================|| FORM ELEMENT - MEGA OPTIONS ||============================== //

export default function MegaOptionsPage() {
  return (
    <AppLayout>
      <Head title="Mega option" />
      <Row>
        <Col xs={12}>
          <MegaOptionsExample />
          <HorizontalFormExample />
        </Col>
      </Row>
    </AppLayout>
  );
}
