import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import SalesPerformanceCard from '@/components/cards/SalesPerformanceCard';
import SocialStatsCard from '@/components/cards/SocialStatsCard';
import StatIndicatorCard from '@/components/cards/StatIndicatorCard';
import { UsersMap, EarningChart, RatingCard, RecentUsersCard } from '@/sections/dashboard/default';

// ===============================|| SALES PERFORMANCE CARD - DATA ||============================== //

const salesPerformanceData = [
  { title: 'Daily Sales', icon: 'ph ph-arrow-up text-success', amount: '$ 249.95', progress: { now: 67, className: 'bg-brand-color-1' } },
  {
    title: 'Monthly Sales',
    icon: 'ph ph-arrow-down text-danger',
    amount: '$ 2,942.32',
    progress: { now: 36, className: 'bg-brand-color-2' }
  },
  { title: 'Yearly Sales', icon: 'ph ph-arrow-up text-success', amount: '$ 8,638.32', progress: { now: 80, className: 'bg-brand-color-1' } }
];

// ===============================|| STAT INDICATOR CARD - DATA ||============================== //

const statIndicatorData = [
  { icon: 'ph ph-lightbulb-filament', value: '235', label: 'TOTAL IDEAS', iconColor: 'text-success' },
  { icon: 'ph ph-map-pin-line', value: '26', label: 'TOTAL LOCATION', iconColor: 'text-primary' }
];

// ===============================|| SOCIAL STATS CARD - DATA ||============================== //

const socialStatsData = [
  {
    icon: 'ti ti-brand-facebook-filled text-primary',
    count: '12,281',
    percentage: '+7.2%',
    color: 'text-success',
    stats: [
      {
        label: 'Target',
        value: '35,098',
        progress: {
          now: 60,
          className: 'bg-brand-color-1'
        }
      },
      {
        label: 'Duration',
        value: '3,539',
        progress: {
          now: 45,
          className: 'bg-brand-color-2'
        }
      }
    ]
  },
  {
    icon: 'ti ti-brand-twitter-filled text-info',
    count: '11,200',
    percentage: '+6.2%',
    color: 'text-primary',
    stats: [
      {
        label: 'Target',
        value: '34,185',
        progress: {
          now: 40,
          className: 'bg-success'
        }
      },
      {
        label: 'Duration',
        value: '4,567',
        progress: {
          now: 70
        }
      }
    ]
  },
  {
    icon: 'ti ti-brand-google-filled text-danger',
    count: '10,500',
    percentage: '+5.9%',
    color: 'text-primary',
    stats: [
      {
        label: 'Target',
        value: '25,998',
        progress: {
          now: 80,
          className: 'bg-brand-color-1'
        }
      },
      {
        label: 'Duration',
        value: '7,753',
        progress: {
          now: 50,
          className: 'bg-brand-color-2'
        }
      }
    ]
  }
];

// ================================|| DASHBOARD - DEFAULT ||============================== //

export default function DefaultPage() {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      <Row>
        {/* row - 1 */}
        {salesPerformanceData.map((item, index) => (
          <Col key={index} md={index === 2 ? 12 : 6} xl={4}>
            <SalesPerformanceCard {...item} />
          </Col>
        ))}

        {/* row - 2 */}
        <Col md={6} xl={8}>
          <UsersMap />
        </Col>
        <Col md={6} xl={4}>
          <>
            <EarningChart />
            <StatIndicatorCard data={statIndicatorData} />
          </>
        </Col>

        {/* row - 3 */}
        {socialStatsData.map((item, index) => (
          <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
            <SocialStatsCard {...item} />
          </Col>
        ))}

        {/* row - 4 */}
        <Col md={6} xl={4}>
          <RatingCard />
        </Col>
        <Col md={6} xl={8}>
          <RecentUsersCard />
        </Col>
      </Row>
    </AppLayout>
  );
}
