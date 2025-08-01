import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BasicBadge from '@/sections/components/basic/badges/BasicBadge';
import ButtonBadge from '@/sections/components/basic/badges/ButtonBadge';
import ContextualBadge from '@/sections/components/basic/badges/ContextualBadge';
import LightBadge from '@/sections/components/basic/badges/LightBadge';
import PillBadge from '@/sections/components/basic/badges/PillBadge';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - BADGES ||============================== //

export default function BadgesPage() {
  return (
    <>
      <AppLayout>
        <Head title="Badges" />
        <ReferenceHeader
          caption="Documentation and examples for badges, our small count and labeling component."
          link="https://react-bootstrap.netlify.app/docs/components/badge/"
        />
        <Row>
          <Col sm={12}>
            <BasicBadge />
            <ButtonBadge />
            <ContextualBadge />
            <PillBadge />
            <LightBadge />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
