import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import DemoModal from '@/sections/components/basic/modal/DemoModal';
import FullScreenModal from '@/sections/components/basic/modal/FullScreenModal';
import OptionalSizes from '@/sections/components/basic/modal/OptionalSizes';
import ScrollingLongContent from '@/sections/components/basic/modal/ScrollingLongContent';
import TooltipsModal from '@/sections/components/basic/modal/TooltipsModal';
import ToggleBetweenModals from '@/sections/components/basic/modal/ToggleBetweenModals';
import UsingTheGrid from '@/sections/components/basic/modal/UsingTheGrid';
import VaryingModalContent from '@/sections/components/basic/modal/VaryingModalContent';
import VerticallyCentered from '@/sections/components/basic/modal/VerticallyCentered';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - MODAL ||============================== //

export default function ModalPage() {
  return (
    <>
      <AppLayout>
        <Head title="Modal" />
        <ReferenceHeader
          caption="Use React-Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content."
          link="https://react-bootstrap.netlify.app/docs/components/modal/"
        />
        <Row>
          <Col xs={12}>
            <DemoModal />
          </Col>
          <Col xl={4} md={6}>
            <ScrollingLongContent />
          </Col>
          <Col xl={4} md={6}>
            <VerticallyCentered />
          </Col>
          <Col xl={4} md={6}>
            <TooltipsModal />
          </Col>
          <Col xl={4} md={6}>
            <UsingTheGrid />
          </Col>
          <Col xl={4} md={6}>
            <OptionalSizes />
          </Col>
          <Col xl={4} md={6}>
            <ToggleBetweenModals />
          </Col>
          <Col xs={12}>
            <FullScreenModal />
          </Col>
          <Col xs={12}>
            <VaryingModalContent />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
