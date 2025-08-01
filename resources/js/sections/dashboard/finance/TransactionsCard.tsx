// react-bootstrap
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import DropDown from './DropDown';
import MainCard from '@/components/MainCard';

// ==============================|| DATA - TRANSACTIONS CARD ||============================== //

const TransactionsCardData = [
  {
    id: 1,
    avatar: 'AI',
    title: 'Apple Inc.',
    subtitle: '#ABLE-PRO-T00232',
    value: '$210,000',
    percentage: 10.6,
    avatarClass: 'border',
    valueClass: 'text-danger',
    arrowClass: 'ti-arrow-down-left'
  },
  {
    id: 2,
    avatar: 'SM',
    title: 'Spotify Music',
    subtitle: '#ABLE-PRO-T10232',
    value: '-10,000',
    percentage: 30.6,
    avatarClass: 'border',
    valueClass: 'text-success',
    arrowClass: 'ti-arrow-up-right'
  },
  {
    id: 3,
    avatar: 'MD',
    title: 'Medium',
    subtitle: '06:30 pm',
    value: '-26',
    percentage: 5,
    time: '06:30 pm',
    avatarClass: 'border bg-light-primary',
    valueClass: 'text-warning',
    arrowClass: 'ti-arrows-left-right'
  },
  {
    id: 4,
    avatar: 'U',
    title: 'Uber',
    subtitle: '08:40 pm',
    value: '+210,000',
    percentage: 10.6,
    time: '08:40 pm',
    avatarClass: 'border',
    valueClass: 'text-success',
    arrowClass: 'ti-arrow-up-right'
  },
  {
    id: 5,
    avatar: 'OC',
    title: 'Ola Cabs',
    subtitle: '07:40 pm',
    value: '+210,000',
    percentage: 10.6,
    time: '07:40 pm',
    avatarClass: 'border bg-light-warning',
    valueClass: 'text-success',
    arrowClass: 'ti-arrow-up-right'
  },
  {
    id: 6,
    avatar: 'PR',
    title: 'Porter',
    subtitle: '07:40 pm',
    value: '+210,000',
    percentage: 10.6,
    time: '07:40 pm',
    avatarClass: 'border bg-light-primary',
    valueClass: 'text-success',
    arrowClass: 'ti-arrow-up-right'
  }
];

// ==============================|| FINANCE - TRANSACTIONS CARD ||============================== //

export default function TransactionsCard() {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <h5 className="mb-0">Transactions</h5>
        <DropDown className="avatar-s" />
      </Stack>
      {TransactionsCardData.map((item, index) => (
        <ListGroup.Item as="li" className={`px-0 ${index !== TransactionsCardData.length - 1 && 'border-bottom'}`} key={item.id}>
          <Stack direction="horizontal" className="py-3 align-items-center">
            <div className="flex-shrink-0">
              <div className={`avatar avatar-s ${item.avatarClass}`} title={item.subtitle}>
                <span>{item.avatar}</span>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <Row className="g-1">
                <Col xs={6}>
                  <h6 className="mb-0">{item.title}</h6>
                  <p className="text-muted mb-0">
                    <small>{item.subtitle}</small>
                  </p>
                </Col>
                <Col xs={6} className="text-end">
                  <h6 className="mb-1">{item.value}</h6>
                  <p className={item.valueClass + ' mb-0'}>
                    <i className={`ti ${item.arrowClass}`}></i> {item.percentage}%
                  </p>
                </Col>
              </Row>
            </div>
          </Stack>
        </ListGroup.Item>
      ))}
    </MainCard>
  );
}
