// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BADGES - BUTTON ||============================== //

export default function ButtonBadge() {
  return (
    <MainCard title="Button Badges">
      <Stack gap={4} direction="horizontal">
        <Button>
          Profile {'  '}
          <Badge bg="light" text="dark">
            4
          </Badge>
          <span className="visually-hidden">unread messages</span>
        </Button>
        <Button variant="secondary" className="position-relative">
          Inbox
          <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
            99+
          </Badge>
          <span className="visually-hidden">unread messages</span>
        </Button>
        <Button variant="info" className="position-relative">
          Profile
          <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle p-2  border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </Badge>
        </Button>
      </Stack>
    </MainCard>
  );
}
