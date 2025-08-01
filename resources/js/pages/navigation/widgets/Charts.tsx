import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import {
  AgeChart,
  StatisticsBarChart,
  StatisticsLineChart1,
  TransactionsCard1,
  TransactionsCard2,
  TransactionsCard3
} from '@/sections/dashboard/analytics';
import { EarningChart, UsersMap } from '@/sections/dashboard/default';
import { NewsStatisticsChart, PhoneCallChart } from '@/sections/dashboard/crm';
import { ReplyChart, StatisticsChart } from '@/sections/dashboard/project';
import { StatisticsAreaChart, StatisticsLineChart } from '@/sections/dashboard/crypto';
import { YearlyEarningChart, YearlySummaryChart } from '@/sections/dashboard/e-commerce';

import {
  ActivityPulseChart,
  ActivitySummaryChart,
  ComparisonLineChart,
  DeviceDistributionChart,
  DiscussionActivityChart,
  EngagementStatsChart,
  GenderProgress,
  MetricTimelineChart,
  MonthlyPerformanceChart,
  ProfileGrowthWidgetChart,
  RadarStatsWidgetChart,
  ReviewSummaryChart,
  SalesPerformanceChart,
  ShortTermStatsChart,
  TrendLineStatsChart,
  UserStatisticsChart,
  WalletCategoryChart,
  WebAnalyticsWidgetChart
} from '@/sections/widgets/charts';

// ==============================|| WIDGET - CHARTS ||============================== //

export default function ChartsMainPage() {
  return (
    <AppLayout>
      <Head title="Chart Widget" />
      <Row>
        {/* row - 1 */}
        <Col md={6} xl={4}>
          <DiscussionActivityChart />
        </Col>
        <Col md={6} xl={4}>
          <SalesPerformanceChart />
        </Col>
        <Col md={6} xl={4}>
          <MonthlyPerformanceChart />
        </Col>

        {/* row - 2 */}
        <Col md={6} xl={8}>
          <StatisticsLineChart />
        </Col>
        <Col md={6} xl={4}>
          <MetricTimelineChart />
        </Col>

        {/* row - 3 */}
        <Col md={6} xl={4}>
          <NewsStatisticsChart />
        </Col>
        <Col md={6} xl={8}>
          <ComparisonLineChart />
        </Col>

        {/* row - 4 */}
        <Col md={6} xl={8}>
          <UserStatisticsChart />
        </Col>
        <Col md={6} xl={4}>
          <EarningChart />
        </Col>

        {/* row - 5 */}
        <Col md={6} xl={4}>
          <YearlyEarningChart />
        </Col>
        <Col md={6} xl={4}>
          <ReplyChart />
        </Col>
        <Col md={6} xl={4}>
          <StatisticsChart />
        </Col>

        {/* row - 6 */}
        <Col md={12} xl={8}>
          <StatisticsBarChart />
        </Col>
        <Col md={6} xl={4}>
          <DeviceDistributionChart />
        </Col>

        {/* row - 7 */}
        <Col md={6} xl={4}>
          <WalletCategoryChart />
        </Col>
        <Col md={12} xl={8}>
          <YearlySummaryChart height={285} />
        </Col>

        {/* row - 8 */}
        <Col md={12} xl={8}>
          <ShortTermStatsChart />
        </Col>
        <Col md={6} xl={4}>
          <EngagementStatsChart />
        </Col>

        {/* row - 9 */}
        <Col md={6} xl={4}>
          <ActivitySummaryChart />
        </Col>
        <Col md={6} xl={4}>
          <StatisticsAreaChart height={230} />
        </Col>
        <Col md={6} xl={4}>
          <RadarStatsWidgetChart />
        </Col>

        {/* row - 10 */}
        <Col md={6} xl={4}>
          <WebAnalyticsWidgetChart />
        </Col>
        <Col md={6} xl={8}>
          <UsersMap height={510} />
        </Col>

        {/* row - 11 */}
        <Col md={6} xl={4}>
          <TransactionsCard1 />
        </Col>
        <Col md={6} xl={4}>
          <TransactionsCard2 />
        </Col>
        <Col md={12} xl={4}>
          <TransactionsCard3 />
        </Col>

        {/* row - 12 */}
        <Col md={6} xl={4}>
          <ActivityPulseChart />
        </Col>
        <Col md={6} xl={4}>
          <StatisticsLineChart1 height={255} />
        </Col>
        <Col md={6} xl={4}>
          <ProfileGrowthWidgetChart />
        </Col>

        {/* row - 13 */}
        <Col md={6} xl={8}>
          <TrendLineStatsChart />
        </Col>
        <Col md={6} xl={4}>
          <ReviewSummaryChart />
        </Col>

        {/* row - 14 */}
        <Col md={6} xl={4}>
          <PhoneCallChart />
        </Col>

        <Col md={6} xl={4}>
          <GenderProgress />
        </Col>

        <Col md={6} xl={4}>
          <AgeChart />
        </Col>
      </Row>
    </AppLayout>
  );
}
