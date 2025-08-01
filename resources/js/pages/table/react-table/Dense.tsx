import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import DenseTable from '@/sections/tables/react-table/DenseTable';

// ==============================|| REACT TABLE - DENSE  ||============================== //

export default function DenseTablePage() {
  return (
    <AppLayout>
      <Head title="Dense table" />
      <Row>
        <Col>
          <DenseTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
