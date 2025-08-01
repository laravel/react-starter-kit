import { useMemo } from 'react';

// react-bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  plotOptions: {
    pie: {
      donut: {
        size: '85%'
      }
    }
  },
  legend: {
    show: false
  },

  dataLabels: {
    enabled: false
  },
  colors: ['#1DE9B6', '#A389D4', '#04A9F5', '#F4C22B'],
  labels: ['Page Views:', 'Page Clicks:', 'Page Likes:', 'Pages:']
};

// =============================|| WIDGET - ENGAGEMENT STATS CHART ||============================== //

export default function EngagementStatsChart() {
  const series = useMemo(() => [24.7, 36.3, 23.5, 15.5], []);

  return (
    <MainCard title="Statistics">
      <ReactApexChart options={chartOptions} series={series} type="donut" height={180} />

      <Row>
        <Col sm={12} className="pt-2 pb-2">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-success" />
            <span>page Views</span>
          </span>
          <span className="float-end text-muted">15.5 %</span>
        </Col>

        <Col sm={12} className="pt-2 pb-2">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-primary" />
            <span>page Clicks</span>
          </span>
          <span className="float-end text-muted">23.5 %</span>
        </Col>

        <Col sm={12} className=" pt-2">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-info" />
            <span>page Likes</span>
          </span>
          <span className="float-end text-muted">36.3 %</span>
        </Col>
      </Row>
    </MainCard>
  );
}
