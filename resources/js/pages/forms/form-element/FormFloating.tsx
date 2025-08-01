import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import FloatingLabels from '@/sections/forms/form-element/form-floating/FloatingLabels';
import Selects from '@/sections/forms/form-element/form-floating/Select';
import TextAreas from '@/sections/forms/form-element/form-floating/Textareas';

// ==============================|| FORM ELEMENT - FORM FLOATING ||============================== //

export default function FormFloatingPage() {
  return (
    <AppLayout>
      <Head title="Form Floating" />
      <Row>
        <Col xs={12}>
          <FloatingLabels />
          <TextAreas />
          <Selects />
        </Col>
      </Row>
    </AppLayout>
  );
}
