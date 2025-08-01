// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    height: 100,
    type: 'line',
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  series: [
    {
      name: 'Car',
      data: [85, 65, 140, 110, 180]
    }
  ],
  colors: ['#04a9f5'],
  fill: {
    type: 'solid'
  },
  xaxis: {
    tickPlacement: 'between'
  },
  markers: {
    size: 0,
    colors: '#fff',
    strokeColors: ['#04a9f5'],
    opacity: 0.9,
    strokeWidth: 2,
    hover: {
      size: 4
    }
  }
};

// =============================|| WIDGET - PROFILE GROWTH WIDGET CHART ||============================== //

export default function ProfileGrowthWidgetChart() {
  return (
    <MainCard>
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <i className="ph ph-chart-line-up f-30" />
        </Col>
        <Col className="text-center">
          <Image src={Avatar1} />
        </Col>

        <Col xs="auto">
          <i className="ph ph-envelope-simple  f-30" />
        </Col>
      </Row>

      <h5 className="m-t-30 text-center">Alma Christensen</h5>
      <span className="text-center d-block">UX Designer</span>

      <Row className="m-t-40">
        <Col xs={6}>
          <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={120} />
        </Col>

        <Col xs={6}>
          <h3 className="f-w-300">
            <i className="ti ti-caret-up-filled text-success f-22 m-r-10 m-l-10" />
            13 %
          </h3>
        </Col>
      </Row>
    </MainCard>
  );
}
