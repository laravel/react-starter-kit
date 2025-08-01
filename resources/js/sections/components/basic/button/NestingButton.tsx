// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - NESTING ||============================== //

export default function NestingButton() {
  return (
    <MainCard title="Nesting">
      <ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <DropdownButton as={ButtonGroup} title="Dropdown">
          <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </MainCard>
  );
}
