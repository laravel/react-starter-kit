// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  series: [
    { name: 'Market Days ', data: [5, 30, 25, 55, 45, 65, 60, 105, 80, 110, 120, 150], color: '#00E396' },
    { name: 'Market Days ALL ', data: [80, 95, 87, 155, 140, 147, 130, 180, 160, 175, 165, 200], color: '#008FFB' }
  ],

  options: {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true,
        type: 'x'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 5,
      hover: {
        size: 7
      }
    },
    stroke: {
      curve: 'straight',
      width: 2
    },

    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }
};

// =============================|| CRYPTO - STATISTICS LINE CHART ||============================== //

export default function StatisticsLineChart() {
  return (
    <>
      <MainCard title="Statistics">
        <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="line" height={320} />
      </MainCard>
    </>
  );
}
