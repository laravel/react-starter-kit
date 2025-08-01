// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    toolbar: {
      show: false
    }
  },
  series: [
    {
      name: 'Net Profit',
      data: [40, 70, 30, 60]
    },
    {
      name: 'Revenue',
      data: [20, 40, 20, 45]
    }
  ],
  colors: ['#1de9b6', '#a389d4', '#04a9f5'],
  fill: {
    type: 'gradient',
    opacity: 1,
    gradient: {
      shade: 'dark',
      type: 'vertical',
      gradientToColors: ['#1dc4e9', '#899ed4', '#049df5'],
      stops: [0, 100]
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Q1', 'Q2', 'Q3', 'Q4']
  },
  tooltip: {
    y: {
      formatter: function (val: string) {
        return '$ ' + val + ' thousands';
      }
    }
  }
};

// =============================|| E-COMMERCE - YEARLY SUMMARY CHART ||============================== //

export default function YearlySummaryChart({ height }: { height?: number }) {
  return (
    <MainCard title="Yearly Summary">
      <Row className="pb-3">
        <Col md={4} xs={6} className="m-b-15 text-center">
          <h3 className="f-w-300">$2356.4</h3>
          <span>Invoiced</span>
        </Col>

        <Col md={4} xs={6} className="m-b-15 text-center">
          <h3 className="f-w-300">$1935.6</h3>
          <span>Profit</span>
        </Col>

        <Col md={4} xs={6} className="m-b-15 text-center">
          <h3 className="f-w-300">$468.9</h3>
          <span>Expenses</span>
        </Col>
      </Row>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={height || 245} />
    </MainCard>
  );
}
