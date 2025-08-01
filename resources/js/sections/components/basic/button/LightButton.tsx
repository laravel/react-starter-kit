// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - LIGHT ||============================== //

export default function LightButton() {
  return (
    <MainCard title="Light">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button variant="light-primary">Primary</Button>
        <Button variant="light-secondary">Secondary</Button>
        <Button variant="light-success">Success</Button>
        <Button variant="light-danger">Danger</Button>
        <Button variant="light-warning">Warning</Button>
        <Button variant="light-info">Info</Button>
        <Button variant="light-dark">Dark</Button>
      </Stack>
    </MainCard>
  );
}
