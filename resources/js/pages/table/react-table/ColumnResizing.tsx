import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ColumnResizing from '@/sections/tables/react-table/ColumnResizing';

// ==============================|| REACT TABLE - COLUMN RESIZING ||============================== //

export default function ColumnResizingPage() {
  return (
    <AppLayout>
      <Head title="column resizing" />
      <Row>
        <Col xs={12}>
          <ColumnResizing />
        </Col>
      </Row>
    </AppLayout>
  );
}
