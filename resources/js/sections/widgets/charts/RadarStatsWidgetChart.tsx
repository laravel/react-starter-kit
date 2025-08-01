// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  series: [
    {
      name: 'Series 1',
      data: [100, 60, 100, 100, 100, 80]
    },
    {
      name: 'Series 2',
      data: [80, 90, 80, 110, 40, 115]
    }
  ],
  chart: {
    toolbar: {
      show: false
    }
  },
  stroke: {
    width: 2
  },
  colors: ['#a389d4', '#1de9b6'],
  fill: {
    opacity: 1,
    type: 'gradient',
    gradient: {
      shade: 'light',
      gradientToColors: ['#899ed4', '#1dc4e9'],
      shadeIntensity: 0.5,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  markers: {
    size: 0
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  }
};

// =============================|| WIDGET - RADAR STATS WIDGET CHART ||============================== //

export default function RadarStatsWidgetChart() {
  return (
    <MainCard title="Statistics" subheader={<p className="mb-0">Last 6 Months</p>}>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="radar" height={230} />
    </MainCard>
  );
}
