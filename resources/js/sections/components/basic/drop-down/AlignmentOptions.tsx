// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - ALIGNMENT OPTIONS ||============================== //

export default function AlignmentOptions() {
  return (
    <MainCard title="Alignment options">
      <Dropdown>
        <Stack direction="horizontal" gap={1} className="flex-wrap">
          <DropdownButton id="dropdownMenuButton" variant="light-primary" title="Dropdown">
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="light-primary" title="Right-aligned menu" align="end">
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="light-primary" title="Left-aligned, right-aligned lg" align="end">
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="light-primary" title="Right-aligned, left-aligned lg">
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="light-primary" title="Dropstart" drop="start">
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="light-primary" title="Dropend" drop="end">
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="light-primary" title="Dropup" drop="up">
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
          </DropdownButton>
        </Stack>
      </Dropdown>
    </MainCard>
  );
}
