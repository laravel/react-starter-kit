// react-bootstrap
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface DeviceStats {
  label: string;
  percentage: string;
}

// ==============================|| DATA - ACTIVE VISITOR CARD ||============================== //

const activeVisitorData: DeviceStats[] = [
  { label: 'Desktop', percentage: '52%' },
  { label: 'Mobile', percentage: '80%' },
  { label: 'Tablet', percentage: '68%' }
];

// ==============================|| ANALYTICS - ACTIVE VISITOR CARD ||============================== //

export default function ActiveVisitorCard() {
  return (
    <MainCard className="Active-visitor text-center">
      <h5 className="mb-3">Active Visitor</h5>
      <i className="ti ti-user-bolt f-30 text-success" />
      <h2 className="f-w-300 mt-3">1,285</h2>
      <span className="text-muted">Active Visit On Sites</span>
      <ProgressBar className="mt-4 m-b-40">
        <ProgressBar now={75} className="bg-brand-color-1" />
      </ProgressBar>
      <Row className="card-active">
        {activeVisitorData.map(({ label, percentage }, index) => (
          <Col key={index} xs={index === activeVisitorData.length - 1 ? 12 : 6} md={4}>
            <h4>{percentage}</h4>
            <span className="text-muted">{label}</span>
          </Col>
        ))}
      </Row>
    </MainCard>
  );
}
