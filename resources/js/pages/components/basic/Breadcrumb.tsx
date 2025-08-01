import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BreadcrumbBasic from '@/sections/components/basic/breadcrumb/BreadcrumbBasic';
import BreadcrumbCharacter from '@/sections/components/basic/breadcrumb/BreadcrumbCharacter';
import BreadcrumbEmbedded from '@/sections/components/basic/breadcrumb/BreadcrumbEmbedded';
import BreadcrumbIcon from '@/sections/components/basic/breadcrumb/BreadcrumbIcon';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - BREADCRUMB ||============================== //

export default function BreadcrumbPage() {
  return (
    <>
      <AppLayout>
        <Head title="Breadcrumb" />
        <ReferenceHeader
          caption="Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS."
          link="https://react-bootstrap.netlify.app/docs/components/breadcrumb"
        />
        <Row>
          <Col sm={6}>
            <BreadcrumbBasic />
          </Col>
          <Col sm={6}>
            <BreadcrumbIcon />
          </Col>
          <Col sm={6}>
            <BreadcrumbCharacter />
          </Col>
          <Col sm={6}>
            <BreadcrumbEmbedded />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
