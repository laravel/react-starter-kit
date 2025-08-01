// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - SAVING ACCOUNT SUMMARY CARD ||============================== //

export default function SavingAccountSummaryCard() {
  return (
    <MainCard className="bg-brand-color-1">
      <h4 className="text-white text-uppercase text-center">Savings Account</h4>
      <Row className="m-t-10 p-t-20">
        <Col className="text-center">
          <h4 className="text-white f-w-300">$2,456.78</h4>
          <p className="text-white d-block">Balance</p>
        </Col>
        <Col className="text-center">
          <h4 className="text-white f-w-300">$867.00</h4>
          <p className="text-white d-block">Expenses</p>
        </Col>
      </Row>
    </MainCard>
  );
}
