// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - RIGHT ||============================== //

export default function DropRightDropdown() {
  return (
    <MainCard title="Dropright">
      <Dropdown>
        <Stack direction="horizontal" gap={1} className="flex-wrap">
          <DropdownButton className="dropdown-menu-dark" title="Dropright" drop="end">
            <Dropdown.Item href="#/#!">#!</Dropdown.Item>
            <Dropdown.Item href="#/#!">Another #!</Dropdown.Item>
            <Dropdown.Item href="#/#!">Something else</Dropdown.Item>
          </DropdownButton>
          <Dropdown className="dropend" as={ButtonGroup} drop="end">
            <Button variant="light-primary">Split dropright</Button>

            <Dropdown.Toggle variant="light-primary" split />

            <Dropdown.Menu>
              <Dropdown.Item href="#/#!">#!</Dropdown.Item>
              <Dropdown.Item href="#/#!">Another #!</Dropdown.Item>
              <Dropdown.Item href="#/#!">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Dropdown>
    </MainCard>
  );
}
