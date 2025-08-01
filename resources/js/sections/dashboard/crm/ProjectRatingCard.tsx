// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| CRM - PROJECT RATING CARD ||============================== //

export default function ProjectRatingCard() {
  return (
    <MainCard title="Project Rating">
      <Row className="align-items-center justify-content-center">
        <Col xs={6}>
          <Stack direction="horizontal" as="h2" className="f-w-300 align-items-center float-start">
            4.3
            <i className="ti ti-star-filled f-12 m-l-10 text-warning" />
          </Stack>
        </Col>
        <Col xs={6}>
          <Stack as="h6" direction="horizontal" className="align-items-center float-end">
            0.4
            <i className="ti ti-caret-up-filled text-success m-l-10 f-24" />
          </Stack>
        </Col>
      </Row>
    </MainCard>
  );
}
