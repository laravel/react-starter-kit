// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - TEXT SELECTION ||============================== //

export default function TextSelection() {
  return (
    <MainCard
      title={
        <h5>
          Text Selection <Badge bg="danger">NEW</Badge>
        </h5>
      }
      subheader={<p className="mb-0">Change the way in which the content is selected when the user interacts with it.</p>}
    >
      <Row>
        <Col sm={12} lg={2} className="text-lg-end">
          <b>User select all</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p className="user-select-all">This paragraph will be entirely selected when clicked by the user.</p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} lg={2} className="text-lg-end">
          <b>User select auto</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p className="user-select-auto">This paragraph has default select behavior.</p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} lg={2} className="text-lg-end">
          <b>User select none</b>
        </Col>
        <Col sm={12} md={10} lg={6}>
          <p className="user-select-none">This paragraph will not be selectable when clicked by the user.</p>
        </Col>
      </Row>
    </MainCard>
  );
}
