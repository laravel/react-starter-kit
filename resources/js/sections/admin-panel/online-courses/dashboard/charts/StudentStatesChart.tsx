import { useEffect, useState } from 'react';

// material-ui

// project-imports
import { ThemeMode } from '@/config';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';
import useConfig from '@/hooks/useConfig';

const pieChartOptions = {
  chart: {
    type: 'donut',
    height: 299
  },
  labels: ['Total Signups', 'Active Student'],
  legend: {
    show: true,
    position: 'bottom'
  },
  dataLabels: {
    enabled: false
  }
};

// ==============================|| DASHBOARD - STUDENT STATES CHART ||============================== //s

export function ApexDonutChart() {
  const { mode } = useConfig();
  const [options, setOptions] = useState<ChartProps>(pieChartOptions);

  const series = [70, 30];

  useEffect(() => {
    const primaryDark = '#0387c4';
    const primaryLight = '#68cbf9';

    setOptions((prevState) => ({
      ...prevState,
      colors: [primaryDark, primaryLight],
      grid: { borderColor: 'var(--bs-border-color)' },
      stroke: { colors: ['background.paper'] },
      theme: { mode: mode === ThemeMode.DARK ? 'dark' : 'light' }
    }));
  }, []);

  return <ReactApexChart options={options} series={series} type="donut" height={240} />;
}
