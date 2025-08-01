import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top'
      }
    }
  },
  colors: ['#04a9f5', '#1de9b6'],
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  },
  xaxis: {
    categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007]
  }
};

// ==============================|| APEX CHART - BAR HORIZONTAL CHART ||============================== //

export default function BarHorizontalChart() {
  const series = useMemo(
    () => [
      {
        data: [44, 55, 41, 64, 22, 43, 21]
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32]
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />;
}
