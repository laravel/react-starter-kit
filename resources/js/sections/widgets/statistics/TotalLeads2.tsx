// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DATA - LEADS CARD ||============================== //

const leadsData = [
  { label: 'Total Cost', value: 340 },
  { label: 'Quality Of Product', value: '65%' },
  { label: 'Delivery Period', value: '4 Days' },
  { label: 'Buy Product', value: 245 }
];

// =============================|| STATISTICS - TOTAL LEADS 2 ||============================== //

export default function TotalLeads2() {
  return (
    <MainCard>
      <h5 className="text-center">Total Leads</h5>
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <h3 className="f-w-300 m-t-20">
            $73,48
            <i className="ti ti-caret-up-filled text-success f-26 m-l-10" />
          </h3>
          <span>EARNINGS</span>
        </Col>

        <Col className="text-end">
          <i className="ti ti-chart-area-line-filled f-30 text-primary" />
        </Col>
      </Row>

      <div className="leads-progress mt-3">
        <h6 className="mb-3 text-center">
          Quality <span className="ms-4">Delivery</span>
        </h6>
        <ProgressBar>
          <ProgressBar className="bg-brand-color-2" now={30} />
          <ProgressBar className="bg-brand-color-1" now={35} />
        </ProgressBar>
        {leadsData.map((item, index) => (
          <h6 className={`text-muted f-w-300 mt-4 ${index === leadsData.length - 1 && 'mb-0'}`} key={index}>
            {item.label}
            <span className="float-end">{item.value}</span>
          </h6>
        ))}
      </div>
    </MainCard>
  );
}
