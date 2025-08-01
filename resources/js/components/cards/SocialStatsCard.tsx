// react-bootstrap
import ProgressBar, { ProgressBarProps } from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface ProgressStateProps {
  label: string;
  value: string;
  progress: ProgressBarProps;
}

interface SocialStatsCardProps {
  icon: string;
  count: string;
  color: string;
  percentage: string;
  stats: ProgressStateProps[];
}

// ==============================|| SOCIAL STATS CARD ||============================== //

export default function SocialStatsCard({ icon, count, percentage, color, stats }: SocialStatsCardProps) {
  return (
    <MainCard content={false}>
      <MainCard className="card-social mb-0 border-bottom shadow-none">
        <Row className="align-items-center ">
          <Col xs="auto">
            <i className={`${icon} f-36`} />
          </Col>
          <Col className="text-end">
            <h3>{count}</h3>
            <h5 className={`${color} mb-0`}>
              {percentage} <span className="text-muted">Total Likes</span>
            </h5>
          </Col>
        </Row>
      </MainCard>
      <MainCard className="shadow-none mb-0">
        <Row className="align-items-center justify-content-center card-active">
          {stats.map((item, index) => (
            <Col xs={6} key={index} className={index !== stats.length - 1 ? 'border-end' : ''}>
              <h6 className="text-center m-b-10">
                <span className="text-muted m-r-5">{item.label}:</span>
                {item.value}
              </h6>
              <ProgressBar className="m-t-10">
                <ProgressBar {...item.progress} />
              </ProgressBar>
            </Col>
          ))}
        </Row>
      </MainCard>
    </MainCard>
  );
}
