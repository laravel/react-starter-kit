import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import DefaultTable from '@/sections/tables/bootstrap-table/sizing-table/DefaultTable';
import ExtraLargeTable from '@/sections/tables/bootstrap-table/sizing-table/ExtraLargeTable';
import ExtraSmallTable from '@/sections/tables/bootstrap-table/sizing-table/ExtraSmallTable';
import LargeTable from '@/sections/tables/bootstrap-table/sizing-table/LargeTable';
import SmallTable from '@/sections/tables/bootstrap-table/sizing-table/SmallTable';

// ==============================|| BOOTSTRAP TABLE - SIZING TABLE ||============================== //

export default function SizingTablePage() {
  return (
    <AppLayout>
      <Head title="Sizing table" />
      <Row>
        <Col sm={6}>
          <ExtraLargeTable />
        </Col>
        <Col sm={6}>
          <LargeTable />
        </Col>
        <Col sm={6}>
          <DefaultTable />
        </Col>
        <Col sm={6}>
          <SmallTable />
        </Col>
        <Col>
          <ExtraSmallTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
