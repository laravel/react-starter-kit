import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import FilteringTable from '@/sections/tables/react-table/FilteringTable';

// ==============================|| REACT TABLE - FILTERING  ||============================== //

export default function FilteringTablePage() {
  return (
    <AppLayout>
      <Head title="Filter table" />
      <Row>
        <Col>
          <FilteringTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
