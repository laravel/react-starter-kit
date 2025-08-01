import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import GroupingTable from '@/sections/tables/react-table/GroupingTable';

// ==============================|| REACT TABLE - GROUPING  ||============================== //

export default function GroupingTablePage() {
  return (
    <AppLayout>
      <Head title="Grouping table" />
      <Row>
        <Col>
          <GroupingTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
