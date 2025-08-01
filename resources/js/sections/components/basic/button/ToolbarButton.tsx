// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - TOOLBAR ||============================== //

export default function ToolbarButton() {
  return (
    <MainCard title="Button Toolbar">
      <ButtonToolbar className=" flex-wrap gap-2">
        <ButtonGroup>
          <Button variant="light-secondary">1</Button>
          <Button variant="light-secondary">2</Button>
          <Button variant="light-secondary">3</Button>
          <Button variant="light-secondary">4</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="light-secondary">5</Button>
          <Button variant="light-secondary">6</Button>
          <Button variant="light-secondary">7</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="light-secondary">8</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </MainCard>
  );
}
