// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - DROP UP ||============================== //

export default function DropUpDropdown() {
  return (
    <MainCard title="Dropup">
      <Dropdown>
        <Stack direction="horizontal" gap={1} className="flex-wrap">
          <DropdownButton variant="success" title="Dropup" drop="up">
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </DropdownButton>
          <Dropdown className="dropup" as={ButtonGroup} drop="up">
            <Button variant="light-success">Split droprup</Button>

            <Dropdown.Toggle variant="light-success" split />

            <Dropdown.Menu>
              <Dropdown.Item href="#!">Action</Dropdown.Item>
              <Dropdown.Item href="#!-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#!-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Dropdown>
    </MainCard>
  );
}
