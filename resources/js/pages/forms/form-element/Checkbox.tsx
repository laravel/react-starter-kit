import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ColorOptions from '@/sections/forms/form-element/checkbox/ColorOptions';
import CustomCheckbox from '@/sections/forms/form-element/checkbox/CustomCheckbox';

// =============================|| FORM ELEMENT - CHECKBOX ||============================== //

export default function CheckboxPage() {
  return (
    <AppLayout>
      <Head title="Checkbox" />
      <Row>
        <Col xs={12}>
          <CustomCheckbox />
          <ColorOptions />
        </Col>
      </Row>
    </AppLayout>
  );
}
