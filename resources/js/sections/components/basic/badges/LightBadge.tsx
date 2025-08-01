// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BADGES - LIGHT ||============================== //

export default function LightBadge() {
  return (
    <MainCard title="Light variant">
      <Stack gap={2} direction="horizontal" className="flex-wrap">
        <Badge bg="light-primary">Primary</Badge>
        <Badge bg="light-secondary">Secondary</Badge>
        <Badge bg="light-success">Success</Badge>
        <Badge bg="light-danger">Danger</Badge>
        <Badge bg="light-warning">Warning</Badge>
        <Badge bg="light-info">Info</Badge>
        <Badge bg="light-light">Light</Badge>
        <Badge bg="light-dark" text="light" style={{ background: '#13192033' }}>
          Dark
        </Badge>
      </Stack>
    </MainCard>
  );
}
