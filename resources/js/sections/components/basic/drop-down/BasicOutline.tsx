// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - BASIC OUTLINE ||============================== //

export default function BasicOutlineDropdown() {
  return (
    <MainCard title="Basic Outline Dropdown Button">
      <Dropdown>
        <Stack direction="horizontal" gap={2} className="flex-wrap">
          <DropdownButton variant="outline-primary" title="Primary">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="outline-secondary" title="secondary">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="outline-success" title="success">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="outline-danger" title="danger">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="outline-warning" title="warning">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton variant="outline-info" title="info">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </DropdownButton>
        </Stack>
      </Dropdown>
    </MainCard>
  );
}
