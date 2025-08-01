import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import AchievementStatCard from '@/components/cards/AchievementStatCard';
import ActivityOverviewChart from '@/components/cards/ActivityOverviewChart';
import AnalyticsSummaryCard from '@/components/cards/AnalyticsSummaryCard';
import BitCoinWalletCard from '@/components/cards/BitCoinWalletCard';
import BusinessGrowthCard from '@/components/cards/BusinessGrowthCard';
import ExecutiveOverviewChart from '@/components/cards/ExecutiveOverviewChart';
import ImpressionMetricsCard from '@/components/cards/ImpressionMetricsCard';
import MonthlyInvoiceCard from '@/components/cards/MonthlyInvoiceCard';
import MetricOverviewCard from '@/components/cards/MetricOverviewCard';
import MetricSummaryCard from '@/components/cards/MetricSummaryCard';
import NewProductsIndicatorCard from '@/components/cards/NewProductsIndicatorCard';
import OrderStatusCard from '@/components/cards/OrderStatusCard';
import OrderSummaryCard from '@/components/cards/OrderSummaryCard';
import PendingUsersGrowthCard from '@/components/cards/PendingUsersGrowthCard';
import ProfitSummaryCard from '@/components/cards/ProfitSummaryCard';
import ProgressStatCard from '@/components/cards/ProgressStatCard';
import RatingOverviewCard from '@/components/cards/RatingOverviewCard';
import RideActivitySummaryCard from '@/components/cards/RideActivitySummaryCard';
import SalesPerformanceCard from '@/components/cards/SalesPerformanceCard';
import SaleProductCard from '@/components/cards/SaleProductCard';
import SocialStatsCard from '@/components/cards/SocialStatsCard';
import StatIndicatorCard from '@/components/cards/StatIndicatorCard';
import TasksCard from '@/components/cards/TasksCard';
import UpcomingEventCard from '@/components/cards/UpcomingEventCard';
import UserStatsCard from '@/components/cards/UserStatsCard';
import VisitorGrowthTrackerCard from '@/components/cards/VisitorGrowthTrackerCard';
import WeeklyEarningCard from '@/components/cards/WeeklyEarningCard';

import ActiveVisitorCard from '@/sections/dashboard/ActiveVisitorCard';
import MarketsCard from '@/sections/dashboard/MarketsCard';
import PortfolioCard from '@/sections/dashboard/PortfolioCard';
import ProjectTaskCard from '@/sections/dashboard/ProjectTaskCard';
import SalesStatisticsCard from '@/sections/dashboard/SalesStatisticsCard';
import StatisticalCard from '@/sections/dashboard/StatisticalCard';

import {
  BillingSummaryCard,
  BrowserStatisticsCard,
  ConnectionFilterCard,
  CountdownTimerCard,
  CustomerMetricCard,
  MonthlyGrowthCard,
  MonthlyRevenueSummaryCard,
  PortfolioSummaryCard,
  ProductSummaryCard,
  ProfitCard,
  SalesInsightCard,
  SalesPerformanceOverviewCard,
  SavingAccountSummaryCard,
  SupportMetricCard,
  TeamMemberCard,
  TotalLeads1,
  TotalLeads2,
  WeatherSnapshotCard,
  WeatherSummaryCard
} from '@/sections/widgets/statistics';

// =============================|| STATISTICS - DATA ||============================== //

import {
  achievementStatCardData,
  activityOverviewChartData,
  analyticsSummaryCardData,
  bitCoinCardData,
  executiveOverviewChartData,
  metricSummaryCardData,
  orderStatusData,
  saleProductCardData,
  salesPerformanceData,
  socialStatsData,
  statIndicatorData,
  tasksCardData,
  userStatsCardData,
  weeklyEarningCardData,
  weeklyPageViewData
} from './data';

// assets
import Avatar1 from '@assets/images/widget/user-1.png';
import Avatar2 from '@assets/images/widget/user-2.png';

// =============================|| WIDGET - STATISTICS ||============================== //

