import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';
import BarBasicChart from '@/sections/charts/chart-js/BasicBarChart';
import BarHorizontalChart from '@/sections/charts/chart-js/BarHorizontalChart';
import BarStackedChart from '@/sections/charts/chart-js/BarStackedChart';
import DoughnutChart from '@/sections/charts/chart-js/DoughnutChart';
import LineBasicChart from '@/sections/charts/chart-js/LineBasicChart';
import LineOriginChart from '@/sections/charts/chart-js/LineChart';
import LineFillEndChart from '@/sections/charts/chart-js/LineFillEndChart';
import LineInterpolationChart from '@/sections/charts/chart-js/LineInterpolationChart';
import PieChart from '@/sections/charts/chart-js/PieChart';
import RadarAreaChart1 from '@/sections/charts/chart-js/RadarAreaChart1';
import RadarAreaChart2 from '@/sections/charts/chart-js/RadarAreaChart2';
import RadarAreaChart3 from '@/sections/charts/chart-js/RadarAreaChart3';

// ==============================|| CHARTS - CHART JS ||============================== //

export default function ChartJsPage() {
  return (
    <AppLayout>
      <Head title="Chart js" />
      <Row>
        <Col lg={4} md={6}>
          <MainCard title="Bar">
            <BarBasicChart />
          </MainCard>
        </Col>
        <Col lg={4} md={6}>
          <MainCard title="Bar [Stacked] Chart">
            <BarStackedChart />
          </MainCard>
        </Col>
        <Col lg={4} md={12}>
          <MainCard title="Bar [Horizontal] Chart">
            <BarHorizontalChart />
          </MainCard>
        </Col>
        <Col lg={12}>
          <MainCard title="Line [Interpolation] Chart">
            <LineInterpolationChart />
          </MainCard>
        </Col>
        <Col lg={6} md={6}>
          <MainCard title="Area [ Fill: 'origin' ] Chart">
            <LineOriginChart />
          </MainCard>
        </Col>
        <Col lg={6} md={6}>
          <MainCard title="Area [ Fill: 'end' ] Chart">
            <LineFillEndChart />
          </MainCard>
        </Col>
        <Col lg={12}>
          <MainCard title="Area Chart">
            <LineBasicChart />
          </MainCard>
        </Col>
        <Col lg={4} md={6}>
          <MainCard title="Radar [ Area ] Chart">
            <RadarAreaChart1 />
          </MainCard>
        </Col>
        <Col lg={4} md={6}>
          <MainCard title="Radar [ Area ] Chart">
            <RadarAreaChart2 />
          </MainCard>
        </Col>
        <Col lg={4} md={6}>
          <MainCard title="Radar [ Area ] Chart">
            <RadarAreaChart3 />
          </MainCard>
        </Col>
        <Col lg={4} md={6}>
          <MainCard title="Pie Chart">
            <PieChart />
          </MainCard>
        </Col>
        <Col lg={4} md={6}>
          <MainCard title="Doughnut Chart">
            <DoughnutChart />
          </MainCard>
        </Col>
      </Row>
    </AppLayout>
  );
}
