// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar2 from '@assets/images/widget/dashborad-2.jpg';

// =============================|| USERS - BUDGET DEADLINE UIKIT CARD ||============================== //

export default function BudgetDeadlineUiKitCard() {
  return (
    <MainCard className="widget-focus">
      <Image className="card-img rounded" src={Avatar2} />
      <h5 className="m-t-35">Dashboard UI Kit</h5>
      <span className="text-muted">By Creative Studio Form</span>
      <p className="border-top m-b-20 p-t-10 m-t-20"></p>
      <Row>
        <Col>
          <h5>$5236.42</h5>
          <span>BUDGET</span>
        </Col>
        <Col>
          <h5>9 May 2017</h5>
          <span>DEADLINE</span>
        </Col>
      </Row>
    </MainCard>
  );
}
