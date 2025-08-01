// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - BILLING SUMMARY CARD ||============================== //

export default function BillingSummaryCard() {
  return (
    <MainCard>
      <h5>Your Total Charges</h5>
      <Row className="align-items-center justify-content-center">
        <Col xs={6}>
          <h3 className="f-w-300 m-t-20">$894.39</h3>
          <span>August 31,2017</span>
        </Col>
        <Col xs={6}>
          <div className="d-grid">
            <Button className="text-uppercase shadow-2">Pay Now</Button>
          </div>
        </Col>
      </Row>
    </MainCard>
  );
}
