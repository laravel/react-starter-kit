import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BasicToast from '@/sections/components/basic/toasts/BasicToast';
import ColorSchemes from '@/sections/components/basic/toasts/ColorSchemes';
import CustomContent from '@/sections/components/basic/toasts/CustomContent';
import LiveToast from '@/sections/components/basic/toasts/LiveToast';
import Placement from '@/sections/components/basic/toasts/Placement';
import Stacking from '@/sections/components/basic/toasts/Stacking';
import Translucent from '@/sections/components/basic/toasts/Translucent';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - TOASTS ||============================== //

export default function ToastsPage() {
  return (
    <>
      <AppLayout>
        <Head title="Toast" />
        <ReferenceHeader
          caption="Push notifications to your visitors with a toast, a lightweight and easily customizable alert message."
          link="https://react-bootstrap.netlify.app/docs/components/toasts/"
        />
        <Row>
          <Col lg={6}>
            <LiveToast />
            <Translucent />
            <ColorSchemes />
          </Col>
          <Col lg={6}>
            <BasicToast />
            <Stacking />
            <CustomContent />
          </Col>
          <Col>
            <Placement />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
