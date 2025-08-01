// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - TOOLBAR SIZE ||============================== //

export default function ToolbarSizeButton() {
  return (
    <MainCard
      title="Button Toolbar Size"
      subheader={
        <p>
          Use <code>.btn-group-lg</code> in class <code>.btn-group</code> class to get large buttons.
        </p>
      }
    >
      <Row>
        <Col xxl={4} md={12} className="mb-2">
          <ButtonGroup className="btn-group-lg">
            <Button variant="secondary">Left</Button>
            <Button variant="secondary">Middle</Button>
            <Button variant="secondary">Right</Button>
          </ButtonGroup>
        </Col>
        <Col xxl={4} md={6} className="mt-3 mb-2">
          <ButtonGroup aria-label="Default Button Group">
            <Button variant="light-secondary">Left</Button>
            <Button variant="light-secondary">Middle</Button>
            <Button variant="light-secondary">Right</Button>
          </ButtonGroup>
        </Col>
        <Col xxl={4} md={6} className="mt-4 mb-2">
          <ButtonGroup className="btn-group-sm">
            <Button variant="secondary">Left</Button>
            <Button variant="secondary">Middle</Button>
            <Button variant="secondary">Right</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </MainCard>
  );
}
