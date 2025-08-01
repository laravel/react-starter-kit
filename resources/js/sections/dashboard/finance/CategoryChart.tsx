// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import DropDown from './DropDown';
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  dataLabels: {
    enabled: false
  },
  legend: {
    show: true,
    position: 'bottom'
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%'
      }
    }
  },
  labels: ['Saving', 'Spend', 'Income'],
  series: [25, 50, 25],
  colors: ['#212529', '#04a9f5', '#2ca87f']
};

// ==============================|| FINANCE - CATEGORY CHART ||============================== //

export default function CategoryChart() {
  return (
    <MainCard>
      <Stack direction="horizontal" className=" align-items-center justify-content-between mb-3">
        <h5 className="mb-0">Category</h5>
        <DropDown className="avatar-s" />
      </Stack>

      <ReactApexChart options={chartOptions} series={chartOptions.series} type="donut" height={295} />
    </MainCard>
  );
}
