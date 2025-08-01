// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  series: [85],

  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 360,
      hollow: {
        margin: 0,
        size: '70%',
        background: '#fff',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front'
      },
      track: {
        background: '#fff',
        strokeWidth: '67%',
        margin: 0
      },

      dataLabels: {
        show: true,
        name: {
          show: false
        },
        value: {
          formatter: function (val: string) {
            return parseInt(val);
          },
          color: '#111',
          fontSize: '36px',
          show: true
        }
      }
    }
  },
  colors: ['#1dc4e9'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#1de9b6'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  }
};

// =============================|| WIDGET - SALES PERFORMANCE CHART ||============================== //

export default function SalesPerformanceChart() {
  return (
    <MainCard title="Sales">
      <ReactApexChart options={chartOptions} series={[85]} type="radialBar" height={200} />
      <Row className="text-center mt-3">
        <Col sm={12}>
          <h3 className="f-w-300">84</h3>
          <span className="text-uppercase">12 Today</span>
        </Col>
      </Row>
    </MainCard>
  );
}
