// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - MIX STYLE ||============================== //

export default function MixedStyleButton() {
  return (
    <MainCard title="Mixed Styles">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="danger">A</Button>
          <Button variant="warning">A</Button>
          <Button variant="info">A</Button>
          <Button variant="success">A</Button>
        </ButtonGroup>
      </ButtonGroup>
      <hr />
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="light-danger">A</Button>
          <Button variant="light-warning">A</Button>
          <Button variant="light-info">A</Button>
          <Button variant="light-success">A</Button>
        </ButtonGroup>
      </ButtonGroup>
    </MainCard>
  );
}
