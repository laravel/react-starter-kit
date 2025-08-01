// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - OUTLINE ||============================== //

export default function OutLineButton() {
  return (
    <MainCard title="Outline">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button variant="outline-primary">Primary</Button>
        <Button variant="outline-secondary">Secondary</Button>
        <Button variant="outline-success">Success</Button>
        <Button variant="outline-danger">Danger</Button>
        <Button variant="outline-warning">Warning</Button>
        <Button variant="outline-info">Info</Button>
        <Button variant="outline-dark">Dark</Button>
      </Stack>
    </MainCard>
  );
}
