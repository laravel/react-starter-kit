// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - SPLIT OUTLINE ||============================== //

export default function SplitOutlineDropdown() {
  return (
    <MainCard title="Split Outline Dropdown Button">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-primary">Primary</Button>

          <Dropdown.Toggle split variant="outline-primary" />

          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-secondary">secondary</Button>

          <Dropdown.Toggle split variant="outline-secondary" />

          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-success">success</Button>

          <Dropdown.Toggle split variant="outline-success" />

          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-danger">danger</Button>

          <Dropdown.Toggle split variant="outline-danger" />

          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-warning">warning</Button>

          <Dropdown.Toggle split variant="outline-warning" />

          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-info">info</Button>

          <Dropdown.Toggle split variant="outline-info" />

          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
    </MainCard>
  );
}
