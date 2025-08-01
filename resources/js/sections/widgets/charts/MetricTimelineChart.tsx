// react-bootstrap
import Button from 'react-bootstrap/Button';

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

// =============================|| WIDGET -  METRIC TIMELINE CHART ||============================== //

export default function MetricTimelineChart() {
  return (
    <MainCard
      headerClassName="border-bottom-0"
      title={<p className="mb-0 text-white">Statistics</p>}
      className="bg-brand-color-1 gradientcolor overflow-hidden"
      bodyClassName="pb-0"
    >
      <div className="p-2 text-center">
        <a className="text-white text-uppercase f-w-400">Month</a>
        <Button className="rounded-pill text-muted bg-white text-uppercase mx-3 px-4 f-w-400">Week</Button>
        <a className="text-white text-uppercase f-w-400">Day</a>
        <div className="my-3 text-center text-white">
          <a className="text-white d-block mb-1">
            $ 78.89 <i className="ph ph-arrow-up" />
          </a>
          <span>Week2 +15.44</span>
        </div>
      </div>
      <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="line" height={210} />
    </MainCard>
  );
}
