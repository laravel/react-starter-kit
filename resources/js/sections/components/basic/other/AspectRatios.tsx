// react-bootstrap
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - ASPECT RATIOS ||============================== //

export default function AspectRatios() {
  return (
    <MainCard title="Aspect Ratios">
      <Row className="g-4">
        <Col md={6}>
          <h5>Aspect Ratios 21 by 9</h5>
          <hr />
          <Ratio aspectRatio="21x9">
            <embed type="image/svg+xml" src="https://www.youtube.com/embed/1jWCXJfxHQM?rel=0" />
          </Ratio>
        </Col>
        <Col md={6}>
          <h5>Aspect Ratios 16 by 9</h5>
          <hr />
          <Ratio aspectRatio="16x9">
            <embed type="image/svg+xml" src="https://www.youtube.com/embed/1jWCXJfxHQM?rel=0" />
          </Ratio>
        </Col>
        <Col md={6}>
          <h5>Aspect Ratios 4 by 3</h5>
          <hr />
          <Ratio aspectRatio="4x3">
            <embed type="image/svg+xml" src="https://www.youtube.com/embed/1jWCXJfxHQM?rel=0" />
          </Ratio>
        </Col>
        <Col md={6}>
          <h5>Aspect Ratios 1 by 1</h5>
          <hr />
          <Ratio aspectRatio="1x1">
            <embed type="image/svg+xml" src="https://www.youtube.com/embed/1jWCXJfxHQM?rel=0" />
          </Ratio>
        </Col>
      </Row>
    </MainCard>
  );
}
