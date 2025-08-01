// react-bootstrap
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - SALES PERFORMANCE OVERVIEW CARD ||============================== //

export default function SalesPerformanceOverviewCard() {
  return (
    <MainCard>
      <h3 className="f-w-400">$17,400</h3>
      <span className="d-block text-muted text-uppercase">Total Revenue</span>

      <Row>
        <Col xs={6} className="m-t-20">
          <h6 className="text-muted">472</h6>
          <h6 className="text-muted f-w-300 mb-0">
            Deals Added<span className="float-end f-w-400">69%</span>
          </h6>
          <ProgressBar className="m-t-10" children={<ProgressBar now={69} className="bg-brand-color-1" />} />
        </Col>

        <Col xs={6} className="m-t-20">
          <h6 className="text-muted">89</h6>
          <h6 className="text-muted f-w-300 mb-0">
            Deals Won<span className="float-end f-w-400">58%</span>
          </h6>
          <ProgressBar className="m-t-10" children={<ProgressBar now={58} className="bg-brand-color-2" />} />
        </Col>
      </Row>
    </MainCard>
  );
}
