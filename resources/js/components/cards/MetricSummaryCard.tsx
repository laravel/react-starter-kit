// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface MetricSummaryCardProps {
  value: string | number;
  title: string;
  image: string;
  className: string;
}

// ==============================|| METRIC SUMMARY CARD ||============================== //

export default function MetricSummaryCard({ value, title, image, className }: MetricSummaryCardProps) {
  return (
    <MainCard>
      <Row className="align-items-center justify-content-center">
        <Col>
          <h3 className={className}>{value}</h3>
          <h5>{title}</h5>
        </Col>
        <Col className="text-end">
          <Image src={image} alt="activity-user" className="wid-80" />
        </Col>
      </Row>
    </MainCard>
  );
}
