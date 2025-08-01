// react-bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge, { BadgeProps } from 'react-bootstrap/Badge';

// project-imports
import MainCard from '@/components/MainCard';

interface ProfitSummaryCardProps {
  title: string;
  value: string;
  icon: string;
  badge?: BadgeProps;
  badgevalue: string;
  color: string;
  description: string;
}

// ==============================|| PROFIT SUMMARY CARD ||============================== //

export default function ProfitSummaryCard({ title, icon, value, badgevalue, color, description }: ProfitSummaryCardProps) {
  return (
    <MainCard className="profit-bar">
      <Row>
        <Col>
          <h5 className="f-w-300">{title}</h5>
          <h3 className="text-success f-w-400 m-t-10">${value}</h3>
        </Col>
        <Col>
          <i className={`${icon} text-white f-20 float-end`} />
        </Col>
      </Row>
      <h6 className="m-t-20 text-muted">
        <Badge className={`${color} text-white m-r-10`}>{badgevalue}</Badge>
        {description}
      </h6>
    </MainCard>
  );
}
