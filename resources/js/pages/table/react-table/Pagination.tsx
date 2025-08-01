import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import PaginationBottomTable from '@/sections/tables/react-table/pagination/PaginationBottom';
import PaginationTopTable from '@/sections/tables/react-table/pagination/PaginationTop';

// ==============================|| REACT TABLE - PAGINATION  ||============================== //

export default function PaginationTablePage() {
  return (
    <AppLayout>
      <Head title="Pagination table" />
      <Row>
        <Col xs={12}>
          <PaginationTopTable />
        </Col>
        <Col xs={12}>
          <PaginationBottomTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
