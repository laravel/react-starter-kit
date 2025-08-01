// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - LEFT ||============================== //

export default function DropLeftDropdown() {
  return (
    <MainCard title="Dropleft">
      <Dropdown>
        <Stack direction="horizontal" gap={1} className="flex-wrap">
          <DropdownButton variant="secondary" title="Dropleft" drop="start">
            <Dropdown.Item href="#">#!</Dropdown.Item>
            <Dropdown.Item href="#">Another #!</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </DropdownButton>
          <Dropdown as={ButtonGroup} drop="start">
            <Button variant="light-secondary">Split dropleft</Button>
            <Dropdown.Toggle variant="light-secondary" split />
            <Dropdown.Menu>
              <Dropdown.Item href="#">#!</Dropdown.Item>
              <Dropdown.Item href="#">Another #!</Dropdown.Item>
              <Dropdown.Item href="#">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Dropdown>
    </MainCard>
  );
}
