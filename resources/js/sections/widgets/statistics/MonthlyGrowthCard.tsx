// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - MONTHLY GROWTH CARD ||============================== //

export default function MonthlyGrowthCard() {
  return (
    <MainCard>
      <h5>Growth Rate</h5>
      <Row className="align-items-center justify-content-center">
        <Col xs={6}>
          <h2 className="f-w-300 m-t-20">48%</h2>
        </Col>
        <Col xs={6} className="text-end">
          <i className="ti ti-chart-pie-4-filled f-30 text-success" />
        </Col>
      </Row>
      <span className="text-muted text-center d-block">From Last Month</span>
    </MainCard>
  );
}
