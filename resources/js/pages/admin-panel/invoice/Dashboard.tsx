import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import DashboardCard from '@/sections/admin-panel/invoice/dashboard/DashboardCard';
import InvoiceMainCard from '@/sections/admin-panel/invoice/dashboard/InvoiceMainCard';
import Notification from '@/sections/admin-panel/invoice/dashboard/Notification';
import RecentInvoice from '@/sections/admin-panel/invoice/dashboard/RecentInvoice';
import TotalExpenses from '@/sections/admin-panel/invoice/dashboard/TotalExpenses';

// ==============================|| ADMIN PANEL - INVOICE DASHBOARD ||============================== //

export default function InvoiceDashboardPage() {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      <Row>
        <Col lg={9}>
          <InvoiceMainCard />
        </Col>
        <Col lg={3}>
          <DashboardCard />
        </Col>
        <Col xl={4} md={6}>
          <RecentInvoice />
        </Col>
        <Col xl={4} md={6}>
          <TotalExpenses />
        </Col>
        <Col xl={4} md={6}>
          <Notification />
        </Col>
      </Row>
    </AppLayout>
  );
}
