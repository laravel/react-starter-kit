import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import InvoiceDetails from '@/sections/admin-panel/invoice/details';
import InvoiceDetailsCard from '@/sections/admin-panel/invoice/details/DetailsCard';

// ==============================|| ADMIN PANEL - INVOICE DETAILS ||============================== //

export default function InvoiceDetailsPage() {
  return (
    <AppLayout>
      <Head title="Invoice details" />
      <Row>
        <Col xs={12}>
          <InvoiceDetailsCard />
          <InvoiceDetails />
        </Col>
      </Row>
    </AppLayout>
  );
}
