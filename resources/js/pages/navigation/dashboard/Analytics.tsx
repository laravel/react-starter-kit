import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import OrderSummaryCard from '@/components/cards/OrderSummaryCard';
import UserStatsCard from '@/components/cards/UserStatsCard';
import VisitorGrowthTrackerCard from '@/components/cards/VisitorGrowthTrackerCard';
import {
  ActiveVisitorCard,
  AgeChart,
  StatisticsBarChart,
  StatisticsLineChart1,
  TransactionsCard1,
  TransactionsCard2,
  TransactionsCard3
} from '@/sections/dashboard/analytics';

// assets
import Avatar1 from '@assets/images/widget/user-1.png';
import Avatar2 from '@assets/images/widget/user-2.png';

// ===============================|| USER STATS CARD - DATA ||============================== //

const userStatsCardData = [
  { title: 'Register User', count: 1205, percentage: 20, label: 'Monthly Increase' },
  { title: 'Daily User', count: 467, percentage: 10, label: 'Weekly Increase' },
  { title: 'Premium User', count: 346, percentage: 50, label: 'Yearly Increase' }
];

// =============================|| DASHBOARD - ANALYTICS ||============================== //

export default function AnalyticsPage() {
  return (
    <>
      <AppLayout>
        <Head title="Analytics" />
        <Row>
          {/* row - 1 */}
          {userStatsCardData.map((item, index) => (
            <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
              <UserStatsCard {...item} />
            </Col>
          ))}

          {/* row - 2 */}
          <Col md={6} xl={4}>
            <ActiveVisitorCard />
          </Col>
          <Col md={6} xl={4}>
            <AgeChart />
          </Col>
          <Col md={12} xl={4}>
            <VisitorGrowthTrackerCard
              title="TOTAL VISITORS"
              value={235}
              description="20% More than last Month"
              avatar1={Avatar1}
              avatar2={Avatar2}
              bgClass="bg-brand-color-1"
            />
            <OrderSummaryCard
              icon="ph ph-shopping-cart"
              title="Last week’s orders"
              description="New Order"
              value={589}
              badgevalue={1434}
              color="bg-brand-color-1"
            />
          </Col>

          {/* row - 3 */}
          <Col md={12} xl={8}>
            <StatisticsBarChart />
          </Col>
          <Col md={12} xl={4}>
            <StatisticsLineChart1 />
          </Col>

          {/* row - 4 */}
          <Col md={6} xl={4}>
            <TransactionsCard1 />
          </Col>
          <Col md={6} xl={4}>
            <TransactionsCard2 />
          </Col>
          <Col md={12} xl={4}>
            <TransactionsCard3 />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
