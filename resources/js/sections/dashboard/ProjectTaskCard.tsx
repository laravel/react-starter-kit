// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| PROJECT - TASK CARD ||============================== //

export default function ProjectTaskCard() {
  return (
    <MainCard className="project-task">
      <Row className="align-items-center justify-content-center">
        <Col>
          <h5 className="m-0">
            <i className="ph ph-note-pencil f-20 align-middle m-r-10" />
            Project Task
          </h5>
        </Col>
        <Col xs="auto">
          <Badge className="bg-brand-color-1 text-white f-14 f-w-400 float-end">23% Done</Badge>
        </Col>
      </Row>
      <h6 className="text-muted mt-4 mb-3">Complete Task : 6/10</h6>
      <ProgressBar className="m-t-10" children={<ProgressBar now={60} className="bg-primary" />} />
      <h6 className="mt-3 mb-0 text-center text-muted">Project Team : 28 Persons</h6>
    </MainCard>
  );
}
