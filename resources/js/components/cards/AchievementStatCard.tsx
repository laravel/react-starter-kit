// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface AchievementStatCardProps {
  value: string | number;
  label: string;
  icon: string;
  bgColor: string;
}

// ==============================|| ACHIEVEMENT STAT CARD ||============================== //

export default function AchievementStatCard({ value, label, icon, bgColor }: AchievementStatCardProps) {
  return (
    <MainCard className="card-customer">
      <Row className="align-items-center justify-between-center">
        <Col>
          <h2 className="mb-2 f-w-300">{value}</h2>
          <h5 className="text-muted mb-0">{label}</h5>
        </Col>
        <Col xs="auto">
          <i className={`${icon} f-30 text-white ${bgColor}`} />
        </Col>
      </Row>
    </MainCard>
  );
}
