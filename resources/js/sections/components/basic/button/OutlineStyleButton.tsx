// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - OUTLINE STYLE ||============================== //

export default function OutlineStyleButton() {
  return (
    <MainCard title="Outlined styles">
      <ButtonGroup>
        <Button variant="outline-secondary">Left</Button>
        <Button variant="outline-secondary">Middle</Button>
        <Button variant="outline-secondary">Right</Button>
      </ButtonGroup>
      <hr />
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline-info">Left</Button>
          <Button variant="outline-success">Middle</Button>
          <Button variant="outline-danger">Right</Button>
        </ButtonGroup>
      </ButtonGroup>
    </MainCard>
  );
}
