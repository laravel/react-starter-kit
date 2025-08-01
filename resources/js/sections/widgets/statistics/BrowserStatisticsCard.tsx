// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BROWSER STATISTICS - DATA ||============================== //

const browserStatisticsData = [
  {
    icon: 'ti ti-mood-smile',
    color: 'text-success',
    count: 235,
    browser: 'Google Chrome'
  },
  {
    icon: 'ti ti-mood-smile',
    color: 'text-secondary',
    count: 95,
    browser: 'Mozilla Firefox'
  },
  {
    icon: 'ti ti-mood-smile',
    color: 'text-danger',
    count: 18,
    browser: 'Internet Explorer'
  }
];

// =============================|| STATISTICS - BROWSER STATISTICS CARD ||============================== //

export default function BrowserStatisticsCard() {
  return (
    <MainCard>
      <h5 className="mb-4">Review With Emotions</h5>
      {browserStatisticsData.map((item, index) => (
        <div className={`review-emotion ${index === browserStatisticsData.length - 1 ? 'mb-0' : 'mb-3'}`} key={index}>
          <Row className="align-items-center justify-content-center">
            <Col>
              <i className={`${item.icon} f-20 ${item.color}`} />
            </Col>
            <Col xs="auto">
              <h5 className="m-0">{item.count}</h5>
            </Col>
            <Col className="text-end">
              <p className="mb-0">{item.browser}</p>
            </Col>
          </Row>
        </div>
      ))}
    </MainCard>
  );
}
