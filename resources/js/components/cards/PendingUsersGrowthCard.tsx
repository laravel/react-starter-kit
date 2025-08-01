// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface PendingUsersGrowthCardProps {
  value: number;
  title: string;
  label: string;
  icon: string;
  perecent: string;
  bgcolor: string;
}

// =============================|| PENDING USERS GROWTH CARD ||============================== //

export default function PendingUsersGrowthCard({ value, title, label, icon, perecent, bgcolor }: PendingUsersGrowthCardProps) {
  return (
    <MainCard className={bgcolor}>
      <Row>
        <Col className="text-center">
          <h3 className="text-white f-w-300 m-b-10">{value}</h3>
          <p className="mb-0 text-white text-uppercase">{title}</p>
        </Col>
        <Col className="text-end">
          <p className="mb-0 text-white d-block p-1">{label}</p>
          <Stack direction="horizontal" className="text-white justify-content-end align-items-center gap-1 p-1">
            <i className={`${icon} text-white f-26`} /> {perecent}%
          </Stack>
        </Col>
      </Row>
    </MainCard>
  );
}
