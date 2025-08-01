// react-bootstrap
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    type: 'line',
    height: 150,
    toolbar: {
      show: false
    }
  },
  colors: ['#1de9b6', '#1de9b6'],
  dataLabels: {
    enabled: false
  },
  legend: {
    show: true,
    position: 'top'
  },
  markers: {
    size: 1,
    colors: ['#fff', '#fff'],
    strokeColors: ['#1de9b6', '#1de9b6'],
    strokeWidth: 1,
    shape: 'circle',
    hover: {
      size: 4
    }
  },
  fill: {
    opacity: [1, 0.3]
  },
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  grid: {
    show: false
  },
  series: [
    {
      name: 'Active',
      data: [20, 90, 65, 85, 20, 80, 30]
    },
    {
      name: 'Inactive',
      data: [70, 30, 40, 15, 60, 40, 95]
    }
  ],
  xaxis: {
    labels: {
      hideOverlappingLabels: true
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  }
};

// =============================|| DASHBOARD - ACTIVITY ||============================== //

export default function Activity() {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <h5 className="mb-0">Activity</h5>
        <Form.Select size="sm" className="rounded-3 w-auto" defaultValue="Monthly">
          <option value="Today">Today</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </Form.Select>
      </Stack>

      <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={150} />
    </MainCard>
  );
}
