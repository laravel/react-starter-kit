// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - CONNECTION FILTER CARD ||============================== //

export default function ConnectionFilterCard() {
  return (
    <MainCard title="Filter" subheader={<p className="mb-0">Distance Filter</p>}>
      <h3 className="f-w-300">4 - 25 Miles</h3>
      <Row className="m-t-30">
        <Col xs={6} className="p-r-0">
          <div className="d-grid">
            <Button className="text-uppercase">Add Friend</Button>
          </div>
        </Col>
        <Col xs={6}>
          <div className="d-grid">
            <Button className="text-uppercase border" variant="outline-secondary">
              Message
            </Button>
          </div>
        </Col>
      </Row>
    </MainCard>
  );
}
