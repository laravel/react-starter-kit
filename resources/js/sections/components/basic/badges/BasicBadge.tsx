// react-bootstrap
import Badge from 'react-bootstrap/Badge';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BADGES - BASIC ||============================== //

export default function BasicBadge() {
  return (
    <MainCard title="Basic Badges">
      <h1>
        Example heading <Badge bg="dark">New</Badge>
      </h1>
      <h2>
        Example heading <Badge bg="dark">New</Badge>
      </h2>
      <h3>
        Example heading <Badge bg="dark">New</Badge>
      </h3>
      <h4>
        Example heading <Badge bg="dark">New</Badge>
      </h4>
      <h5>
        Example heading <Badge bg="dark">New</Badge>
      </h5>
      <h6>
        Example heading <Badge bg="dark">New</Badge>
      </h6>
    </MainCard>
  );
}
