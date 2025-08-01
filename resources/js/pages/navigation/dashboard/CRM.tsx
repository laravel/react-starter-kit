import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import WeeklyEarningCard from '@/components/cards/WeeklyEarningCard';
import {
  TransactionsCard,
  ProjectRatingCard,
  PhoneCallChart,
  RecentUsersCard,
  UserActivityCard,
  StatisticalCard,
  MarketsCard,
  LeadsCard,
  PortfolioCard,
  NewsStatisticsChart
} from '@/sections/dashboard/crm';

// =============================|| CRM - WEEKLY EARNING CARD DATA ||============================== //

const weeklyEarningCardData = {
  title: 'Page View',
  icon: 'ph ph-arrow-up',
  subtitle: 'TOTAL EARNINGS',
  defaultDay: 'mon',
  data: {
    mon: '9,456',
    tue: '8,568',
    wed: '3,756',
    thu: '9,635',
    fri: '23,486',
    sat: '86,789',
    sun: '93,628'
  }
};

// =============================|| DASHBOARD - CRM ||============================== //

export default function CRMPage() {
  return (
    <>
      <AppLayout>
        <Head title="CRM" />
        <Row>
          {/* row - 1 */}
          <Col md={6} xl={4}>
            <TransactionsCard />
            <ProjectRatingCard />
          </Col>
          <Col md={6} xl={4}>
            <NewsStatisticsChart />
          </Col>
          <Col sm={12} xl={4}>
            <PhoneCallChart />
          </Col>

          {/* row - 2 */}
          <Col md={12} xl={8}>
            <RecentUsersCard />
          </Col>
          <Col md={12} xl={4}>
            <UserActivityCard />
          </Col>

          {/* row - 3 */}
          <Col md={6} xl={4}>
            <WeeklyEarningCard {...weeklyEarningCardData} />
            <PortfolioCard />
          </Col>
          <Col md={6} xl={4}>
            <StatisticalCard />
          </Col>
          <Col md={12} xl={4}>
            <MarketsCard />
            <LeadsCard />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
