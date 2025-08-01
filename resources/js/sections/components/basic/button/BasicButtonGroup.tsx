// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - BASIC GROUP ||============================== //

export default function BasicButtonGroup() {
  return (
    <MainCard title="Basic Button Group">
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </MainCard>
  );
}
