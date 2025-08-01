// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    type: 'bar',
    height: 210,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '70%',
      borderRadius: 2
    }
  },
  fill: {
    opacity: [1, 0.4]
  },
  stroke: {
    show: true,
    width: 3,
    colors: ['transparent']
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 10,
      height: 10,
      radius: '50%',
      offsexX: 2,
      offsexY: 2
    },
    itemMargin: {
      horizontal: 15,
      vertical: 5
    }
  },
  colors: ['#04a9f5', '#04a9f566'],
  series: [
    {
      name: 'Income',
      data: [180, 90, 135, 114, 120, 145, 180, 90, 135, 114, 120, 145]
    },
    {
      name: 'Expends',
      data: [120, 45, 78, 150, 168, 99, 120, 45, 78, 150, 168, 99]
    }
  ],
  grid: {
    borderColor: '#00000010'
  },
  yaxis: {
    show: false
  }
};

// ==============================|| FINANCE - CASHFLOW CHART ||============================== //

export default function CashflowChart() {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <div>
          <h5 className="mb-1">Cashflow</h5>
          <p>
            5.44% <Badge bg="success">5.44%</Badge>
          </p>
        </div>

        <Form.Select className="rounded-3 form-select-sm w-auto cursor-pointer" defaultValue="Monthly">
          <option>Today</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </Form.Select>
      </Stack>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={255} />
    </MainCard>
  );
}
