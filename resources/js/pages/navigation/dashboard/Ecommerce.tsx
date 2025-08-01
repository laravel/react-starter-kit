import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import OrderStatusCard from '@/components/cards/OrderStatusCard';
import SaleProductCard from '@/components/cards/SaleProductCard';
import WeeklyEarningCard from '@/components/cards/WeeklyEarningCard';
import { ProductOrderList, YearlyEarningChart, YearlySummaryChart } from '@/sections/dashboard/e-commerce';

// assets
import Sale from '@assets/images/widget/shape5.png';

// ===============================|| ORDER STATUS CARD - DATA ||============================== //

const orderStatusData = [
  {
    title: 'Online Orders',
    label: 'Delivery Orders',
    archive: 237,
    target: 400,
    progress: { now: 59.25, className: 'bg-brand-color-1' },
    status: 'Done'
  },
  {
    title: 'Pending Orders',
    label: 'Pending Orders',
    archive: 200,
    target: 500,
    progress: { now: 40, className: 'bg-brand-color-2' },
    status: 'Pending'
  },
  { title: 'Return Orders', label: 'Return Orders', archive: 40, target: 250, progress: { now: 16 }, status: 'Return' }
];

// =============================|| E-COMMERCE - WEEKLY EARNING CARD DATA ||============================== //

const weeklyEarningCardData = {
  title: 'Earnings',
  icon: 'ph ph-arrow-up',
  subtitle: 'TOTAL EARNINGS',
  defaultDay: 'mon',
  data: {
    mon: '359,234',
    tue: '245,987',
    wed: '312,456',
    thu: '400,120',
    fri: '450,234',
    sat: '380,987',
    sun: '270,345'
  }
};

// =============================|| E-COMMERCE - SALE PRODUCT CARD DATA ||============================== //

const saleProductCardData = { image: Sale, value: 375, label: 'Sale Product', color: 'bg-brand-color-2' };

// ==============================|| DASHBOARD - ECOMMERCE ||============================== //

export default function EcommercePage() {
  return (
    <AppLayout>
      <Head title="Ecommerce" />
      <Row>
        {/* row - 1 */}
        {orderStatusData.map((item, index) => (
          <Col md={index === 2 ? 12 : 6} xl={4} key={index}>
            <OrderStatusCard {...item} />
          </Col>
        ))}
        {/* row - 2 */}

        <Col md={12} xl={8}>
          <YearlySummaryChart />
        </Col>
        <Col md={6} xl={4}>
          <WeeklyEarningCard {...weeklyEarningCardData} />
          <SaleProductCard {...saleProductCardData} />
        </Col>

        {/* row - 3 */}
        <Col md={6} xl={8}>
          <ProductOrderList />
        </Col>
        <Col md={12} xl={4}>
          <YearlyEarningChart />
        </Col>
      </Row>
    </AppLayout>
  );
}
