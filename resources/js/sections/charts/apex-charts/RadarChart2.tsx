import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },
  colors: ['#04a9f5', '#1de9b6', '#f44236'],
  stroke: {
    width: 0
  },
  fill: {
    opacity: 0.7
  },
  markers: {
    size: 0
  },
  labels: ['2011', '2012', '2013', '2014', '2015', '2016']
};

// ==============================|| APEX CHART - MULTIPAL SERIES RADAR CHART ||============================== //

export default function RadarChart2() {
  const series = useMemo(
    () => [
      {
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20]
      },
      {
        name: 'Series 2',
        data: [20, 30, 40, 80, 20, 80]
      },
      {
        name: 'Series 3',
        data: [44, 76, 78, 13, 43, 10]
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="radar" height={350} />;
}
