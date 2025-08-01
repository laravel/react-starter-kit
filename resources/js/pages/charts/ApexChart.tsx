import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';
import AreaChart from '@/sections/charts/apex-charts/AreaChart';
import AreaChart2 from '@/sections/charts/apex-charts/AreaChart2';
import ApexBarChart from '@/sections/charts/apex-charts/BarChart';
import ApexBarHorizontalChart from '@/sections/charts/apex-charts/BarHorizontalChart';
import ApexBarHorizontalStackedChart from '@/sections/charts/apex-charts/BarHorizontalStackedChart';
import ApexBarStackedChart from '@/sections/charts/apex-charts/BarStackedChart';
import BasicLineChart from '@/sections/charts/apex-charts/BasicLineChart';
import Bubble3DChart from '@/sections/charts/apex-charts/Bubble3DChart';
import BubbleChart from '@/sections/charts/apex-charts/BubbleChart';
import CandleStickChart from '@/sections/charts/apex-charts/CandlestickChart';
import DifferentLineChart from '@/sections/charts/apex-charts/DifferentLineChart';
import HeatMapChart from '@/sections/charts/apex-charts/HeatmapChart';
import MixedChart from '@/sections/charts/apex-charts/MixedChart';
import MixedChart2 from '@/sections/charts/apex-charts/MixedChart2';
import PieChart from '@/sections/charts/apex-charts/PieChart';
import PieDonutChart from '@/sections/charts/apex-charts/PieDonutChart';
import RadarChart from '@/sections/charts/apex-charts/RadarChart';
import RadarChart2 from '@/sections/charts/apex-charts/RadarChart2';
import RedialBarChart from '@/sections/charts/apex-charts/RadialBarChart';
import RedialBarCustomAngleChart from '@/sections/charts/apex-charts/RadialBarCustomAngleCharts';
import RoundedHeatMapChart from '@/sections/charts/apex-charts/RoundedHeatmapChart';
import ScatterChart from '@/sections/charts/apex-charts/ScatterChart';
import ScatterDateTimeChart from '@/sections/charts/apex-charts/ScatterDateTimeChart';
import ReferenceHeader from '@/components/ReferenceHeader';

// =============================|| CHARTS - APEX CHART ||============================== //

export default function ApexChartPage() {
  return (
    <>
      <AppLayout>
        <Head title="Apex charts" />
        <ReferenceHeader
          caption="ApexCharts is a modern charting library that helps developers to create beautiful and interactive visualizations for web pages."
          link="https://apexcharts.com/"
        />
        <Row>
          <Col sm={6}>
            <MainCard title="Bar chart">
              <ApexBarChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Bar chart stacked">
              <ApexBarStackedChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Bar chart horizontal">
              <ApexBarHorizontalChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Bar chart horizontal stacked">
              <ApexBarHorizontalStackedChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Pie Charts">
              <PieChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Pie Charts donut">
              <PieDonutChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="RadialBar Charts">
              <RedialBarChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="RadialBar Charts Custom Angle">
              <RedialBarCustomAngleChart />
            </MainCard>
          </Col>
          <Col sm={12}>
            <MainCard title="Basic line chart">
              <BasicLineChart />
            </MainCard>
          </Col>
          <Col sm={12}>
            <MainCard title="Different line chart">
              <DifferentLineChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Area chart">
              <AreaChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Area chart">
              <AreaChart2 />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Mixed chart">
              <MixedChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Mixed chart">
              <MixedChart2 />
            </MainCard>
          </Col>
          <Col sm={12}>
            <MainCard title="Candlestick Chart">
              <CandleStickChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Bubble Chart">
              <BubbleChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Bubble Chart 3d">
              <Bubble3DChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Scatter Chart">
              <ScatterChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Scatter Chart Datetime">
              <ScatterDateTimeChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Heatmap Chart">
              <HeatMapChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Heatmap Charts Rounded">
              <RoundedHeatMapChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Radar Charts">
              <RadarChart />
            </MainCard>
          </Col>
          <Col sm={6}>
            <MainCard title="Radar Charts Multiple Series">
              <RadarChart2 />
            </MainCard>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
