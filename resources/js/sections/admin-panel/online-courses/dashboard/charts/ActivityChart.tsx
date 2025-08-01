import { useState, useEffect } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import { ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

type ChartData = {
  name: string;
  data: number[];
};

// chart options
const areaChartOptions = {
  chart: {
    type: 'line',
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  legend: { show: true, position: 'top', horizontalAlign: 'right' },
  markers: { size: 3, strokeWidth: 2, hover: { size: 6 } },
  tooltip: { shared: true, intersect: false },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: { show: false },
    axisTicks: { show: false }
  }
};

// ==============================|| DASHBOARD - ACTIVITY CHART ||============================== //

export default function ActivityChart({ data }: { data: ChartData[] }) {
  const { mode } = useConfig();
  const [chartSeries, setChartSeries] = useState(data);
  const [chartOptions, setChartOptions] = useState<ChartProps>(areaChartOptions);

  useEffect(() => {
    setChartOptions((prev) => ({
      ...prev,
      colors: ['#04a9f5', '#1de9b6'],
      xaxis: {
        ...prev.xaxis,
        labels: { style: { colors: 'var(--bs-secondary)' } },
        axisBorder: { color: 'var(--bs-border-color)' }
      },
      yaxis: { ...prev.yaxis, labels: { style: { colors: 'var(--bs-secondary)' } } },
      markers: { ...prev.markers, colors: ['#04a9f5', '#1de9b6'], strokeColors: 'white' },
      grid: { borderColor: 'var(--bs-border-color)' },
      theme: { mode: mode === ThemeMode.DARK ? 'dark' : 'light' }
    }));
  }, []);

  useEffect(() => {
    setChartSeries(data);
  }, [data]);

  return <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={215} />;
}
