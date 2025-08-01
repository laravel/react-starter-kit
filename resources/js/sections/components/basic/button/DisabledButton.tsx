// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - DISABLED ||============================== //

export default function DisabledButton() {
  return (
    <MainCard title="Disabled Button">
      <p>
        use <code>.disabled</code> in class <code>.btn</code> class to get Disabled button
      </p>
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="success" disabled>
          Success
        </Button>
        <Button variant="danger" disabled>
          Danger
        </Button>
        <Button variant="warning" disabled>
          Warning
        </Button>
        <Button variant="info" disabled>
          Info
        </Button>
        <Button variant="light" disabled>
          Light
        </Button>
        <Button variant="dark" disabled>
          Dark
        </Button>
      </Stack>
    </MainCard>
  );
}
