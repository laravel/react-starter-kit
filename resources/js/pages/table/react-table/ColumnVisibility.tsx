import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ColumnVisibility from '@/sections/tables/react-table/ColumnVisibility';

// ==============================|| REACT TABLE - COLUMN VISIBILITY ||============================== //

export default function ColumnVisibilityPage() {
  return (
    <AppLayout>
      <Head title="Column visiblity" />
      <Row>
        <Col xs={12}>
          <ColumnVisibility />
        </Col>
      </Row>
    </AppLayout>
  );
}
