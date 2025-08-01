import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

// project-imports
import MainCard from '@/components/MainCard';
import MoneyCard from '@/components/cards/MoneyCard';
import TransactionsChart from '@/components/cards/TransactionsChart';
import {
  AccountsCard,
  CashflowChart,
  CategoryChart,
  MyCard,
  QuickTransferCard,
  TransactionHistoryList,
  TransactionsCard
} from '@/sections/dashboard/finance';

// assets
import Image2 from '@assets/images/widget/img-food.png';
import Image3 from '@assets/images/widget/img-travel.png';
import Image4 from '@assets/images/widget/img-shopping.png';
import Image5 from '@assets/images/widget/img-health.png';

// ===============================|| MONEY CARD - DATA ||============================== //

const moneyCardData = [
  {
    image: Image2,
    title: 'Food & Drink',
    value: 1000,
    progress: { now: 50 }
  },
  {
    image: Image3,
    title: 'Travel',
    value: 400,
    progress: { now: 30 }
  },
  {
    image: Image4,
    title: 'Shopping',
    value: 900,
    progress: { now: 52 }
  },
  {
    image: Image5,
    title: 'Healthcare',
    value: 250,
    progress: { now: 26 }
  }
];

// ===============================|| TRANSACTION CHART - DATA ||============================== //

const transactionChartsData = [
  {
    title: 'Transactions',
    dateRange: '2-31 July 2023',
    amount: '650k',
    description: 'Compare to last week',
    chartColor: '#1de9b6',
    series: [{ name: 'Transactions', data: [20, 10, 18, 12, 25, 10, 20] }]
  },
  {
    title: 'Transactions',
    dateRange: '2-31 July 2023',
    amount: '650k',
    description: 'Compare to last week',
    chartColor: '#ff9800',
    series: [{ name: 'Income', data: [20, 10, 18, 12, 25, 10, 20] }]
  },
  {
    title: 'Transactions',
    dateRange: '2-31 July 2023',
    amount: '650k',
    description: 'Compare to last week',
    chartColor: '#f44336',
    series: [{ name: 'Expenses', data: [20, 10, 18, 12, 25, 10, 20] }]
  }
];

// =============================|| DASHBOARD - FINANCE ||============================== //

export default function FinancePage() {
  return (
    <>
      <AppLayout>
        <Head title="Finance" />
        <Row>
          {/* row - 1 */}
          <Col lg={5} xxl={4}>
            <Row>
              <Col md={6} lg={12}>
                <MyCard />
              </Col>
              <Col md={6} lg={12}>
                <TransactionsCard />
              </Col>
            </Row>
          </Col>
          <Col lg={7} xxl={8}>
            <Row>
              {transactionChartsData.map((chart, index) => (
                <Col key={index} md={index === 2 ? 12 : 6} xxl={4}>
                  <TransactionsChart {...chart} />
                </Col>
              ))}
            </Row>
            <CashflowChart />

            <MainCard>
              <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Where your money go ?</h5>
                <Button className="btn btn-sm btn-primary">+ Add New</Button>
              </Stack>
              <Row className="g-3">
                {moneyCardData.map((card, index) => (
                  <Col key={index} md={6} xxl={3}>
                    <MoneyCard {...card} />
                  </Col>
                ))}
              </Row>
            </MainCard>
          </Col>

          {/* row - 2 */}
          <Col md={12} xxl={4}>
            <AccountsCard />
          </Col>
          <Col md={6} xxl={4}>
            <QuickTransferCard />
          </Col>
          <Col md={6} xxl={4}>
            <CategoryChart />
          </Col>

          {/* row - 3 */}
          <Col xs={12}>
            <TransactionHistoryList />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
