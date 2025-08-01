// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| WIDGET - USER STATISTICS CHART ||============================== //

export default function UserStatisticsChart() {
  // chart-options
  const chartOptions: ChartProps = {
    chart: {
      toolbar: {
        show: false
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: 26,
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },

    markers: {
      size: 6,
      hover: {
        size: 5
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [
      {
        name: 'Car',
        data: [160, 140, 150, 95, 130, 55, 75, 65, 140, 120, 110, 180]
      },
      {
        name: 'Bike',
        data: [85, 95, 90, 125, 105, 120, 110, 140, 100, 95, 130, 80]
      }
    ],

    colors: ['#AC94D8', '#50E3D3']
  };
  return (
    <MainCard title="Statistics">
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={225} />
    </MainCard>
  );
}
