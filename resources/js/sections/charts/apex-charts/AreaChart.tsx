import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#f4c22b', '#f44236'],
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00',
      '2018-09-19T01:30:00',
      '2018-09-19T02:30:00',
      '2018-09-19T03:30:00',
      '2018-09-19T04:30:00',
      '2018-09-19T05:30:00',
      '2018-09-19T06:30:00'
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  }
};

// ==============================|| APEX CHART - AREA CHART ||============================== //

export default function AreaChart() {
  const series = useMemo(
    () => [
      {
        name: 'Series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Series2',
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="area" height={350} />;
}
