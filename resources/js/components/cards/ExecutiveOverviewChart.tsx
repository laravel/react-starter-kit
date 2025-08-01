// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

const chartOptions: ChartProps = {
  chart: {
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    }
  },
  yaxis: {
    show: false
  },
  xaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  }
};

interface ExecutiveOverviewChartProps {
  title: string;
  value: number | string;
  currency: string;
  salesType: string;
  chartColor?: string;
  series: { data: number[] }[];
  icon: string;
}

// ==============================|| EXECUTIVE OVERVIEW CHART ||============================== //

function ExecutiveOverviewChart({ title, value, currency, salesType, chartColor = '', series = [], icon }: ExecutiveOverviewChartProps) {
  const chartOption = { ...chartOptions, colors: [chartColor] };

  return (
    <MainCard bodyClassName="sale-view">
      <Stack direction="horizontal" className="align-items-end gap-1">
        <h3 className="f-w-300">{value}</h3>
        <h6 className="text-muted m-b-10">{currency}</h6>
      </Stack>
      <h5>{title}</h5>
      <span className="text-muted">{salesType}</span>

      <Row className="align-items-center justify-between-center">
        <Col>
          <ReactApexChart options={chartOption} series={series} type="bar" width={100} height={80} />
        </Col>

        <Col xs="auto" className="text-end">
          <i className={`${icon} f-30 text-white bg-brand-color-1`} />
        </Col>
      </Row>
    </MainCard>
  );
}

export default ExecutiveOverviewChart;
