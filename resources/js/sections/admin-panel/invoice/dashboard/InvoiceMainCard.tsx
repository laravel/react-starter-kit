// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import InvoiceCard from '../InvoiceCard';
import InvoiceChart from './InvoiceChart';
import MainCard from '@/components/MainCard';

// ==============================|| ADMIN PANEL - DASHBOARD INVOICE MAIN CARD ||============================== //

export default function InvoiceMainCard() {
  return (
    <MainCard>
      <Row className="mb-3 g-3">
        <Col md={6} xxl={3}>
          <InvoiceCard name="Total" total={20.3} price={5678.09} invoice={3} color="text-warning" />
        </Col>
        <Col md={6} xxl={3}>
          <InvoiceCard name="Paid" total={8.73} price={5678.09} invoice={5} color="text-danger" />
        </Col>
        <Col md={6} xxl={3}>
          <InvoiceCard name="Pending" total={10.73} price={5678.09} invoice={20} color="text-success" />
        </Col>
        <Col md={6} xxl={3}>
          <InvoiceCard name="Pending" total={-4.73} price={5678.09} invoice={5} color="text-primary" />
        </Col>
      </Row>
      <InvoiceChart />
    </MainCard>
  );
}
