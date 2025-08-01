// react-bootstrap
import Col from 'react-bootstrap/Col';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - WALLET ||============================== //

export default function Wallet() {
  return (
    <>
      <Col md={6} xl={4}>
        <MainCard className="bg-brand-color-1 bitcoin-wallet">
          <h5 className="text-white mb-2">Bitcoinfsdgdg Wallet</h5>
          <h2 className="text-white mb-3 f-w-300">$9,302</h2>
          <span className="text-white d-block">Ratings by Market Capitalization</span>
          <i className="ti ti-currency-bitcoin f-70 text-white" />
        </MainCard>
      </Col>
      <Col md={6} xl={4}>
        <MainCard className="bg-brand-color-2 bitcoin-wallet">
          <h5 className="text-white mb-2">Bitcoin Wallet</h5>
          <h2 className="text-white mb-3 f-w-300">$9,302</h2>
          <span className="text-white d-block">Ratings by Market Capitalization</span>
          <i className="ti ti-currency-dollar f-70 text-white" />
        </MainCard>
      </Col>

      <Col md={12} xl={4}>
        <MainCard className="bg-primary bitcoin-wallet">
          <h5 className="text-white mb-2">Bitcoin Wallet</h5>
          <h2 className="text-white mb-3 f-w-300">$8,101</h2>
          <span className="text-white d-block">Ratings by Market Capitalization</span>
          <i className="ti ti-currency-pound f-70 text-white" />
        </MainCard>
      </Col>
    </>
  );
}