export default function StatisticsWidget() {
  return (
    <AppLayout>
      <Head title="Statistics Widgets" />
      <Row>
        {/* row - 1 */}
        {salesPerformanceData.map((item, index) => (
          <Col key={index} md={6} xl={4}>
            <SalesPerformanceCard {...item} />
          </Col>
        ))}
        <Col md={12} xl={4}>
          <SalesPerformanceOverviewCard />
        </Col>

        {/* row - 2 */}
        <Col md={6} xl={4}>
          <ConnectionFilterCard />
        </Col>
        <Col md={6} xl={4}>
          <StatIndicatorCard data={statIndicatorData} />
        </Col>
        <Col md={12} xl={4}>
          <WeatherSnapshotCard />
        </Col>

        {/* row - 3 */}
        <Col md={12} xl={4}>
          <WeatherSummaryCard />
        </Col>
        <Col md={6} xl={4}>
          <NewProductsIndicatorCard icon="ph ph-cube" title="New Products" value={235} iconColor="bg-brand-color-1" />
        </Col>
        <Col md={6} xl={4}>
          <RideActivitySummaryCard
            icon="ph ph-shopping-cart"
            value={383}
            title="Rides"
            label="Last week 295"
            color="text-success"
            differencecount="(+88)"
          />
        </Col>

        {/* row - 4 */}
        <Col md={12} xl={4}>
          <VisitorGrowthTrackerCard
            title="TOTAL VISITORS"
            value={235}
            description="20% More than last Month"
            avatar1={Avatar1}
            avatar2={Avatar2}
            bgClass="bg-brand-color-1"
          />
        </Col>
        <Col md={6} xl={4}>
          <ImpressionMetricsCard icon="ph ph-map-pin-line " color="text-primary" value={235} label="Impression" />
        </Col>
        <Col md={6} xl={4}>
          <PendingUsersGrowthCard
            value={598}
            title="Pending Users"
            label="Last Month"
            icon="ti ti-caret-up-filled text-white f-26"
            perecent="56.68"
            bgcolor="bg-brand-color-1"
          />
        </Col>

        {/* row - 5 */}
        <Col md={12} xl={4}>
          <OrderSummaryCard
            icon="ph ph-shopping-cart"
            title="Last week’s orders"
            description="New Order"
            value={589}
            badgevalue={1434}
            color="bg-brand-color-1"
          />
        </Col>
        <Col md={6} xl={4}>
          <SavingAccountSummaryCard />
        </Col>
        <Col md={6} xl={4}>
          <ProfitSummaryCard
            title="Total Profit"
            value="1,783"
            icon="ti ti-pig-money"
            badgevalue="+11%"
            color="bg-brand-color-1"
            description="From Previous Month"
          />
        </Col>

        {/* row - 6 */}
        <Col md={12} xl={4}>
          <BusinessGrowthCard
            title="Total Growth"
            icon="ph ph-chart-line-up  f-30 text-white m-b-12"
            iconsize="f-30"
            className="text-white m-t-20 m-b-15"
            bgcolor="bg-brand-color-2"
            value="2,80,500"
            description="80% More than last Month"
          />
        </Col>
        <Col md={6} xl={4}>
          <CountdownTimerCard />
        </Col>
        <Col md={6} xl={4}>
          <BusinessGrowthCard
            title="Total Assets"
            icon="ti ti-blocks"
            iconsize="f-50"
            className="text-white m-t-20 m-b-15"
            bgcolor="bg-brand-color-1"
            value="3,85,600"
            description="60% More than last Month"
          />
        </Col>

        {/* row - 7 */}
        {tasksCardData.map((task, index) => (
          <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
            <TasksCard title={task.title} value={task.value} label={task.label} color={task.color} percentage={task.percentage} />
          </Col>
        ))}

        {/* row - 8 */}
        {userStatsCardData.map((item, index) => (
          <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
            <UserStatsCard {...item} />
          </Col>
        ))}

        {/* row - 9 */}
        <Col md={12} xl={4}>
          <RatingOverviewCard icon1="ti ti-star-filled" value1={4.3} icon2="ti ti-caret-up-filled" value2={0.4} color="text-success" />
        </Col>
        <Col md={6} xl={4}>
          <BillingSummaryCard />
        </Col>
        <Col md={6} xl={4}>
          <MonthlyGrowthCard />
        </Col>

        {/* row - 10 */}
        <Col md={12} xl={4}>
          <TotalLeads1 />
        </Col>
        <Col md={6} xl={4}>
          <ActiveVisitorCard />
        </Col>
        <Col md={6} xl={4}>
          <TotalLeads2 />
        </Col>

        {/* row - 11 */}
        <Col md={12} xl={4}>
          <PortfolioSummaryCard />
        </Col>
        <Col md={6} xl={4}>
          <ProfitCard />
        </Col>
        <Col md={6} xl={4}>
          <BrowserStatisticsCard />
        </Col>

        {/* row - 12 */}
        <Col md={12} xl={4}>
          <MonthlyRevenueSummaryCard />
        </Col>
        <Col md={6} xl={4}>
          <MonthlyInvoiceCard
            icon="ti ti-file-description-filled "
            badgelabel="monthly"
            title="Invoices"
            value={450}
            progress={{ now: 50 }}
          />
        </Col>
        <Col md={6} xl={4}>
          <SalesInsightCard />
        </Col>

        {/* row - 13 */}
        {analyticsSummaryCardData.map((item, index) => (
          <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
            <AnalyticsSummaryCard {...item} />
          </Col>
        ))}

        {/* row - 14 */}
        {achievementStatCardData.map((item, index) => (
          <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
            <AchievementStatCard {...item} />
          </Col>
        ))}

        {/* row - 15 */}
        <Col md={12} xl={4}>
          <SupportMetricCard />
        </Col>
        <Col md={6} xl={4}>
          <ProgressStatCard title={7210} label="Visitors" progress={{ now: 72, label: '72%' }} className="bg-brand-color-2" />
        </Col>
        <Col md={6} xl={4}>
          <CustomerMetricCard />
        </Col>

        {/* row - 16 */}
        {socialStatsData.map((item, index) => (
          <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
            <SocialStatsCard {...item} />
          </Col>
        ))}

        {/* row - 17 */}
        {orderStatusData.map((item, index) => (
          <Col md={index === 2 ? 12 : 6} xl={4} key={index}>
            <OrderStatusCard {...item} />
          </Col>
        ))}

        {/* row - 18 */}
        <Col md={6} xl={4}>
          <MetricOverviewCard
            title="Affiliate"
            value="3,789"
            icon1="ti ti-pig-money"
            icon2="ti ti-caret-up-filled "
            description="From First week 13.5%"
            label="4+"
          />
        </Col>
        <Col md={6} xl={4}>
          <TeamMemberCard />
        </Col>
        <Col md={12} xl={4}>
          <MetricOverviewCard
            title="Offers"
            value="2,586"
            icon1="ti ti-basket-dollar"
            icon2="ti ti-caret-up-filled "
            description="From Last week 15.5%"
            label="10+"
          />
        </Col>

        {/* row - 19 */}
        <Col md={6} xl={4}>
          <WeeklyEarningCard {...weeklyEarningCardData} />
        </Col>
        <Col md={6} xl={4}>
          <PortfolioCard />
        </Col>
        <Col md={12} xl={4}>
          <WeeklyEarningCard {...weeklyPageViewData} />
        </Col>

        {/* row - 20 */}
        {executiveOverviewChartData.map((chart, index) => (
          <Col key={index} md={index === 2 ? 12 : 6} xxl={4}>
            <ExecutiveOverviewChart {...chart} />
          </Col>
        ))}

        {/* row - 21 */}
        <Col md={6} xl={4}>
          <ProjectTaskCard />
        </Col>
        <Col md={6} xl={4}>
          <SalesStatisticsCard />
        </Col>
        <Col md={12} xl={4}>
          <UpcomingEventCard
            title="Upcoming Event"
            percent="34%"
            value={45}
            label="Competitors"
            icon="ti ti-calendar-check"
            description="You can participate in event"
          />
        </Col>

        {/* row - 22 */}
        {bitCoinCardData.map((card, index) => (
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

        {/* row - 23 */}
        <Col md={6} xl={4}>
          <ProductSummaryCard />
        </Col>
        <Col md={6} xl={4}>
          <StatisticalCard />
        </Col>
        <Col md={12} xl={4}>
          <MarketsCard />
        </Col>

        {/* row - 24 */}
        {metricSummaryCardData.map((item, index) => (
          <Col key={index} md={index === 2 ? 12 : 6} xxl={4}>
            <MetricSummaryCard {...item} />
          </Col>
        ))}

        {/* row - 25 */}
        {saleProductCardData.map((item, index) => (
          <Col key={index} md={index === 2 ? 12 : 6} xxl={4}>
            <SaleProductCard {...item} />
          </Col>
        ))}

        {/* row - 26 */}
        {activityOverviewChartData.map((item, index) => (
          <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
            <ActivityOverviewChart data={item} />
          </Col>
        ))}
      </Row>
    </AppLayout>
  );
}
