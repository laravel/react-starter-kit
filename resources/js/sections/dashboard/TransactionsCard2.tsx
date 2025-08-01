// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions1: ChartProps = {
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
      data: [44, 26, 22, 35, 28, 35, 28]
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
          return 'Amount Spent :';
        }
      }
    },
    marker: {
      show: false
    }
  }
};

const chartOptions2: ChartProps = {
  chart: {
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#a389d4'],
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
          return 'Amount Spent :';
        }
      }
    },
    marker: {
      show: false
    }
  }
};

// =============================|| ANALYTICS - TRANSACTIONS CARD 2 ||============================== //

export default function TransactionsCard2() {
  return (
    <MainCard title="Transactions" subheader={<p className="mb-0">June - July</p>}>
      <Row>
        <Col xs={6}>
          <Stack className="justify-content-center align-items-center">
            <ReactApexChart options={chartOptions2} series={chartOptions2.series} type="bar" width={80} height={45} />
          </Stack>
          <h3 className="f-w-300 pt-3 mb-0 text-center">$80,48</h3>
        </Col>

        <Col xs={6}>
          <Stack className="justify-content-center align-items-center">
            <ReactApexChart options={chartOptions1} series={chartOptions1.series} type="bar" width={80} height={45} />
          </Stack>
          <h3 className="f-w-300 pt-3 mb-0 text-center">$40,27</h3>
        </Col>
      </Row>
    </MainCard>
  );
}
