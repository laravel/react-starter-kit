import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  plotOptions: {
    radar: {
      size: 140,
      polygons: {
        strokeColor: '#f3f6ff',
        fill: {
          colors: ['#f3f6ff', '#fff']
        }
      }
    }
  },
  colors: ['#f44236'],
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColor: '#f44236',
    strokeWidth: 2
  },
  tooltip: {
    y: {
      formatter: function (val: number | string) {
        return val;
      }
    }
  },
  yaxis: {
    tickAmount: 7,
    labels: {
      formatter: function (val: number | string, i: number) {
        if (i % 2 === 0) {
          return val;
        } else {
          return '';
        }
      }
    }
  }
};

// ==============================|| APEX CHART - RADAR CHART ||============================== //

export default function RadarChart() {
  const series = useMemo(
    () => [
      {
        name: 'Series 1',
        data: [20, 100, 40, 30, 50, 80, 33]
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="radar" height={350} />;
}
