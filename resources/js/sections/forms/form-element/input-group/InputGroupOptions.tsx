import { useState } from 'react';

// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CardFooter from 'react-bootstrap/CardFooter';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| INPUT GROUP - OPTIONS ||============================== //

export default function InputgroupOptions() {
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true);
  const [radioChecked, setRadioChecked] = useState<boolean>(true);

  const handleCheckboxChange = () => {
    setCheckboxChecked((prevState) => !prevState);
  };

  const handleRadioChange = () => {
    setRadioChecked((prevState) => !prevState);
  };
  return (
    <MainCard title="Input Group Options">
      <Alert>
        <Stack direction="horizontal">
          <i className="ti ti-info-circle h2 f-w-400 mb-0" />
          <div className="flex-grow-1 ms-3">
            Input Group with more options like Button, Button with Dropdown, Colors, Checkbox & with Radio
          </div>
        </Stack>
      </Alert>

      <Form.Label>With Button</Form.Label>
      <InputGroup className="mb-3">
        <Button variant="outline-secondary" id="button-addon1">
          Button
        </Button>
        <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" placeholder="Left Button" />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" placeholder="Right Button" />
        <Button variant="outline-secondary" id="button-addon1">
          Button
        </Button>
      </InputGroup>

      <InputGroup className="mb-3">
        <Button variant="outline-secondary">Button</Button>
        <Form.Control placeholder="Left & Right Button" />
        <Button variant="outline-secondary">Button</Button>
      </InputGroup>
      <hr />

      <Form.Label>Button with Dropdown</Form.Label>
      <InputGroup className="mb-3">
        <DropdownButton variant="secondary" title="Dropdown" id="input-group-dropdown-1">
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <hr className="m-0 my-2" />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
        <Form.Control placeholder="Left Dropdown" />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control placeholder="Right Dropdown" />
        <DropdownButton variant="secondary" title="Dropdown" id="input-group-dropdown-1">
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <hr className="m-0 my-2" />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
      </InputGroup>

      <Form.Label>Color variants with Icons</Form.Label>

      <InputGroup className="mb-3">
        <Button variant="outline-primary" id="button-addon1">
          <i className="ph ph-aperture me-1" />
          Outline color
        </Button>
        <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" placeholder="Left Button" />
      </InputGroup>

      <InputGroup className="mb-4">
        <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" placeholder="Right Button" />
        <Button variant="success">
          <i className="ph ph-cloud-arrow-down" /> Fill color
        </Button>
      </InputGroup>

      <hr />

      <Form.Label>Checkbox & Radio</Form.Label>

      <InputGroup className="mb-3">
        <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={checkboxChecked} onChange={handleCheckboxChange} />
        <Form.Control />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Radio aria-label="Radio button for following text input" checked={radioChecked} onChange={handleRadioChange} />
        <Form.Control />
      </InputGroup>

      <CardFooter className="px-0 pb-0">
        <Stack direction="horizontal" gap={2}>
          <Button>Submit</Button>
          <Button className="btn-link-danger">Reset</Button>
        </Stack>
      </CardFooter>
    </MainCard>
  );
}
