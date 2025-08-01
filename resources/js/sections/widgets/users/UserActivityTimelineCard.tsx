// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar2 from '@assets/images/user/avatar-2.png';

// =============================|| USERS - USER ACTIVITY TIMELINE CARD ||============================== //

export default function UserActivityTimelineCard() {
  return (
    <MainCard>
      <Row className="align-items-center justify-between-center">
        <Col xs="auto">
          <Image src={Avatar2} width={70} />
        </Col>
        <Col>
          <h5>Alma Christensen</h5>
          <span>UX Designer</span>
        </Col>
      </Row>
      <ul className="task-list">
        <li>
          <i className="task-icon bg-success" />
          <h6>
            Anton Knudsen<span className="float-end text-muted">14 MAY</span>
          </h6>
          <p className="text-muted">Lorem ipsum is dolorem…</p>
        </li>
        <li>
          <i className="task-icon bg-success" />
          <h6>
            Anton Knudsen<span className="float-end text-muted">14 MAY</span>
          </h6>
          <p className="text-muted">Lorem ipsum is dolorem…</p>
        </li>
        <li>
          <i className="task-icon bg-success" />
          <h6>
            Anton Knudsen<span className="float-end text-muted">14 MAY</span>
          </h6>
          <p className="text-muted">Lorem ipsum is dolorem…</p>
        </li>
      </ul>
    </MainCard>
  );
}
