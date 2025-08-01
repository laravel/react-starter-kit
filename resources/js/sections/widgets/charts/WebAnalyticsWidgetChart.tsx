// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  series: [
    {
      name: 'Series 1',
      data: [15, 13, 11.1, 15]
    }
  ],
  chart: {
    toolbar: {
      show: false
    }
  },
  stroke: {
    width: 2
  },
  colors: ['#1de9b6'],
  fill: {
    opacity: 1,
    type: 'gradient',
    gradient: {
      shade: 'light',
      gradientToColors: ['#1dc4e9'],
      shadeIntensity: 0.5,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  markers: {
    size: 0
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: ['Sales', 'Visits', 'Views', 'Clicks']
  }
};

// =============================|| WIDGET - WEB ANALYTICS WIDGET CHART ||============================== //

export default function WebAnalyticsWidgetChart() {
  return (
    <MainCard title="Web Statistics" subheader={<p className="mb-0">Last 6 Months</p>}>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="radar" height={250} />

      <Row>
        <Col sm={12} className="pt-3 pb-3 mt-3 border-top">
          <span className="me-3">Sales</span> <span className="float-end">563 / 735</span>
        </Col>
        <Col sm={12} className=" pt-3 pb-3 border-top">
          <span className="me-3">Clicks</span> <span className="float-end">76898 / 95442</span>
        </Col>
        <Col sm={12} className=" pt-3 pb-3 border-top">
          <span className="me-3">Views</span> <span className="float-end">3682 / 4235</span>
        </Col>
        <Col sm={12} className=" pt-3 border-top">
          <span className="me-3">Visits</span> <span className="float-end">2348 / 3749</span>
        </Col>
      </Row>
    </MainCard>
  );
}
