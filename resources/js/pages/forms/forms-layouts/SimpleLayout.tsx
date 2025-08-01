import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ControlDivider from '@/sections/forms/form-layouts/layouts/ControlDivider';
// import HorizontalFormLayout from '@/sections/forms/form-layouts/layouts/HorizontalFormLayout';
import InputLabelAlignment from '@/sections/forms/form-layouts/layouts/InputLabelAlignment';
import SimpleFormLayout from '@/sections/forms/form-layouts/layouts/SimpleFormLayout';

// ==============================|| FORM LAYOUTS - SIMPLE ||============================== //

export default function SimpleLayoutPage() {
  return (
    <AppLayout>
      <Head title="Simple Layout" />
      <Row>
        <Col lg={6}>
          <SimpleFormLayout />
          <ControlDivider />
        </Col>

        <Col lg={6}>
          {/* <HorizontalFormLayout /> */}
          <InputLabelAlignment />
        </Col>
      </Row>
    </AppLayout>
  );
}
