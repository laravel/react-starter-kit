// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - TEXT ||============================== //

export default function TextDropdown() {
  return (
    <MainCard title="Text">
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        <Dropdown>
          <Dropdown.Toggle variant="light-danger">Text</Dropdown.Toggle>
          <Dropdown.Menu className="p-0">
            <Dropdown.ItemText className="p-4">
              <h6>Some title example</h6>
              <p className="mb-2 small">And this is more</p>
              <p className="mb-0">Some example text that's free-flowing within the dropdown menu.</p>
            </Dropdown.ItemText>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
    </MainCard>
  );
}
