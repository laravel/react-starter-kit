// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - AUTO CLOSE ||============================== //

export default function AutoClose() {
  return (
    <MainCard title="Auto close behavior">
      <Dropdown>
        <Stack direction="horizontal" gap={1} className="flex-wrap">
          <Dropdown>
            <Dropdown.Toggle id="defaultDropdown" variant="light-primary">
              Default Dropdown
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/Menu item-1">Menu item</Dropdown.Item>
              <Dropdown.Item href="#/Menu item-2">Menu item</Dropdown.Item>
              <Dropdown.Item href="#/Menu item-3">Menu item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown autoClose="inside">
            <Dropdown.Toggle id="dropdownMenuClickableOutside" variant="info">
              Clickable outside
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/Menu item-1">Menu item</Dropdown.Item>
              <Dropdown.Item href="#/Menu item-2">Menu item</Dropdown.Item>
              <Dropdown.Item href="#/Menu item-3">Menu item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown autoClose="outside">
            <Dropdown.Toggle id="dropdownMenuClickableinside" variant="info">
              Clickable inside
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/Menu item-1">Menu item</Dropdown.Item>
              <Dropdown.Item href="#/Menu item-2">Menu item</Dropdown.Item>
              <Dropdown.Item href="#/Menu item-3">Menu item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown autoClose={false}>
            <Dropdown.Toggle id="dropdownMenuClickable" variant="light-primary">
              Manual close
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/Menu item-1">Menu item</Dropdown.Item>
              <Dropdown.Item href="#/Menu item-2">Menu item</Dropdown.Item>
              <Dropdown.Item href="#/Menu item-3">Menu item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Dropdown>
    </MainCard>
  );
}
