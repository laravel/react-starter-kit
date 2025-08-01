import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import VirtualizedInfiniteScrollTable from '@/sections/tables/react-table/virtualized/VirtualizedInfiniteScrollTable';
import VirtualizedRowsTable from '@/sections/tables/react-table/virtualized/VirtualizedRowsTable';

// ==============================|| REACT TABLE - VIRTUALIZED  ||============================== //

export default function Virtualized() {
  return (
    <AppLayout>
      <Head title="Virtualized table" />
      <Row>
        <Col xs={12}>
          <VirtualizedInfiniteScrollTable />
          <VirtualizedRowsTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
