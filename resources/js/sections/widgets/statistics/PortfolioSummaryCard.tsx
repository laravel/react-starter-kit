// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - PORTFOLIO SUMMARY CARD ||============================== //

export default function PortfolioSummaryCard() {
  return (
    <MainCard>
      <h5 className="mb-4">Your Portfolio Balance</h5>
      <Row className="align-items-center justify-between-center">
        <Col>
          <h3 className="f-w-300">$193,700</h3>
        </Col>
        <Col xs="auto">
          <p className="mb-0 text-success f-18">
            15% <i className="ph ph-arrow-up-right f-20" />
          </p>
        </Col>
      </Row>

      <Row className="m-t-25">
        <Col xs={6}>
          <div className="d-grid">
            <Button className="text-uppercase">Deposit</Button>
          </div>
        </Col>
        <Col xs={6} className="p-l-0">
          <div className="d-grid">
            <Button className="text-uppercase border" variant="outline-secondary">
              withdraw
            </Button>
          </div>
        </Col>
      </Row>
    </MainCard>
  );
}
