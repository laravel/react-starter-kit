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

// Initial chart options
const baseChartOptions = {
  chart: { type: 'bar', toolbar: { show: false }, offsetX: -5 },
  plotOptions: { bar: { horizontal: false, columnWidth: '55%' } },
  yaxis: { labels: { show: false } },
  legend: { show: true, position: 'top', horizontalAlign: 'right' },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 3, colors: ['transparent'] },
  grid: { strokeDashArray: 4 },
  tooltip: { y: { formatter: (val: number) => `$${val} thousands` } },
  xaxis: {
    categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    axisTicks: { show: false }
  }
};

// ==============================|| DASHBOARD - COURSES CHART ||============================== //

export default function CoursesChart({ data }: { data: ChartData[] }) {
  const { mode } = useConfig();

  const [chartSeries, setChartSeries] = useState(data);
  const [chartOptions, setChartOptions] = useState<ChartProps>(baseChartOptions);

  useEffect(() => {
    setChartOptions((prev) => ({
      ...prev,
      colors: ['var(--bs-primary)', '#f4c22b'],
      grid: { ...prev.grid, borderColor: 'var(--bs-border-color)' },
      xaxis: {
        ...prev.xaxis,
        labels: { style: { colors: 'var(--bs-secondary)' } },
        axisBorder: { color: 'var(--bs-border-color)' }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, []);

  useEffect(() => {
    setChartSeries(data);
  }, [data]);

  return <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={190} />;
}
