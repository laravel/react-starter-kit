import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import RowSelectionTable from '@/sections/tables/react-table/row-selection/RowSelectionTable';
import RSPControl from '@/sections/tables/react-table/row-selection/RSPControlTable';

// ==============================|| REACT TABLE - ROW SELECTION  ||============================== //

export default function RowSelectionTablePage() {
  return (
    <AppLayout>
      <Head title="Row selection table" />
      <Row>
        <Col xs={12}>
          <RowSelectionTable />
        </Col>
        <Col xs={12}>
          <RSPControl />
        </Col>
      </Row>
    </AppLayout>
  );
}
