import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%'
      }
    }
  },
  colors: ['#04a9f5'],
  labels: ['Cricket']
};

// ==============================|| APEX CHART - RADIAL BAR CHART ||============================== //

export default function RedialBarChart() {
  const series = useMemo(() => [70], []);

  return <ReactApexChart options={chartOptions} series={series} type="radialBar" height={350} />;
}
