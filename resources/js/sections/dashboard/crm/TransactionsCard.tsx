// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#1dc4e9'],
  plotOptions: {
    bar: {
      columnWidth: '40%'
    }
  },
  series: [
    {
      data: [48, 30, 25, 30, 20, 40, 30]
    }
  ],
  xaxis: {
    crosshairs: {
      width: 1
    }
  },
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
          return 'Amount Spent:';
        }
      }
    },
    marker: {
      show: false
    }
  }
};

// =============================|| CRM - TRANSACTIONS CARD ||============================== //

export default function TransactionsCard() {
  return (
    <MainCard title="Transactions" subheader={<p className="mb-0 mt-0">Jun 23 - Jul 23</p>}>
      <Row className="align-items-center justify-content-center">
        <Col xs={6}>
          <h3 className="f-w-300 mb-0 float-left">$59,48</h3>
        </Col>
        <Col xs={6}>
          <Stack className="justify-content-center align-items-center">
            <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={80} width={80} />
          </Stack>
        </Col>
      </Row>
    </MainCard>
  );
}
