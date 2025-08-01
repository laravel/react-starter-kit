// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BADGES - PILL ||============================== //

export default function PillBadge() {
  return (
    <MainCard title="Pill Badges">
      <Stack gap={2} direction="horizontal" className="flex-wrap">
        <Badge pill>Primary</Badge>
        <Badge pill bg="secondary">
          Secondary
        </Badge>
        <Badge pill bg="success">
          Success
        </Badge>
        <Badge pill bg="danger">
          Danger
        </Badge>
        <Badge pill bg="warning">
          Warning
        </Badge>
        <Badge pill bg="info">
          Info
        </Badge>
        <Badge pill bg="light" text="dark">
          Light
        </Badge>
        <Badge pill bg="dark">
          Dark
        </Badge>
      </Stack>
    </MainCard>
  );
}
