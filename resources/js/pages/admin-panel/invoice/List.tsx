import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import InvoiceListCard from '@/sections/admin-panel/invoice/list/ListCard';
import ListTable from '@/sections/admin-panel/invoice/list/ListTable';
import InvoiceReceivableCard from '@/sections/admin-panel/invoice/list/ReceivablesCard';

// ==============================|| ADMIN PANEL - INVOICE LIST ||============================== //

export default function InvoiceListPage() {
  return (
    <AppLayout>
      <Head title="List" />
      <Row>
        <Col xxl={8}>
          <InvoiceListCard />
        </Col>
        <Col xxl={4}>
          <InvoiceReceivableCard />
        </Col>
        <Col xs={12}>
          <ListTable />
        </Col>
      </Row>
    </AppLayout>
  );
}
