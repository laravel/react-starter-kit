import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ActionButtonwithLink from '@/sections/forms/form-layouts/action-bars/ActionButtonwithLink';
import HorizontalForm from '@/sections/forms/form-layouts/action-bars/HorizontalForm';
import LayoutWithSideActionButton from '@/sections/forms/form-layouts/action-bars/LayoutWithSideActionButton';
import RightAlignActionBar from '@/sections/forms/form-layouts/action-bars/RightAlignActionBar';
import SimpleActionBar from '@/sections/forms/form-layouts/action-bars/SimpleActionBar';
import TopBottomActionsBars from '@/sections/forms/form-layouts/action-bars/TopBottomActionsBars';

// ===============================|| FORMS LAYOUTS - ACTION BARS ||============================== //

export default function ActionBarsPage() {
  return (
    <AppLayout>
      <Head title="Action bar" />
      <Row>
        <Col lg={6}>
          <SimpleActionBar />
          <ActionButtonwithLink />
          <LayoutWithSideActionButton />
        </Col>
        <Col lg={6}>
          <RightAlignActionBar />
          <HorizontalForm />
          <TopBottomActionsBars />
        </Col>
      </Row>
    </AppLayout>
  );
}
