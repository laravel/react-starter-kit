// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - WITH BADGES ||============================== //

export default function WithBadgesPage() {
  return (
    <MainCard title="With badges" subheader="Add badges to any list group item to show unread counts, activity, and more">
      <ListGroup>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          Cras justo odio
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          apibus ac facilisis in
          <Badge bg="primary" pill>
            2
          </Badge>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          Morbi leo risus
          <Badge bg="primary" pill>
            1
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
