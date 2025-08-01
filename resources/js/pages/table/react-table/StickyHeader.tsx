import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import StickyTable from '@/sections/tables/react-table/StickyHeader';

// ==============================|| REACT TABLE - STICKY HEADER ||============================== //

export default function StickyTablePage() {
  return (
    <AppLayout>
      <Head title="Sticky table" />
      <Row>
        <Col xs={12}>
          <StickyTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
