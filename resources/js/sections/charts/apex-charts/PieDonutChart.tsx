import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// chart-options
const chartOptions: ChartProps = {
  series: [44, 55, 41, 17, 15],
  colors: ['#04a9f5', '#1de9b6', '#13c2c2', '#f4c22b', '#f44236'],
  legend: {
    show: true,
    position: 'bottom'
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true
          },
          value: {
            show: true
          }
        }
      }
    }
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

// ==============================|| APEX CHART - PIE DONUT CHART ||============================== //

export default function PieDonutChart() {
  const series = useMemo(() => [44, 55, 41, 17, 15], []);

  return <ReactApexChart options={chartOptions} series={series} type="donut" height={320} />;
}
