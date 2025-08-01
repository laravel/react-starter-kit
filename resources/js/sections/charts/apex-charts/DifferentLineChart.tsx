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
    enabled: false
  },
  stroke: {
    width: [5, 7, 5],
    curve: 'straight',
    dashArray: [0, 8, 5]
  },
  colors: ['#1de9b6', '#f4c22b', '#f44236'],

  markers: {
    size: 0,

    hover: {
      sizeOffset: 6
    }
  },
  xaxis: {
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan']
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val: number | string) {
            return val + ' (mins)';
          }
        }
      },
      {
        title: {
          formatter: function (val: number | string) {
            return val + ' per session';
          }
        }
      },
      {
        title: {
          formatter: function (val: number | string) {
            return val;
          }
        }
      }
    ]
  },
  grid: {
    borderColor: '#f1f1f1'
  }
};

// ==============================|| APEX CHART - DIFFERENT LINE CHART ||============================== //

export default function DifferentLineChart() {
  const series = useMemo(
    () => [
      {
        name: 'Session Duration',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      },
      {
        name: 'Page Views',
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
      },
      {
        name: 'Total Visits',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="line" height={300} />;
}
