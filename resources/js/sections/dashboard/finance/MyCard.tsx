// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import DropDown from './DropDown';
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/widget/img-card-master.svg';

// =============================|| FINANCE - MY CARD ||============================== //

export default function MyCard() {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <h5 className="mb-0">My Card</h5>
        <DropDown className="avatar-s" />
      </Stack>
      <MainCard className="rounded-4 overflow-hidden bg-cover finance-image">
        <Stack direction="horizontal">
          <div className="flex-grow-1">
            <Stack direction="horizontal" className="justify-content-between">
              <p className="text-white text-sm text-opacity-50 mb-0">CARD NAME</p>
              <Image src={Image1} className="img-fluid" alt="img-card-master" />
            </Stack>
            <h5 className="text-white">Jonh Smith</h5>
          </div>
          <div className="flex-shrink-0"></div>
        </Stack>
        <h4 className="text-white my-3">**** **** **** **** 8361</h4>
        <Row>
          <Col className="col-auto">
            <p className="text-white text-sm text-opacity-50 mb-0">EXP</p>
            <h6 className="text-white mb-0">7/30</h6>
          </Col>
          <Col className="col-auto">
            <p className="text-white text-sm text-opacity-50 mb-0">CVV</p>
            <h6 className="text-white mb-0">455</h6>
          </Col>
        </Row>
      </MainCard>
      <div className="text-center mt-3">
        <h3 className="mb-1">$1.480.000</h3>
        <p className="text-muted mb-0">Total Balance</p>
      </div>
    </MainCard>
  );
}
