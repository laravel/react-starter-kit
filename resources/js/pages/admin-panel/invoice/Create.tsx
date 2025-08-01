import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import InvoiceCreate from '@/sections/admin-panel/invoice/Create';

// ==============================|| ADMIN PANEL - INVOICE CREATE ||============================== //

export default function InvoiceCreatePage() {
  return (
    <AppLayout>
      <Head title="Create" />
      <Row>
        <Col xs={12}>
          <InvoiceCreate />
        </Col>
      </Row>
    </AppLayout>
  );
}
