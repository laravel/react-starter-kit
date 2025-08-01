// react-bootstrap
import Badge, { BadgeProps } from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import ProgressBar, { ProgressBarProps } from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface MonthlyInvoiceCardProps {
  icon: string;
  badge?: BadgeProps;
  badgelabel: string;
  title: string;
  value: number;
  progress: ProgressBarProps;
}

// ==============================|| MONTHLY INVOICE CARD ||============================== //

export default function MonthlyInvoiceCard({ badge, badgelabel, icon, title, progress, value }: MonthlyInvoiceCardProps) {
  return (
    <MainCard className="bg-brand-color-1 Invoice-bar">
      <div className="text-end invoice-label">
        <Badge className="text-body rounded-pill f-14" bg="white" {...badge}>
          {badgelabel}
        </Badge>
      </div>
      <Row>
        <Col xs="auto">
          <i className={`${icon} f-30 text-white`} />
        </Col>
        <Col>
          <h5 className="text-white mb-2">{title}</h5>
          <h3 className="text-white mb-0">{value}</h3>
          <ProgressBar variant="white" className="mt-3" {...progress} />
        </Col>
      </Row>
    </MainCard>
  );
}
