import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
//  react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import AdvanceInputAttributes from '@/sections/forms/form-element/form-options/AdvanceInputAttributes';
import BasicInputs from '@/sections/forms/form-element/form-options/BasicInputs';
import HTMLInputTypes from '@/sections/forms/form-element/form-options/HtmlInputTypes';
import InputAttributes from '@/sections/forms/form-element/form-options/InputAttributes';
import Sizing from '@/sections/forms/form-element/form-options/Sizing';

// =============================|| FORM ELEMENT - FORM OPTIONS ||============================== //

export default function FormOptionPage() {
  return (
    <AppLayout>
      <Head title="Form option" />
      <Row>
        <Col md={6}>
          <BasicInputs />
          <HTMLInputTypes />
        </Col>

        <Col md={6}>
          <Sizing />
          <InputAttributes />
          <AdvanceInputAttributes />
        </Col>
      </Row>
    </AppLayout>
  );
}
