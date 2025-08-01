// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import InvoiceCard from '../InvoiceCard';

// ==============================|| ADMIN PANEL - INVOICE LIST CARD ||============================== //

export default function InvoiceListCard() {
  return (
    <Row className="g-3 mb-3">
      <Col md={6} lg={4}>
        <InvoiceCard
          name="Total"
          total={70.5}
          price={5678.09}
          invoice={9}
          color="text-success"
          series={[0, 20, 10, 45, 30, 55, 20, 30]}
          chartColor="#1de9b6"
          className="p-4"
        />
      </Col>
      <Col md={6} lg={4}>
        <InvoiceCard
          name="Paid"
          total={-8.73}
          price={5678.09}
          invoice={5}
          color="text-warning"
          series={[30, 20, 55, 30, 45, 10, 20, 0]}
          chartColor="#f4c22b"
          className="p-4"
        />
      </Col>
      <Col md={6} lg={4}>
        <InvoiceCard
          name="Overdue"
          total={-4.73}
          price={5678.09}
          invoice={5}
          color="text-danger"
          series={[0, 20, 10, 45, 30, 55, 20, 30]}
          chartColor="#f44236"
          className="p-4"
        />
      </Col>
    </Row>
  );
}
