import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false,
    width: 2
  },
  stroke: {
    curve: 'straight'
  },
  colors: ['#04a9f5'],
  grid: {
    row: {
      colors: ['#f3f6ff', 'transparent'],
      opacity: 0.5
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  }
};

// ==============================|| APEX CHART - BASIC LINE CHART ||============================== //

export default function BasicLineChart() {
  const series = useMemo(
    () => [
      {
        name: 'Desktops',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="line" height={300} />;
}
