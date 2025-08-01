import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import DefaultStylingTable from '@/sections/tables/bootstrap-table/styling-table/DefaultStylingTable';
import CustomColorTable from '@/sections/tables/bootstrap-table/styling-table/CustomColorTable';
import FooterStylingTable from '@/sections/tables/bootstrap-table/styling-table/FooterStylingTable';
import HoverStripTable from '@/sections/tables/bootstrap-table/styling-table/HoverStripTable';

// ==============================|| BOOTSTRAP TABLE - STYLING TABLE ||============================== //

export default function StylingTablePage() {
  return (
    <AppLayout>
      <Head title="Styling table" />
      <Row>
        <Col sm={6}>
          <DefaultStylingTable />
        </Col>
        <Col sm={6}>
          <FooterStylingTable />
        </Col>
        <Col sm={6}>
          <CustomColorTable />
        </Col>
        <Col sm={6}>
          <HoverStripTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
