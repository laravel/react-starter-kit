// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - SPLIT ||============================== //

export default function SplitPage() {
  return (
    <MainCard title="Split Dropdown Button">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Dropdown as={ButtonGroup}>
          <Button>Primary</Button>
          <Dropdown.Toggle split />
          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="secondary">secondary</Button>
          <Dropdown.Toggle split variant="secondary" />
          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="success">success</Button>
          <Dropdown.Toggle split variant="success" />
          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="danger">danger</Button>
          <Dropdown.Toggle split variant="danger" />
          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="warning">warning</Button>
          <Dropdown.Toggle split variant="warning" />
          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="info">info</Button>
          <Dropdown.Toggle split variant="info" />
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
