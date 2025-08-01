import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  colors: ['#04a9f5', '#1de9b6', '#13c2c2', '#f4c22b', '#f44236'],
  legend: {
    show: true,
    position: 'bottom'
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
};

// ==============================|| APEX CHART - PIE CHART ||============================== //

export default function PieChart() {
  const series = useMemo(() => [44, 55, 13, 43, 22], []);

  return <ReactApexChart options={chartOptions} series={series} type="pie" height={320} />;
}
