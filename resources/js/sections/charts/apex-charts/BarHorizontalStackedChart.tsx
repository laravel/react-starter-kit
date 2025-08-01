import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    stacked: true,
    stackType: '100%'
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  colors: ['#04a9f5', '#13c2c2', '#1de9b6', '#f4c22b', '#f44236'],
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014]
  },

  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + 'K';
      }
    }
  },
  fill: {
    opacity: 1
  },

  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40
  }
};

// ==============================|| APEX CHART - BAR HORIZONTAL STACKED  CHART ||============================== //

export default function BarHorizontalStackedChart() {
  const series = useMemo(
    () => [
      {
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
      },
      {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
      },
      {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
      },
      {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4]
      },
      {
        name: 'Reborn Kid',
        data: [25, 12, 19, 32, 25, 24, 10]
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />;
}
