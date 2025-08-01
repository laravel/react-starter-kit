import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ChecksandRadios from '@/sections/components/form-element/ChecksandRadios';
import CustomForms from '@/sections/components/form-element/CustomForms';
import DataList from '@/sections/components/form-element/DataList';
import FormControls from '@/sections/components/form-element/FormControls';
import FormControlState from '@/sections/components/form-element/FormControlState';
import FormGrid from '@/sections/components/form-element/FormGrid';
import HorizontalForm from '@/sections/components/form-element/HorizontalForm';
import InlineForm from '@/sections/components/form-element/InlineForm';
import InputGroup from '@/sections/components/form-element/InputGroup';
import Picker from '@/sections/components/form-element/Picker';
import Sizeing from '@/sections/components/form-element/Sizing';
import SupportedElements from '@/sections/components/form-element/SupportedElements';
import Tooltips from '@/sections/components/form-element/Tooltips';
import ValidationForm from '@/sections/components/form-element/ValidationForm';

export default function FormBasic() {
  return (
    <AppLayout>
      <Head title="Form Basic" />
      <Row>
        <Col xs={12}>
          <FormControls />
          <Sizeing />
          <Picker />
          <DataList />
          <FormControlState />
          <InlineForm />
          <FormGrid />
          <HorizontalForm />
          <ValidationForm />
          <SupportedElements />
          <Tooltips />
          <ChecksandRadios />
          <InputGroup />
          <CustomForms />
        </Col>
      </Row>
    </AppLayout>
  );
}
