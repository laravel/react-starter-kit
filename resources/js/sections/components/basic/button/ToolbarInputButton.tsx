// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - TOOLBAR INPUT ||============================== //

export default function ToolbarInputButton() {
  return (
    <MainCard title="Button Toolbar input">
      <ButtonToolbar className="mb-3">
        <ButtonGroup className="my-1 me-2">
          <Button variant="light-secondary">1</Button>
          <Button variant="light-secondary">2</Button>
          <Button variant="light-secondary">3</Button>
          <Button variant="light-secondary">4</Button>
        </ButtonGroup>
        <InputGroup className="my-1">
          <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
          <Form.Control type="text" placeholder="Input group example" />
        </InputGroup>
      </ButtonToolbar>
      <ButtonToolbar className="justify-content-between">
        <ButtonGroup className="my-1">
          <Button variant="light-secondary">1</Button>
          <Button variant="light-secondary">2</Button>
          <Button variant="light-secondary">3</Button>
          <Button variant="light-secondary">4</Button>
        </ButtonGroup>
        <InputGroup className="my-1">
          <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
          <Form.Control type="text" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2" />
        </InputGroup>
      </ButtonToolbar>
    </MainCard>
  );
}
