import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BitCoinWalletCard from '@/components/cards/BitCoinWalletCard';
import { NotificationsCard, StatisticsAreaChart, StatisticsLineChart, UsersMap } from '@/sections/dashboard/crypto';

// =============================|| CRYPTO - BITCOIN CARD DATA ||============================== //

const BitCoinCardData = [
  {
    bgClass: 'bg-brand-color-1',
    title: 'Bitcoin Wallet',
    amount: '9,302',
    description: 'Ratings by Market Capitalization',
    iconClass: 'ti ti-currency-bitcoin'
  },
  {
    bgClass: 'bg-brand-color-2',
    title: 'Bitcoin Wallet',
    amount: '8,101',
    description: 'Ratings by Market Capitalization',
    iconClass: 'ti ti-currency-dollar'
  },
  {
    bgClass: 'bg-primary',
    title: 'Bitcoin Wallet',
    amount: '7,501',
    description: 'Ratings by Market Capitalization',
    iconClass: 'ti ti-currency-pound'
  }
];

// =============================|| DASHBOARD - CRYPTO ||============================== //

export default function CryptoPage() {
  return (
    <>
      <AppLayout>
        <Head title="crypto" />
        <Row>
          {/* row - 1 */}
          {BitCoinCardData.map((card, index) => (
            <Col md={index === 2 ? 12 : 6} xl={4} key={index}>
              <BitCoinWalletCard
                bgClass={card.bgClass}
                title={card.title}
                amount={card.amount}
                description={card.description}
                iconClass={card.iconClass}
              />
            </Col>
          ))}

          {/* row - 2 */}
          <Col md={12} xl={8}>
            <StatisticsLineChart />
          </Col>
          <Col md={12} xl={4}>
            <NotificationsCard />
          </Col>

          {/* row - 3 */}
          <Col md={12} xl={8}>
            <UsersMap height={350} />
          </Col>
          <Col md={12} xl={4}>
            <StatisticsAreaChart />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
