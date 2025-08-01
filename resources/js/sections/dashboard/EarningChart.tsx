// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  series: [{ name: 'Market Days ', data: [10, 60, 45, 72, 45, 86], color: '#fff' }],

  options: {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 6,
      hover: {
        size: 5
      }
    },
    stroke: {
      curve: 'straight',
      width: 6
    },

    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },

    tooltip: {
      x: {
        show: false
      },

      marker: {
        show: false
      }
    },

    yaxis: {
      labels: {
        show: false
      }
    },

    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        style: {
          colors: '#fff'
        }
      }
    }
  }
};

// =============================|| DEFAULT - EARNING CHART ||============================== //

export default function EarningChart() {
  return (
    <MainCard
      title={<p className="mb-0 text-white">Earnings</p>}
      headerClassName="border-0"
      className="bg-primary overflow-hidden"
      bodyClassName="py-0"
    >
      <div className="earning-text">
        <h3 className="mb-2 text-white f-w-300">
          $4295.36 <i className="ph ph-arrow-up" />
        </h3>
        <span className="text-uppercase text-white d-block">Total Earnings</span>
      </div>
      <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="line" height={210} />
    </MainCard>
  );
}
