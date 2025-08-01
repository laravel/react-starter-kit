// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import DropDown from './DropDown';
import MainCard from '@/components/MainCard';

// assets
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';
import Avatar4 from '@assets/images/user/avatar-4.png';
import Avatar5 from '@assets/images/user/avatar-5.png';
import Avatar6 from '@assets/images/user/avatar-6.png';

// ==============================|| DATA - QUICK TRANSFER CARD ||============================== //

const quickTransferCard = [
  {
    id: 1,
    image: Avatar6,
    title: 'Starbucks Cafe',
    date: '11th Sep 2020',
    amount: -26,
    isNegative: true
  },
  {
    id: 2,
    image: Avatar5,
    title: 'Apple inc.',
    date: '13th Sep 2020',
    amount: -750,
    isNegative: false
  },
  {
    id: 3,
    image: Avatar4,
    title: 'Ola Cabs',
    date: '15th Sep 2020',
    amount: -26,
    isNegative: true
  }
];

// ==============================|| FINANCE - QUICK TRANSFER CARD ||============================== //

export default function QuickTransferCard() {
  return (
    <MainCard>
      <Stack direction="horizontal" className=" align-items-center justify-content-between mb-3">
        <h5 className="mb-0">Quick Transfer</h5>
        <DropDown className="avatar-s" />
      </Stack>

      <Stack direction="horizontal" gap={2} className="align-items-center justify-content-between my-3">
        <Button variant="light" className="avatar border border-secondary rounded-circle">
          <i className="ti ti-plus f-20"></i>
        </Button>

        <a className="avatar">
          <Image className="rounded-circle img-fluid" src={Avatar2} alt="User image" />
        </a>
        <a className="avatar">
          <Image className="rounded-circle img-fluid" src={Avatar3} alt="User image" />
        </a>
        <a className="avatar">
          <Image className="rounded-circle img-fluid" src={Avatar4} alt="User image" />
        </a>
        <a className="avatar">
          <Image className="rounded-circle img-fluid" src={Avatar5} alt="User image" />
        </a>
      </Stack>

      <ListGroup as="ul" className="list-group-flush">
        {quickTransferCard.map((transaction) => (
          <ListGroup.Item as="li" className="px-0" key={transaction.id}>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <Image src={transaction.image} alt="img" className="wid-30 rounded" />
              </div>
              <div className="flex-grow-1 ms-3">
                <Row className="g-1">
                  <Col xs={6}>
                    <h6 className="mb-0">{transaction.title}</h6>
                    <p className="text-muted mb-0">{transaction.date}</p>
                  </Col>
                  <Col xs={6} className="text-end">
                    <h5 className={`mb-1 ${transaction.isNegative ? 'text-danger' : 'text-success'}`}>
                      {transaction.isNegative ? `-$${Math.abs(transaction.amount)}` : `+$${Math.abs(transaction.amount)}`}
                    </h5>
                  </Col>
                </Row>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </MainCard>
  );
}
