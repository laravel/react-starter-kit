// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - MONTHLY REVENUE SUMMARY CARD ||============================== //

export default function MonthlyRevenueSummaryCard() {
  return (
    <MainCard className="bg-brand-color-1 card-Revenue">
      <h5 className="text-white">Total Revenue</h5>
      <Row className="align-items-center justify-between-center">
        <Col xs="auto">
          <i className="ti ti-moneybag-move-back f-30 text-white" />
        </Col>
        <Col>
          <div className="float-end text-white me-4">
            <h6 className="text-white mb-2">This Month</h6>
            <p className="mb-0 d-block mb-2">$ 2018</p>
            <p className="mb-0">+175 (22.5%)</p>
          </div>
        </Col>
      </Row>
    </MainCard>
  );
}
