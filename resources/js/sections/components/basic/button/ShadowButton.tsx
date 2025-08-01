// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - SHADOW ||============================== //

export default function ShadowButton() {
  return (
    <MainCard title="Shadow">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button className="btn-shadow">Primary</Button>
        <Button variant="secondary" className="btn-shadow">
          Secondary
        </Button>
        <Button variant="success" className="btn-shadow">
          Success
        </Button>
        <Button variant="danger" className="btn-shadow">
          Danger
        </Button>
        <Button variant="warning" className="btn-shadow">
          Warning
        </Button>
        <Button variant="info" className="btn-shadow">
          Info
        </Button>
        <Button variant="light" className="btn-shadow">
          Light
        </Button>
        <Button variant="dark" className="btn-shadow">
          Dark
        </Button>
        <Button variant="link" className="btn-shadow">
          Link
        </Button>
      </Stack>
    </MainCard>
  );
}
