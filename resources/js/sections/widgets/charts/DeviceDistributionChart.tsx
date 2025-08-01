// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  series: [23, 35, 28],

  options: {
    chart: {
      type: 'pie'
    },
    dataLabels: {
      enabled: false
    },

    colors: ['#1DE9B6', '#A389D4', '#04A9F5'],
    labels: ['Desktop', 'Mobile', 'Tablet'],
    legend: {
      show: false
    }
  }
};

// =============================|| WIDGET - DEVICES DISTRIBUTION CHART ||============================== //

export default function DeviceDistributionChart() {
  return (
    <MainCard title="Devices">
      <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="pie" height={165} />

      <Row>
        <Col sm={12} className="pt-3 pb-3 border-top">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-success" />
            <span>Desktop</span>
          </span>
          <span className="float-end">41.6 %</span>
        </Col>

        <Col sm={12} className="pt-3 pb-3 border-top">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-primary" />
            <span>Mobile</span>
          </span>
          <span className="float-end">32.5%</span>
        </Col>

        <Col sm={12} className="pt-3 border-top">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-primary" />
            <span>Tablet</span>
          </span>
          <span className="float-end">25.9%</span>
        </Col>
      </Row>
    </MainCard>
  );
}
