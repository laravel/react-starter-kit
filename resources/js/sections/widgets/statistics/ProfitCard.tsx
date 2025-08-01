// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - PROFIT CARD ||============================== //

export default function ProfitCard() {
  return (
    <MainCard className="bg-brand-color-1">
      <Row className="align-items-center justify-content-center">
        <Col>
          <h4 className="text-white">Profit</h4>
        </Col>
        <Col>
          <h2 className="text-white text-end f-w-300">$3,764</h2>
        </Col>
      </Row>

      <div className="m-t-50">
        <h6 className="text-white">
          Monthly Profit <p className="mb-0 float-end">$340</p>
        </h6>
        <h6 className="text-white mt-3">
          Weekly Profit <p className="mb-0 float-end">$150</p>
        </h6>
      </div>
    </MainCard>
  );
}
