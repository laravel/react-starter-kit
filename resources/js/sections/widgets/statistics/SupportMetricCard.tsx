// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - SUPPORT METRIC CARD ||============================== //

export default function SupportMetricCard() {
  return (
    <MainCard className="bg-brand-color-2 ticket-customer">
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <h2 className="text-white mb-0 f-w-300">286</h2>
        </Col>
        <Col>
          <span className="text-white d-block">+134</span>
          <span className="text-white">Since last week</span>
        </Col>
      </Row>
      <h5 className="text-white f-w-300 mt-4">Ticket Answered</h5>
      <i className="ti ti-file-check-filled  text-white f-70" />
    </MainCard>
  );
}
