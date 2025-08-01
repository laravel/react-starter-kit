import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BorderBottomColorTable from '@/sections/tables/bootstrap-table/border-table/BorderBottomColorTable';
import BorderLessTable from '@/sections/tables/bootstrap-table/border-table/BorderLessTable';
import BothBordersTable from '@/sections/tables/bootstrap-table/border-table/BothBorders';
import DefaultBorderTable from '@/sections/tables/bootstrap-table/border-table/DefaultBorderTable';

// ==============================|| BOOTSTRAP TABLE - BORDER TABLE ||============================== //

export default function BorderTablePage() {
  return (
    <AppLayout>
      <Head title="Border table" />
      <Row>
        <Col sm={6}>
          <BothBordersTable />
        </Col>
        <Col sm={6}>
          <BorderLessTable />
        </Col>
        <Col sm={6}>
          <DefaultBorderTable />
        </Col>
        <Col sm={6}>
          <BorderBottomColorTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
