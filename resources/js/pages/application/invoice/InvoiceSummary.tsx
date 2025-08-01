import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import OrderCard from '@/sections/application/invoice/invoice-summary/OrderCard';
import ReceiptCard from '@/sections/application/invoice/invoice-summary/ReceiptCard';
import SalesCard from '@/sections/application/invoice/invoice-summary/SalesCard';

// =================|| INVOICE SUMMARY - INVOICE ||============================== //

export default function InvoiceSummaryPage() {
  return (
    <AppLayout>
      <Head title="Invoice Summary" />
      <Row>
        <Col md={6}>
          <SalesCard title="Sales and Expenses" />
        </Col>
        <Col md={6}>
          <ReceiptCard title="Sales, Receipt and Dues" />
        </Col>
        <Col xl={12}>
          <OrderCard title="Recent Orders" />
        </Col>
      </Row>
    </AppLayout>
  );
}
