// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| LIST GROUP - NUMBERED ||============================== //

export default function NumberedPage() {
  return (
    <MainCard
      title="Numbered"
      subheader={
        <>
          Add the <code>.list-group-numbered</code> modifier class (and optionally use an <code>{`<ol>`}</code> element) to opt into
          numbered list group items.
        </>
      }
    >
      <Row>
        <Col md={6}>
          <ListGroup numbered>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={6}>
          <ListGroup as="ol" numbered>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </MainCard>
  );
}
