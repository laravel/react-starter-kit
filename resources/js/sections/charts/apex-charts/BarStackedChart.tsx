import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    stacked: true,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: true
    }
  },
  colors: ['#04a9f5', '#1de9b6', '#f4c22b', '#13c2c2'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }
  ],
  plotOptions: {
    bar: {
      horizontal: false
    }
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2011-01-01T00:00:00Z',
      '2011-01-02T00:00:00Z',
      '2011-01-03T00:00:00Z',
      '2011-01-04T00:00:00Z',
      '2011-01-05T00:00:00Z',
      '2011-01-06T00:00:00Z'
    ]
  },
  legend: {
    position: 'bottom'
  },
  fill: {
    opacity: 1
  }
};

// ==============================|| APEX CHART - BAR STACKED CHART ||============================== //

export default function BarStackedChart() {
  const series = useMemo(
    () => [
      {
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      },
      {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
      },
      {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
      },
      {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />;
}
