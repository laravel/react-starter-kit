// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BADGES - CONTEXTUAL ||============================== //

export default function ContextualBadge() {
  return (
    <MainCard title="Contextual Variations">
      <Stack gap={2} direction="horizontal" className="flex-wrap">
        <Badge>Primary</Badge>
        <Badge bg="secondary">Secondary</Badge>
        <Badge bg="success">Success</Badge>
        <Badge bg="danger">Danger</Badge>
        <Badge bg="warning">Warning</Badge>
        <Badge bg="info">Info</Badge>
        <Badge bg="light" text="dark">
          Light
        </Badge>
        <Badge bg="dark">Dark</Badge>
      </Stack>
    </MainCard>
  );
}
