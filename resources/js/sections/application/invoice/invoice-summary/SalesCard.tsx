// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const options: ChartProps = {
  chart: {
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%'
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#1de9b6', '#04a9f5', '#13c2c2'],
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return '$ ' + val + ' thousands';
      }
    }
  }
};

const series = [
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63]
  },
  {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91]
  },
  {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52]
  }
];

// ==============================|| SALES CARD - INVOICE SUMMARY ||============================== //

export default function SalesCard({ title }: { title: string }) {
  return (
    <MainCard title={title}>
      <ReactApexChart options={options} series={series} type="bar" height={205} />
    </MainCard>
  );
}
