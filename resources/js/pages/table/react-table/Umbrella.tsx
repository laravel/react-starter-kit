import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import UmbrellaTable from '@/sections/tables/react-table/Umbrella';

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

export default function UmbrellaTablePage() {
  return (
    <AppLayout>
      <Head title="Umbrella table" />
      <Row>
        <Col xs={12}>
          <UmbrellaTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
