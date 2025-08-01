import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import Additional_Content from '@/sections/components/basic/alert/AdditionalContent';
import BasicAlert from '@/sections/components/basic/alert/BasicAlert';
import DismissingAlert from '@/sections/components/basic/alert/DismissingAlert';
import IconsAlert from '@/sections/components/basic/alert/IconsAlert';
import LinksAlert from '@/sections/components/basic/alert/LinksAlert';

// ==============================|| BASIC - ALERT ||============================== //

export default function AlertPage() {
  return (
    <>
      <AppLayout>
        <Head title="Alert" />
        <ReferenceHeader
          caption="Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages."
          link="https://react-bootstrap.netlify.app/docs/components/alerts/"
        />
        <Row>
          <Col xs={12}>
            <BasicAlert />
          </Col>
          <Col xs={12} sm={6}>
            <LinksAlert />
          </Col>
          <Col xs={12} sm={6}>
            <DismissingAlert />
          </Col>
          <Col xs={12} sm={6}>
            <Additional_Content />
          </Col>
          <Col xs={12} sm={6}>
            <IconsAlert />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
