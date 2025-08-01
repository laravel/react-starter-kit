// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - MENU ALIGNMENT ||============================== //

export default function MenuAlignmentDropdown() {
  return (
    <MainCard title="Menu alignment">
      <DropdownButton align="end" variant="secondary" title="Right-aligned menu example">
        <Dropdown.Item>Action</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else here</Dropdown.Item>
      </DropdownButton>
    </MainCard>
  );
}
