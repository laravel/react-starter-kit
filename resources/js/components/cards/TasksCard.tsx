// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface TasksCardProps {
  title: string;
  value: number;
  percentage: number;
  label: string;
  color: string;
}

// ==============================|| TASKS CARD ||============================== //

export default function TasksCard({ title, value, label, percentage, color }: TasksCardProps) {
  return (
    <MainCard title={<h4 className="mb-0 f-18 f-w-400">{title}</h4>}>
      <Row className="align-items-center">
        <Col xs="8">
          <h2 className="f-w-400 m-0">{value}</h2>
          <span className="text-muted">{label}</span>
        </Col>
        <Col xs={4} className=" text-end">
          <h5 className={`${color} f-w-400`}>{percentage}%</h5>
        </Col>
      </Row>
    </MainCard>
  );
}
