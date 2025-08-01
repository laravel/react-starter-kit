// react-bootstrap
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - EMBEDS ||============================== //

export default function Embeds() {
  return (
    <MainCard title="Embeds">
      <Row>
        <Col xs={12} md={8} className="m-auto">
          <Ratio aspectRatio="16x9">
            <embed type="image/svg+xml" src="https://www.youtube.com/embed/1jWCXJfxHQM?rel=0" />
          </Ratio>
        </Col>
      </Row>
    </MainCard>
  );
}
