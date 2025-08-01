import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ExpandingDetails from '@/sections/tables/react-table/expanding/ExpandingDetails';
import ExpandingTable from '@/sections/tables/react-table/expanding/ExpandingTable';
import ExpandingSubTable from '@/sections/tables/react-table/expanding/ExpandingSubTable';

// ==============================|| REACT TABLE - EXPANDING  ||============================== //

export default function ExpandingTablePage() {
  return (
    <AppLayout>
      <Head title="Expanding table" />
      <Row>
        <Col xs={12}>
          <ExpandingTable />
        </Col>
        <Col xs={12}>
          <ExpandingDetails />
        </Col>
        <Col xs={12}>
          <ExpandingSubTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
