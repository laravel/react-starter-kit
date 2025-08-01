// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Card1 from '@assets/images/widget/img-card-1.png';
import Card2 from '@assets/images/widget/img-card-2.png';

// ==============================|| DATA - ACCOUNTS CARD ||============================== //

const accountsCardData = [
  {
    id: 1,
    image: Card1,
    status: 'Active',
    amount: '12,920.000',
    currency: 'US Dollar'
  },
  {
    id: 2,
    image: Card2,
    status: 'Active',
    amount: '12,920.000',
    currency: 'US Dollar'
  }
];

// ==============================|| FINANCE - ACCOUNTS CARD ||============================== //

export default function AccountsCard() {
  return (
    <MainCard>
      <h5 className="mb-3">Accounts</h5>
      <Row className="g-3">
        {accountsCardData.map((account) => (
          <Col xs={12} key={account.id}>
            <MainCard className="shadow-none border mb-0" bodyClassName="p-3">
              <Stack direction="horizontal" className="align-items-center">
                <div className="flex-shrink-0">
                  <Image src={account.image} alt="img" fluid />
                </div>
                <div className="flex-grow-1 ms-3">
                  <Stack direction="horizontal" gap={2} className="align-items-center justify-content-center text-success">
                    <i className="ti ti-circle f-10" />
                    <p className="mb-0">{account.status}</p>
                  </Stack>
                </div>
                <div className="flex-shrink-0">
                  <h6 className="mb-0">{account.amount}</h6>
                  <p className="mb-0">{account.currency}</p>
                </div>
              </Stack>
            </MainCard>
          </Col>
        ))}
        <Col xs={12}>
          <Form.Group controlId="formFile" className="d-none">
            <Form.Control type="file" />
          </Form.Group>
          <Form.Label htmlFor="formFile" className="d-block mb-0 cursor-pointer">
            <MainCard className="shadow-none border mb-0" bodyClassName="p-3 text-center">
              <Stack direction="horizontal" gap={2} className=" align-items-center justify-content-center flex-column">
                <div className="avatar avatar-s bg-dark text-white rounded-circle">
                  <i className="ti ti-plus f-18" />
                </div>
                <span className="text-muted">Add to Account</span>
              </Stack>
            </MainCard>
          </Form.Label>
        </Col>
      </Row>
    </MainCard>
  );
}
