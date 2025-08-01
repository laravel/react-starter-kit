// react-bootstrap
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - OFFSET & REFERENCE ||============================== //

export default function OffsetReference() {
  return (
    <MainCard title="Offset & Reference">
      <Dropdown className="mb-1">
        <Dropdown.Toggle variant="secondary" id="dropdownMenuOffset">
          Offset
        </Dropdown.Toggle>
        <Dropdown.Menu
          popperConfig={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [10, 20]
                }
              }
            ]
          }}
        >
          <Dropdown.Item>Action</Dropdown.Item>
          <Dropdown.Item>Another action</Dropdown.Item>
          <Dropdown.Item>Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={ButtonGroup} drop="down-centered">
        <DropdownButton variant="secondary" title="Reference" id="dropdownMenuReference">
          <Dropdown.Item>Action</Dropdown.Item>
          <Dropdown.Item>Another action</Dropdown.Item>
          <Dropdown.Item>Something else</Dropdown.Item>
          <hr className="m-0 my-2" />
          <Dropdown.Item>Separated link</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
    </MainCard>
  );
}
