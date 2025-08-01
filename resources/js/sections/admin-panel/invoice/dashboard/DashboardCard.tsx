// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// card data
const cardData: { icon: string; label: string; bg: string }[] = [
  { icon: 'ph ph-invoice', label: 'All Invoices', bg: 'bg-primary' },
  { icon: 'ph ph-book-bookmark ', label: 'Reports', bg: 'bg-info' },
  { icon: 'ph ph-currency-circle-dollar ', label: 'Paid', bg: 'bg-success' },
  { icon: 'ph ph-clock-countdown ', label: 'Pending', bg: 'bg-warning' },
  { icon: 'ph ph-x-circle', label: 'Cancelled', bg: 'bg-danger' },
  { icon: 'ph ph-clipboard-text ', label: 'Draft', bg: 'bg-primary' }
];

// ==============================|| ADMIN PANEL - DASHBOARD CARD ||============================== //

export default function DashboardCard() {
  return (
    <MainCard>
      <Row className="g-3 text-center">
        {cardData.map(({ icon: Icon, label, bg }, index) => (
          <Col xs={6} key={index}>
            <MainCard className="mb-0" bodyClassName="py-4 px-2">
              <div className={`avatar ${bg} rounded-circle`}>
                <i className={`${Icon} f-24 text-white`} />
              </div>
              <h6 className="mb-0 mt-3 text-muted">{label}</h6>
            </MainCard>
          </Col>
        ))}
      </Row>
    </MainCard>
  );
}
