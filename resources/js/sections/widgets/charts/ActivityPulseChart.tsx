// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-import
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    type: 'area',
    height: 170,
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#fff'],
  fill: {
    type: 'gradient'
  },
  markers: {
    size: 0,
    opacity: 0.9,
    color: '#ffffff',
    strokeColor: '#a389d4',
    strokeWidth: 2,
    hover: {
      size: 7
    }
  },
  stroke: {
    width: 5,
    color: '#ffffff'
  },
  series: [
    {
      name: 'series1',
      data: [20, 25, 33, 28, 25, 35, 28]
    }
  ],
  tooltip: {
    fixed: {
      enabled: false
    },
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return 'Visit :';
        }
      }
    },
    marker: {
      show: false
    }
  }
};

// =============================|| WIDGET - ACTIVITY PULSE CHART ||============================== //

export default function ActivityPulseChart() {
  return (
    <MainCard
      headerClassName="border-bottom-0"
      className="bg-brand-color-2"
      bodyClassName="p-0"
      title={<p className="text-white mb-0">Status</p>}
    >
      <Row className="p-4">
        <Col md={4} xs={6} className=" text-center m-b-10">
          <h3 className="text-white f-w-300">932</h3>
          <span className="d-block text-white">This Month</span>
        </Col>
        <Col md={4} xs={6} className="text-center m-b-10">
          <h3 className="text-white f-w-300">85</h3>
          <span className="d-block text-white">This Week</span>
        </Col>
        <Col md={4} xs={6} className="text-center m-b-10">
          <h3 className="text-white f-w-300">26</h3>
          <span className="d-block text-white">Today</span>
        </Col>
      </Row>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="area" height={200} />
    </MainCard>
  );
}
