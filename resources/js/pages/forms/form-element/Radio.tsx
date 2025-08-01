import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ColorOptions from '@/sections/forms/form-element/radio/ColorOptions';
import CustomRadio from '@/sections/forms/form-element/radio/CustomRadio';

// ===============================|| FORM ELEMENT - RADIO ||============================== //

export default function RadioPage() {
  return (
    <AppLayout>
      <Head title="Radio" />
      <Row>
        <Col xs={12}>
          <CustomRadio />
          <ColorOptions />
        </Col>
      </Row>
    </AppLayout>
  );
}
